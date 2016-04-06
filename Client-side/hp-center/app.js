(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function($q, $location) {
	return {
		'request': function(config) {
			var credentials = sessionStorage.getItem("medicloudHealthProfessional");
			// console.log("Credentials: " + credentials);
			if (credentials) {
				config.headers.Authorization = 'Basic ' + credentials;
			}

			return config || $q.when(config);
		},
		responseError: function(rejection) {

			console.log("Found responseError: ", rejection);
			if (rejection.status == 401) {

				console.log("Access denied (error 401), please login again");
				//$location.nextAfterLogin = $location.path();
				window.location.href = '/sign-in/';
			}
			return $q.reject(rejection);
		}
	}
}
},{}],2:[function(require,module,exports){
(function() {
	// patients_module = require("./patients/patients.module");
	var patient_module = require("./patient/patient.module");
	var hpPatientList_module = require("./patients/patients.module");
	var auth = require("../Shared/authorization.interceptor");

	patient_module();
	hpPatientList_module();

	var app = new angular.module("hp-center", ['ngRoute', 'hpPatient', 'hpPatientList']);

	// routing and navigation configuration
	app.config(['$routeProvider', '$httpProvider',
		function($routeProvider, $httpProvider) {
			'use strict';
			$routeProvider
				.when('/', {
					templateUrl: 'dashboard/'
				})
				.otherwise({
					redirectTo: '/'
				});

			$httpProvider.interceptors.push(['$q', '$location', auth]);
		}
	]);
	// directives

	// services and factories

	// controllers

	// initiate
	angular.bootstrap(window.document, ['hp-center']);

})();
},{"../Shared/authorization.interceptor":1,"./patient/patient.module":10,"./patients/patients.module":14}],3:[function(require,module,exports){
module.exports = function() {
	var controller = function($scope, infermedicaConditionsService) {
		$scope.waiting = false;
		$scope.$on("status.waiting", function() {
			$scope.waiting = true;
			setTimeout(function() {
				$scope.$apply();
			}, 10);
		});

		$scope.$on("status.ready", function() {
			$scope.waiting = false;

			setTimeout(function() {
				$scope.$apply();
			}, 10);
		});

		var initializeBloodhound = function() {
			$scope.suggestions = new Bloodhound({
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				identify: function(obj) {
					return obj.id;
				},
				local: infermedicaConditionsService.data.conditions
			});

			setTimeout(function() {
				$scope.$broadcast('conditionSearch.suggestions.updated');
			}, 200);
			
		}


		if (infermedicaConditionsService.data.conditions) {
			initializeBloodhound(); 
		}

		$scope.$on('infermedicaConditions_serv.data.updated', function() {
			initializeBloodhound();
		});
	}

	return {
		templateUrl: 'conditionSearch/conditionSearch.template.html',
		scope: {
			model: '='
		}

		, link: function($scope, $element, $attrs) {
			$scope.$on('conditionSearch.suggestions.updated', function() {
				$element.find('.inputSearch').typeahead('destroy');
				$element.find('.inputSearch').typeahead({
					hint: true,
					highlight: true,
					minLength: 1
				}, {
					name: 'conditions',
					source: $scope.suggestions,
					displayKey: 'name',
					templates: {
						empty: [
							'<div class="text-muted">',
							'No Suggestion',
							'</div>'
						].join('\n'),
						suggestion: function(data) {
							var templ = '<div class="list-group-item">'
										+ '<dl>'
										+ '<dt>{{name}}<label class="label label-info pull-right">{{severity}}</label></dt>'
										+ '<dd><em>'
										+ '{{categories}}'
										+ '</em></dd>'
										+ '</div>';
							var item = templ
										.replace(/{{name}}/g, data.name)
										.replace(/{{severity}}/g, data.severity)
										.replace(/{{categories}}/g, data.categories.join(', '))

							return item;
						}
					}
				});

				$element.find('.inputSearch').bind('typeahead:select', function(ev, suggestion) {
					$scope.model = suggestion;
					setTimeout(function() { $scope.$apply(); }, 100);
				});
			});

		}

		,
		controller: ['$scope', 'infermedicaConditions_serv', controller]
	}
}
},{}],4:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var url_list = 'http://'+window.location.hostname+'\\:8080/conditions';
	var url_single = 'http://'+window.location.hostname+'\\:8080/conditions/:condition_id';

	var client = $resource(url_single, { condition_id: '@c_id'});
	var service = {
		data: {
			conditions: []
		}
		
		, fetchAll: function() {
			var self = this;

			self.data.conditions = client.query(
				{}
				, function() {
					$rootScope.$broadcast('infermedicaConditions_serv.data.updated');
				}
				, function(response) {
					$rootScope.$broadcast('infermedicaConditions_serv.data.error', response);
				}
			 );
			
			return client.$promise;
		}
	}
	service.fetchAll();	
	return service;
}
},{}],5:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var url = "http://" + location.host + '/condition/:condition_id';

	var client = $resource(url, { condition_id: '@id' }, 
		{
			insert: { method: "POST" }
		});

	return client;
}
},{}],6:[function(require,module,exports){
module.exports = function($scope, patient_serv) {
	$scope.conditions = patient_serv.data.conditions;
	$scope.newConditions = [];

	var sync_conditions = function() {
		$scope.conditions = patient_serv.data.conditions;
	} 

	$scope.$on('patient_service.data.updated', function() {
		sync_conditions();
	});

	$scope.appendNewCondition = function() {
		$scope.newConditions.unshift({
			"conditionId": 0,
			"name": '',
			"startObs": null,
			"endObs": null,
			"comments": ''	
		});
	}

	$scope.$on('newCondition.cancel', function(evt, data) {
		var indexToRemove = $scope.newConditions.indexOf(data);
		$scope.newConditions.splice(indexToRemove, 1);
	});

	$scope.$on('newCondition.save', function(evt, data) {
		console.log('saved');
	});
}
},{}],7:[function(require,module,exports){
module.exports = function() {
	var controller = function($scope, condition_fact) {
		$scope.mode = 'search';
		$scope.model = { suggestion: null };

		$scope.formatDate = function(d) {
			if (!d) return 'none';
			return new Date(d);
		}

		$scope.showSearch = function() {
			$scope.mode = 'search';
		}

		$scope.save = function() {
			$scope.waiting = true;
			var data = {
				name: $scope.condition.name
				, severity: $scope.condition.severity
				, infer_c_id: $scope.condition.id
			}
			condition_fact.insert({ condition_id: 0 }, data);
		}

		$scope.cancel = function() {
			$scope.$emit('newCondition.cancel', $scope.condition);
		}

		$scope.severityOptions = ['mild', 'moderate', 'severe'];

		$scope.$watch('model.suggestion', function(newVal) {
			angular.extend($scope.condition, newVal);
			if ($scope.model.suggestion) {
				$scope.mode = 'confirm';
			}
			
		}, true);
	}

	return {
		templateUrl: 'patient/conditions/newActiveCondition.template.html',
		
		scope: {
			condition: "=condData"
		},

		link: function() {

		}, 

		controller: ['$scope', 'condition_fact', controller]
	}
}
},{}],8:[function(require,module,exports){
module.exports = function($scope, patient_serv) {
	/* include files */
	$scope.incConditionList = "patient/conditions/activeConditionList.html";
	$scope.incObservationList = "patient/observations/observations.html";

	/***** fetch inital data from services ******/
	patient_serv.fetch();

	$scope.modalMessage = {
		show: false,
		title: 'patient/message/formMessage.title.html',
		body: 'patient/message/formMessage.html',
		footer: 'patient/message/formMessage.footer.html',
		actions: {
			send: function() {
				console.log('Sent');
			}
		}
	}
}
},{}],9:[function(require,module,exports){
module.exports = function($scope, patient_serv) {
	$scope.modal = {
		show: false,
		addObservationForm: 'patient/observations/addObservationForm.html',
		actions: {}
	}

	var sync_observations = function() {
		$scope.observations = patient_serv.data.observations;
	} 

	$scope.$on('patient_service.data.updated', function() {
		sync_observations();
	});

	$scope.addObservationForm = function() {
		$scope.modal.show = true;
	}
}
},{}],10:[function(require,module,exports){
module.exports = function() {
	var auth = require("../../Shared/authorization.interceptor");

	var main_ctrl = require(".//main.controller");
	var modal_dir = require("./../share/modal.directive");
	var patient_serv = require("./patient.service");
	var profile_ctrl = require("./profile/profile.controller");
	var conditionList_ctrl = require("./conditions/activeConditionList.controller");
	// var condition_dir = require("./../condition/condition.directive");
	var newActiveCondition_dir = require("./conditions/newActiveCondition.directive");
	var condition_fact = require("./conditions/activeCondition.factory");
	var conditionSearch_dir = require("./../conditionSearch/conditionSearch.directive");
	var infermedicaConditions_serv = require("./../conditionSearch/infermedicaConditions.service");
	var observations_ctrl = require("./observations/observations.controller");
    
        // initialize angular module 
	var app = angular.module('hpPatient', ['ngRoute', 'ngResource']);
	app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
		'use strict';
		$routeProvider
			.when('/patient/:patient_id/:tab?', {
				templateUrl: 'patient/',
				controller: 'profile_ctrl'
			});

		$httpProvider.interceptors.push(['$q', '$location', auth]);
	}]);

	// services
	app
		.service('infermedicaConditions_serv', 
			 ['$resource', '$rootScope', infermedicaConditions_serv])
		.service('patient_serv', ['$resource', '$rootScope', patient_serv])
		.factory('condition_fact', ['$resource', '$rootScope', condition_fact])
	;

	// directives
	app
		.directive('mcConditionSearch', conditionSearch_dir)
		.directive('mcNewActiveCondition', newActiveCondition_dir)
		.directive('mcModal', modal_dir)
	;

	// controllers
	app
		.controller("profile_ctrl", ['$scope', 'patient_serv', profile_ctrl])
		.controller("conditionList_ctrl", ['$scope', 'patient_serv', conditionList_ctrl])
		.controller("observations_ctrl", ['$scope', 'patient_serv', observations_ctrl])
		.controller("main_ctrl", ['$scope', 'patient_serv', main_ctrl])
	;
}

},{"../../Shared/authorization.interceptor":1,"./../conditionSearch/conditionSearch.directive":3,"./../conditionSearch/infermedicaConditions.service":4,"./../share/modal.directive":17,".//main.controller":8,"./conditions/activeCondition.factory":5,"./conditions/activeConditionList.controller":6,"./conditions/newActiveCondition.directive":7,"./observations/observations.controller":9,"./patient.service":11,"./profile/profile.controller":12}],11:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var url = 'http://'+window.location.hostname+'\\:8080/api/hp/:hpId/patients/:patientId';
	var client = $resource(
		url, {
		    hpId: 1
		    , patientId: '@pId'
		}
	);
        
        // return instance of service
	return {
		data: { contact_info: {}, encounters: [], notes: [] },
		fetch: function() {
			var self = this;

			client.get({
				patientId: 1
			}, function(response, headers) {
				self.data = response;
				$rootScope.$broadcast('patient_service.data.updated');
			}, function(response) {
				console.log(response);
			});
		}
	}
}

},{}],12:[function(require,module,exports){
module.exports = function($scope, patient_serv) {
	
	var sync_patient_data = function() {
		var patient_data = patient_serv.data;

		$scope.personal = {
			first_name: patient_data.profile.firstName,
			middle_name: patient_data.profile.middleName,
			last_name: patient_data.profile.lastName,
			birthdate: patient_data.profile.birthdate,
			email: patient_data.profile.email,
			address: patient_data.contactInfo.addres || '',
			city: patient_data.contactInfo.city || '',
			state: patient_data.contactInfo.state || '',
			zip: patient_data.contactInfo.zip || ''
		};

		$scope.encounters = patient_data.encounters;
		$scope.notes = patient_data.notes;
	}

	$scope.$on('patient_service.data.updated', function() {
		sync_patient_data();
	});
}

},{}],13:[function(require,module,exports){
module.exports = function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            submit: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {

            scope.$watch('show', function(newValue) {
                if (newValue) {
                    $(element[0]).modal('show');
                } else {
                    $(element[0]).modal('hide');
                }
            });
            /*element.find('#AddPatient').on('click', function() {
              element.submit();
            });*/
            element.on('submit', function(){
                var elements = element[0].querySelectorAll('input,select,textarea'); 
                for (var i = elements.length; i--;) { 
                    elements[i].addEventListener('invalid', function() { 
                        this.scrollIntoView(false); 
                    }); 
                }
               var data = scope.patient;
               data = angular.extend({}, scope.patient);
               data.birthdate = element.find('[type=date]').val();
               scope.submit(data);
            });

        },
        templateUrl: 'patients/formAddPatient/formAddPatient.html',
        controller: ['$scope', function($scope) {
          $('[data-toggle="tooltip"]').tooltip('disable');
          $scope.patient = {
            firstName: "", lastName: ""
          };
        }],
    };
}

},{}],14:[function(require,module,exports){
module.exports = function() {
	var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var patientsListService = require("./patientsList/patientsList.service");
	var formAddPatient_dir = require("./formAddPatient/formAddPatient.directive");
	var auth = require("../../Shared/authorization.interceptor");

	var app = angular.module('hpPatientList', ['ngRoute']);
	app.config(['$routeProvider', '$httpProvider',
		function($routeProvider, $httpProvider) {
			'use strict';
			$routeProvider
				.when('/patients/', {
					templateUrl: 'patients/',
					controller: 'patientsList_ctrl'
				});

			$httpProvider.interceptors.push(['$q', '$location', auth]);
		}
	])

	// services
	app.service('patientsListService', ["$http", "$rootScope", "$resource", patientsListService]);

	// directives
	app.directive('modalDialog', formAddPatient_dir);

	// controllers
	app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);

}
},{"../../Shared/authorization.interceptor":1,"./formAddPatient/formAddPatient.directive":13,"./patientsList/patientsList.controller":15,"./patientsList/patientsList.service":16}],15:[function(require,module,exports){
module.exports = function($scope, $rootScope, service) {
    $scope.patientList = [];
    getPatients();
    $scope.status;
    $scope.modalShown = false;
    $scope.patient = {};
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.contactClicked = false;
    $scope.selectedPatient;
    var validBirthdate = false;
    var validEmail = false;
    $('#patientSuccessAlert').hide();
    $('#patientFailureAlert').hide();

    $scope.clicked = function(patient) {
        $scope.contactClicked = true;
        $scope.selectedPatient = patient;
    }

    $rootScope.$on('patientAdded', function() {
        $scope.modalShown = false;
    });

    $scope.addPatient = function(newPatientData) {
        service.addPatient(newPatientData);
        $('#AddPatientForm')[0].reset();
    }

    function getPatients() {
        service.getPatients().onSuccess(function(patient) {
                $scope.patientList = service.patients;
            })
            .onFailure(function(error) {
                console.log(error);
            });
    }
}
},{}],16:[function(require,module,exports){
module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var service = {

        patients: [{
            firstName: "Peter",
            lastName: "Parker",
            email: "peterparker@gmail.com"
        }, {
            firstName: "Bruce",
            lastName: "Wayne",
            email: "brucewayne@gmail.com"
        }],

        getPatients: function() {
            var that = this;
            var client = $resource(url, {
                hpId: 1
            });

            var promise = client.query().$promise;
            promise.then(function(patient) {
                that.patients = patient;
                (onSuccessFn || angular.noop)();
                onSuccessFn = null;
                onFailureFn = null;
            }, function(error) {
                (onFailureFn || angular.noop)(error);
                onSuccessFn = null;
                onFailureFn = null;
            });

            return this;
        },

        onSuccess: function(fn) {
            onSuccessFn = fn;
            return this;
        },

        onFailure: function(fn) {
            onFailureFn = fn;
            return this;
        },

        addPatient: function(patient) {

            $rootScope.$broadcast('patientAdded');
            var client = $resource(url, {
                hpId: 1
            });
            client.save(patient,
                function(response) {
                    if (response.personId) {
                        service.patients.push(patient);
                        $('#patientSuccessAlert').show();
                        setTimeout(function() {
                            $('#patientSuccessAlert').fadeOut('slow');
                        }, 3000);

                    } else {
                        $('#patientFailureAlert').show();
                    }
                    console.log(response);
                });
        }
    }
    return service;
}
},{}],17:[function(require,module,exports){
module.exports = function() {
	return {
		templateUrl: 'share/modal.template.html',
		scope: {
			show: '=show',
			title: '=mcTitle',
			body: '=mcBody',
			footer: '=mcFooter',
			actions: '=mcActions'
		},
		link: function($scope, $element, $attrs) {

			$scope.$watch('show', function(newVal, oldVal) {
				if (newVal) {
					$element.find('.modal').modal('show');
				} else {
					$element.find('.modal').modal('hide');
				}
			});

			$element.find('.modal').on('shown.bs.modal', function() {
				$scope.show = true;
				$scope.$apply();
			});

			$element.find('.modal').on('hidden.bs.modal', function() {
				$scope.show = false;
				$scope.$apply();
			});
		}
	}
}
},{}]},{},[2]);
