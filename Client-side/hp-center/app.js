(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function($q, $location) {
	return {
		'request': function(config) {
			var credentials = sessionStorage.getItem("medicloud_user_credentials");
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
	var hpCalendar_module = require('./calendar/calendar.module');
	var errorModal_directive = require('./error/error.directive');

	patient_module();
	hpPatientList_module();
	hpCalendar_module();
	var app = new angular.module("hp-center", ['ngRoute', 'ngAnimate', 'hpPatient', 'hpPatientList', 'hpCalendar']);
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
	app
		.directive('mdErrorModal', errorModal_directive);

	// services and factories

	// controllers

	// initiate
	angular.bootstrap(window.document, ['hp-center']);

})();

},{"../Shared/authorization.interceptor":1,"./calendar/calendar.module":4,"./error/error.directive":8,"./patient/patient.module":17,"./patients/patients.module":20}],3:[function(require,module,exports){
module.exports = function() {
  return {
    link: function($scope, elem, attr) {
      function ini_events(ele) {
        ele.each(function () {
          // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
          // it doesn't need to have a start or end
          var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
          };

          // store the Event Object in the DOM element so we can get to it later
          $(this).data('eventObject', eventObject);

          // make the event draggable using jQuery UI
          $(this).draggable({
            zIndex: 1070,
            revert: true, // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
          });

        });
      }
      ini_events($('#external-events div.external-event'));

      /* initialize the calendar
       -----------------------------------------------------------------*/
      //Date for the calendar events (dummy data)
      var date = new Date();
      var d = date.getDate(),
              m = date.getMonth(),
              y = date.getFullYear();
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
          today: 'today',
          month: 'month',
          week: 'week',
          day: 'day'
        },
        //Random default events
        events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            backgroundColor: "#f56954", //red
            borderColor: "#f56954" //red
          },
          {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            backgroundColor: "#f39c12", //yellow
            borderColor: "#f39c12" //yellow
          },
          {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            backgroundColor: "#0073b7", //Blue
            borderColor: "#0073b7" //Blue
          },
          {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            backgroundColor: "#00c0ef", //Info (aqua)
            borderColor: "#00c0ef" //Info (aqua)
          },
          {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            backgroundColor: "#00a65a", //Success (green)
            borderColor: "#00a65a" //Success (green)
          },
          {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/',
            backgroundColor: "#3c8dbc", //Primary (light-blue)
            borderColor: "#3c8dbc" //Primary (light-blue)
          }
        ],
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function (date, allDay) { // this function is called when something is dropped
          // retrieve the dropped element's stored Event Object
          var originalEventObject = $(this).data('eventObject');

          // we need to copy it, so that multiple events don't have a reference to the same object
          var copiedEventObject = $.extend({}, originalEventObject);

          // assign it the date that was reported
          copiedEventObject.start = date;
          copiedEventObject.allDay = allDay;
          copiedEventObject.backgroundColor = $(this).css("background-color");
          copiedEventObject.borderColor = $(this).css("border-color");

          // render the event on the calendar
          // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
          $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }

        }
      });

      /* ADDING EVENTS */
      var currColor = "#3c8dbc"; //Red by default
      //Color chooser button
      var colorChooser = $("#color-chooser-btn");
      $("#color-chooser > li > a").click(function (e) {
        e.preventDefault();
        //Save color
        currColor = $(this).css("color");
        //Add color effect to button
        $('#add-new-event').css({"background-color": currColor, "border-color": currColor});
      });

      $("#add-new-event").click(function (e) {
        e.preventDefault();
        //Get value and make sure it is not null
        var val = $("#new-event").val();
        if (val.length == 0) {
          return;
        }

        //Create events
        var event = $("<div />");
        event.css({"background-color": currColor, "border-color": currColor, "color": "#fff"}).addClass("external-event");
        event.html(val);
        $('#external-events').prepend(event);

        //Add draggable funtionality
        ini_events(event);

        //Remove event from text input
        $("#new-event").val("");
      });

      $("[data-date]").click(function() {
        $scope.modalControl.show = !$scope.modalControl.show;
        $scope.selectedDate = $(this).attr("data-date");
        console.log("$scope.selectedDate is " + $scope.selectedDate);
        console.log("show is " + $scope.modalControl.show);
        $scope.setSelectedDate();
        $scope.$apply();
      });

    },
    controller: ['$scope', 'calendarService', function($scope, calendarService) {
      $scope.modalControl = {
        show: false
      };
      $scope.setSelectedDate = function() {
        calendarService.selectedDate = $scope.selectedDate;
        console.log("calendarService.selectedDate is " + calendarService.selectedDate);
      }
    }]
  }
}

},{}],4:[function(require,module,exports){
module.exports = function() {
	//var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var calendarService = require("./calendar.service.js");
	var appointmentModalDirective = require('../modalDialogue/modal.directive');
	var calendarDirective = require('./calendar.js');

	var app = angular.module('hpCalendar', ['ngRoute', 'hpPatientList']);
	app.config(['$routeProvider', function($routeProvider) {
		'use strict';
		$routeProvider
			.when('/calendar/', {
				templateUrl: 'calendar/calendar.html'
			});
	}])
	app.service('calendarService', ['$http', '$rootScope', '$resource', calendarService]);
	app.directive('appointmentModalDirective', appointmentModalDirective);
	app.directive('calendarDirective', calendarDirective);
	//app.controller("patientsList_ctrl", ['$scope', '$rootScope', 'patientsListService', patientsList_ctrl]);
}

},{"../modalDialogue/modal.directive":9,"./calendar.js":3,"./calendar.service.js":5}],5:[function(require,module,exports){
module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var selectedDate;
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var availabilityUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/availability?userDate=:selectedDate';
    var service = {
      times: [{
            appointmentTime: "9:00",
            appointmentDate: "01/01/2016",
        }, {
            appointmentTime: "10:00",
            appointmentDate: "01/01/2016",
        }],

        getTimes: function() {
          var that = this;
          console.log("Service here. Selected date is " + selectedDate);
          var client = $resource(availabilityUrl, {
              hpId: hpId,
              selectedDate: selectedDate
          });
          var promise = client.query().$promise;
          promise.then(function(times) {
              angular.extend(that.times, times);
              (onSuccessFn || angular.noop)();
              onSuccessFn = null;
              onFailureFn = null;
          }, function(error) {
              (onFailureFn || angular.noop)(error);
              onSuccessFn = null;
              onFailureFn = null;
          });
          return this.times;
        },
      patients: [],
        getPatients: function() {
            var that = this;
            var client = $resource(url, {
                hpId: hpId
            });
            var promise = client.query().$promise;
            promise.then(function(patient) {
                angular.extend(that.patients, patient);
                (onSuccessFn || angular.noop)();
                onSuccessFn = null;
                onFailureFn = null;
            }, function(error) {
                (onFailureFn || angular.noop)(error);
                onSuccessFn = null;
                onFailureFn = null;
            });

            return this.patients;
        },

        onSuccess: function(fn) {
            onSuccessFn = fn;
            return this;
        },

        onFailure: function(fn) {
            onFailureFn = fn;
            return this;
        }
    }
    return service;
}

},{}],6:[function(require,module,exports){
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
			onSelect: '='
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
					($scope.onSelect || angular.noop)(suggestion);
				});
			});

		}

		,
		controller: ['$scope', 'infermedicaConditions_serv', controller]
	}
}
},{}],7:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var url_list = 'http://'+window.location.hostname+'\\:8080/conditions';
	var url_single = 'http://'+window.location.hostname+'\\:8080/conditions/:condition_id';

	var client = $resource(url_list, { condition_id: '@c_id'});
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
},{}],8:[function(require,module,exports){
module.exports = function() {
	return {
		scope: {
			error: "="
			, control: "="
		}
		, templateUrl: 'error/error.template.html'
		, link: function($scope, $element, $attrs) {
			var modal = $($element[0]).modal('hide');
			$scope.control = {
				isShown: false
				, show: function(err) {
					$scope.error = err || $scope.error;
					modal.modal('show');
					modal.on('modal.bs.shown', function() {
						$scope.isShown = true;
					});
				}
				, hide: function() {
					modal.modal('hide');
					moda.on('modal.bs.hidden', function() {
						$scope.isShown = false;
					});
				}
			}
		}
	}
}
},{}],9:[function(require,module,exports){
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
            $(document).on('dblclick', function() {
              console.log("scope.show is " + scope.show);
            })
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
        templateUrl: 'modalDialogue/modal.html',
        controller: ['$scope', 'patientsListService', 'calendarService', function($scope, patientsListService, calendarService) {
          $('[data-toggle="tooltip"]').tooltip('disable');
          $scope.patientList = patientsListService.getPatients();
          $scope.timesList = calendarService.getTimes();
          $(document).on('dblclick', function() {
            console.log("patients list is " + $scope.patientList.patients);
            console.log('times are ' + $scope.timesList);
            console.log("modalDirective " + calendarService.selectedDate);
          })
        }],
    };
}

},{}],10:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var url = "http://" + location.host + '/conditions/:condition_id';

	var client = $resource(url, { condition_id: '@id' }, 
		{
			insert: { method: "POST" }
		});

	var activeCondition = function() {
		this.conditionId = null;
		this.name = '';
		this.description = '';
		this.startObs = null
		this.endObs = null;
	}

	activeCondition.prototype = {
		constructor: activeCondition
	}

	return activeCondition;
}
},{}],11:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.patient.fetchConditions();
	$scope.newActiveConditionForms = [];

	$scope.getNewActiveConditionForm = function() {
		$scope.newActiveConditionForms.unshift({});
	}

	$scope.removeForm = function(index) {
		return function() {
			$scope.newActiveConditionForms.splice(index, 1);
		};
	}
}
},{}],12:[function(require,module,exports){
module.exports = function() {
	var controller = function($scope, models_service) {
		$scope.mode = 'search'; // search, create, or confirm

		$scope.formatDate = function(d) {
			if (!d) return 'none';
			return new Date(d);
		}

		$scope.showSearch = function() {
			$scope.mode = 'search';
		}

		$scope.save = function() {
			models_service.addActiveCondition($scope.condition.name, $scope.condition.severity, $scope.condition.description, $scope.condition.infer_c_id);
		}

		$scope.cancel = function() {
			($scope.onCancelled || angular.noop)();
		}


		$scope.severityOptions = ['mild', 'moderate', 'severe'];
		$scope.create = function(suggestion) {
			if (suggestion) {
				$scope.condition.name = suggestion.name;
				$scope.condition.severity = suggestion.severity;
				$scope.condition.infer_c_id = suggestion.id;
				$scope.condition.description = "";
			}
			
			$scope.mode = "create";
			setTimeout(function() {
				$scope.$apply();
			}, 200);
		}
	}

	return {
		templateUrl: 'patient/conditions/newActiveCondition.template.html',

		scope: {
			condition: "=condData",
			onSaved: "&",
			onCancelled: "&"
		},

		link: function($scope, $element, $attrs) {
			$scope.condition.name = '';
			$scope.condition.severity = '';
			$scope.condition.infer_c_id = null;
			$scope.condition.description = '';

			$scope.confirm = function() {
				$scope.mode = "confirm";
			}

		},

		controller: ['$scope', 'models_service', controller]
	}
}
},{}],13:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	/* include files */
	$scope.incConditionList = "patient/conditions/activeConditionList.html";
	$scope.incObservationList = "patient/observations/observations.html";

	$scope.patient = models_service.getPatient($routeParams['patient_id']);

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
},{}],14:[function(require,module,exports){
module.exports = function($rootScope, patient_factory, activeCondition_factory) {
	var models = {
		patients: []
		, patientIndex: {}
	}	

	var service = {
		
		getPatient: function(patientId) {
			if (models.patientIndex.hasOwnProperty(patientId)) {
				var index = models.patientIndex[patientId];
				return models.patients[index];
			} else {
				// never delete or slice an element out of array
				// otherwise, the indexing will be messed up and cannot retrieve the right patient
				var newPatientIndex = models.patients.length;
				models.patientIndex[patientId] = newPatientIndex;  // track this index by patient Id
				
				models.patients.push(new patient_factory(patientId));
				
				models.patients[newPatientIndex].onLoad(
					function(response) {
						$rootScope.$broadcast("patients.updated", models.patients[newPatientIndex]);
					}
				);

				models.patients[newPatientIndex].onFailure(
					function(failedResponse) {
						// instead of the deleting from the array, just delete form the index and set it to null
						models.patients[newPatientIndex] = null;
						delete models.patientIndex[patientId];
					}
				);

				return models.patients[newPatientIndex];
			}
		}

		, getPatients: function() {
			return model.patients;
		}

		, addActiveCondition: function(name, severity, description, infer_c_id) {
			var newAC = new activeCondition_factory();
			newAC.name = name;
			newAC.severity = severity;
			newAC.description = description;
			newAC.infer_c_id = infer_c_id;

			console.log(newAC);

			return newAC;
		}
	}

	return service;
}
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
module.exports = function($resource, $rootScope, $route, $routeParams) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId';
	var client = $resource(url, {
		hpId: hpId,
		patientId: '@patientId'
	});

	var url_cond = url + "/conditions/:conditionId";
	var cond_client = $resource(url_cond, { hpId: hpId, patientId: '@patientId', conditionId: '@conditionId' });

	var patient = function(patientId) {
		this.patientId = patientId;
		this.onLoadCallback = angular.noop;
		this.onFailureCallback = angular.noop;
		this.conditions = [];
		this.observations = [];
		this.fetch();
	}

	patient.prototype = {
		constructor: patient,

		onLoad: function(callback) {
			this.onLoadCallback = callback;
		},

		onFailure: function(callback) {
			this.onFailureCallback = callback;
		},

		fetch: function() {
			var self = this;

			var promise = client.get({
				patientId: self.patientId
			}, function(response, headers) {
				angular.extend(self, response);
				self.onLoadCallback.call(self, response);
			}, function(response) {
				$rootScope.$broadcast('error', response);
				self.onFailureCallback.call(self, response);
			});

			return promise;
		},

		fetchConditions: function() {
			var self = this;

			self.conditions = [];

			var promise = cond_client.query(
				{ patientId: self.patientId}
				, function(response) {
					angular.extend(self.conditions, response);
				}
				, function(response) {
					$rootScope.$broadcast('error', response);
				})

			return promise;
		}
	}

	return patient;
}
},{}],17:[function(require,module,exports){
module.exports = function() {
	var auth = require("../../Shared/authorization.interceptor");

	var main_ctrl = require(".//main.controller");
	var modal_dir = require("./../share/modal.directive");
	var models_service = require("./models.service");

	var patient_factory = require("./patient.factory");
	var profile_ctrl = require("./profile/profile.controller");
	var conditionList_ctrl = require("./conditions/activeConditionList.controller");
	// var condition_dir = require("./../condition/condition.directive");
	var newActiveCondition_dir = require("./conditions/newActiveCondition.directive");
	var activeCondition_factory = require("./conditions/activeCondition.factory");
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
		.service('models_service', ['$rootScope', 'patient_factory', 'activeCondition_factory', models_service])
		.service('infermedicaConditions_serv', 
			 ['$resource', '$rootScope', infermedicaConditions_serv])
		.service('patient_factory', ['$resource', '$rootScope', '$route', '$routeParams', patient_factory])
		.factory('activeCondition_factory', ['$resource', '$rootScope', activeCondition_factory])
	;

	// directives
	app
		.directive('mcConditionSearch', conditionSearch_dir)
		.directive('mcNewActiveCondition', newActiveCondition_dir)
		.directive('mcModal', modal_dir)
	;

	// controllers
	app
		.controller("profile_ctrl", ['$scope', 'models_service', '$route', '$routeParams', profile_ctrl])
		.controller("conditionList_ctrl", ['$scope', 'models_service', '$route', '$routeParams', conditionList_ctrl])
		.controller("observations_ctrl", ['$scope', 'models_service', '$route', '$routeParams', observations_ctrl])
		.controller("main_ctrl", ['$scope', 'models_service', '$route', '$routeParams', main_ctrl])
	;
}

},{"../../Shared/authorization.interceptor":1,"./../conditionSearch/conditionSearch.directive":6,"./../conditionSearch/infermedicaConditions.service":7,"./../share/modal.directive":23,".//main.controller":13,"./conditions/activeCondition.factory":10,"./conditions/activeConditionList.controller":11,"./conditions/newActiveCondition.directive":12,"./models.service":14,"./observations/observations.controller":15,"./patient.factory":16,"./profile/profile.controller":18}],18:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
}

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../../Shared/authorization.interceptor":1,"./formAddPatient/formAddPatient.directive":19,"./patientsList/patientsList.controller":21,"./patientsList/patientsList.service":22}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
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
                hpId: hpId
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
                hpId: hpId
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

},{}],23:[function(require,module,exports){
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
