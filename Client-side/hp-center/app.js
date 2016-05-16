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

    var main_controller = require('./main.controller');

    patient_module();
    hpPatientList_module();
    hpCalendar_module();
    var app = new angular.module("hp-center", ['ngRoute', 'ngResource', 'ngAnimate', 'hpPatient', 'hpPatientList', 'hpCalendar']);
    // routing and navigation configuration

    app.config(['$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {
            'use strict';
            $routeProvider

    .otherwise({
        redirectTo: '/patients/'
    });

    $httpProvider.interceptors.push(['$q', '$location', auth]);
        }
        ]);

    // directives
    app
        .directive('mdErrorModal', errorModal_directive);

    // services and factories

    // controllers
    app
        .controller('hpCenter_main_controller', ['$scope', '$resource', main_controller])
        ;

    // initiate
    angular.bootstrap(window.document, ['hp-center']);

})();

},{"../Shared/authorization.interceptor":1,"./calendar/calendar.module":4,"./error/error.directive":8,"./main.controller":9,"./patient/patient.module":27,"./patients/patients.module":30}],3:[function(require,module,exports){
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
        $scope.$apply();
        $scope.setSelectedDate();

      });

    },
    controller: ['$scope', '$rootScope', 'calendarService', function($scope, $rootScope, calendarService) {
      $scope.modalControl = {
        show: false
      };
      $scope.setSelectedDate = function() {
        calendarService.selectedDate = $scope.selectedDate;
        $rootScope.$broadcast('dateSelected', {date: calendarService.selectedDate});
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

},{"../modalDialogue/modal.directive":10,"./calendar.js":3,"./calendar.service.js":5}],5:[function(require,module,exports){
module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var patientId;
    var selectedDate;
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var availabilityUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/availability?userDate=:selectedDate';
    var setAppointmentUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId/appointment';
    var getAppointmentListUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/getListOfAppointments?userDate=:selectedDate';
    var service = {
      times: [],

        getTimes: function() {
          selectedDate = this.selectedDate;
          var that = this;
          var client = $resource(availabilityUrl, {
              hpId: hpId,
              selectedDate: selectedDate
          });
          console.log("service.getTimes() selectedDate is " + selectedDate);
          var promise = client.query().$promise;
          promise.then(function(times) {
              angular.copy(times, that.times);
              (onSuccessFn || angular.noop)();
              onSuccessFn = null;
              onFailureFn = null;
          }, function(error) {
              (onFailureFn || angular.noop)(error);
              onSuccessFn = null;
              onFailureFn = null;
          });
          return promise;
        },
      appointments: [],
      getAppointments: function() {

        selectedDate = this.selectedDate;
        var that = this;
        var client = $resource(getAppointmentListUrl, {
            hpId: hpId,
            selectedDate: selectedDate
        });
        console.log('getAppointments function');
        var promise = client.query().$promise;
        promise.then(function(appointments) {
            angular.copy(appointments, that.appointments);

            (onSuccessFn || angular.noop)();
            onSuccessFn = null;
            onFailureFn = null;
        }, function(error) {
            (onFailureFn || angular.noop)(error);
            onSuccessFn = null;
            onFailureFn = null;
        });
        return promise;

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

        addAppointment: function(appointment, selectedPatientId) {
            patientId = selectedPatientId;
            console.log('In calendar service. patientId is ' + selectedPatientId);
            var client = $resource(setAppointmentUrl, {
                hpId: hpId,
                patientId: selectedPatientId
            });

            client.save(appointment,
                function(response) {
                  $rootScope.$broadcast('appointmentAdded');
                  console.log('appointment broadcast');
                    if (response.personId) {


                        service.patients.push(response);
                        $('#patientSuccessAlert').show();
                        setTimeout(function() {
                            $('#patientSuccessAlert').fadeOut('slow');
                        }, 3000);

                    } else {
                        $('#patientFailureAlert').show();
                    }
                    console.log(response);
                });
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
        $scope.waiting = true;

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
            $scope.waiting = false;

        }


        if (infermedicaConditionsService.ready) {
            initializeBloodhound(); 
        } else {
            $scope.$on('infermedicaConditions_serv.data.updated', function() {
                initializeBloodhound();
            });
        }
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
                    + '<dt>{{name}}<label class="label pull-right">{{severity}}</label></dt>'
                    + '<dd><em>'
                    + '{{categories}}'
                    + '</em></dd>'
                    + '</div>';
                        var item = templ
                            .replace(/{{name}}/g, data.name)
                            .replace(/{{severity}}/g, data.severity)
                            .replace(/{{categories}}/g, data.categories.join(', '))
                            item = $(item);
                        if (data.severity == 'mild') {
                            item.find('label').toggleClass('label-info', true);
                        } else if (data.severity == 'moderate') {
                            item.find('label').toggleClass('label-warning', true);
                        } else if (data.severity == 'severe') {
                            item.find('label').toggleClass('label-danger', true);
                        } else {
                            item.find('label').toggleClass('label-default', true);
                        }

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
		ready: false,
		data: {
			conditions: []
		}
		
		, fetchAll: function() {
			var self = this;

			var conditions = client.query(
				{}
				, function() {
					self.data.conditions.splice(0, self.data.conditions.length);
					angular.extend(self.data.conditions, conditions);
					$rootScope.$broadcast('infermedicaConditions_serv.data.updated');
					self.ready = true;
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
module.exports = function($scope, $resource) {
    $scope.error = '';
    $scope.errorModalControl = {};

    $scope.$on('error', function(response) {
        $scope.error = response.data.error || response.data;
        $scope.errorModalControl.show();
    });

    var profileUrl = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/profile';
    var hpId = sessionStorage.getItem("medicloud_hp_id");

    $scope.profile = $resource(profileUrl, {
        hpId: hpId 
    }).get();

    $scope.signout = function() {
       sessionStorage.clear();
       window.location.href = "/sign-in/";
    }

}

},{}],10:[function(require,module,exports){
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
                    $(element[0]).on('hidden.bs.modal', function() {
                      scope.show = false;
                      scope.$apply();
                    });
                }
            });

        },
        templateUrl: 'modalDialogue/modal.html',
        controller: ['$scope', '$rootScope', 'patientsListService', 'calendarService', function($scope, $rootScope, patientsListService, calendarService) {
          var appointment = {
            appointmentTime: '9:00',
            appointmentDate: '2000-01-01',
            reason: 'N/A'
          };
          var selectedPatientId;
          $scope.selectedPatient = 'Select a patient';
          $scope.selectedTime = 'Select a time';
          $scope.appointmentList = calendarService.appointments;
          $scope.timesList = calendarService.times;
          $('[data-toggle="tooltip"]').tooltip('disable');
          $rootScope.$on('dateSelected', function(event, args) {
            console.log("Broadcast received. Date is " + args.date);
            $scope.patientList = patientsListService.getPatients();
            calendarService.getTimes();
            calendarService.getAppointments().then(function() {
              console.log('appointmentList is ' + $scope.appointmentList);
            });

            appointment.appointmentDate = args.date;
          });

          $scope.selectPatient = function(patient) {
            $scope.selectedPatient = patient;
            selectedPatientId = $scope.selectedPatient.patientId;
          }

          $scope.selectTime = function(time) {
            $scope.selectedTime = time;
            appointment.appointmentTime = $scope.selectedTime;
          }

          $scope.submitAppointment = function() {
            appointment.reason = $scope.reason;
            calendarService.addAppointment(appointment, selectedPatientId);
            console.log('Appointment is ' + appointment);
          }

          function getAppointments() {

          }

          $scope.$on('appointmentAdded', function() {
            $('.modal.in').modal('hide')
            $('#AddAppointmentForm')[0].reset();
            $scope.selectedTime = 'Select a time';
          }
        );
        }],
    };
}

},{}],11:[function(require,module,exports){
module.exports = function() {
    return {
        templateUrl: 'patient/conditions/activeCondition.template.html'
            , scope: {
                activeCondition: "=",
                observationPicker: "="
            }
        , link: function($scope, $element, $attrs) {

        }
        , controller: ['$scope', 'activeCondition_factory', function($scope, activeCondition_factory) {
            $scope.pickStartObservation = function() {
                $scope.observationPicker.show();
                $scope.observationPicker.onSelect = function(obs) {
                    $scope.activeCondition.startObservation = obs;
                    $scope.activeCondition.startObsId = obs.obsId;
                    activeCondition_factory.update(
                            { 
                                patientId: $scope.activeCondition.patientId,
                        activeConditionId: $scope.activeCondition.activeConditionId
                            },
                            $scope.activeCondition);
                }
            }
            $scope.pickEndObservation = function() {
                $scope.observationPicker.show();
                $scope.observationPicker.onSelect = function(obs) {
                    $scope.activeCondition.endObservation = obs;
                    $scope.activeCondition.endObsId = obs.obsId;
                    activeCondition_factory.update(
                            { 
                                patientId: $scope.activeCondition.patientId,
                        activeConditionId: $scope.activeCondition.activeConditionId
                            },
                            $scope.activeCondition);
                }
            }
        }]
    }
}

},{}],12:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId/conditions/:activeConditionId';
    var client = $resource(url, {
        hpId: hpId,
        patientId: '@patientId',
        activeConditionId: '@activeConditionId'
    }, {
        update: { method: 'PUT' }
    });

    return client;
}

},{}],13:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.patient.fetchConditions();
	$scope.newActiveConditionForms = [];
    
        $scope.observationPickerControl = {};
	$scope.getNewActiveConditionForm = function() {
		$scope.newActiveConditionForms.unshift({});
	}

	$scope.removeForm = function(index) {
		$scope.newActiveConditionForms.splice(index, 1);
	}
}

},{}],14:[function(require,module,exports){
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
			$scope.patient.addActiveCondition(
				$scope.condition.name
				, $scope.condition.severity
				, $scope.condition.description
				, $scope.condition.inferCId
			);
			
			($scope.onSaved || angular.noop)();
		}

		$scope.cancel = function() {
			($scope.onCancelled || angular.noop)();
		}


		$scope.severityOptions = ['mild', 'moderate', 'severe'];
		$scope.create = function(suggestion) {
			if (suggestion) {
				$scope.condition.name = suggestion.name;
				$scope.condition.severity = suggestion.severity;
				$scope.condition.inferCId = suggestion.id;
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
			patient: "=",
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
},{}],15:[function(require,module,exports){
module.exports = function() {
    var controller = function($scope, models, $route, $routeParams) {
        $scope.patient = models.getPatient($routeParams['patient_id']);
        $scope.patient.fetchObservations();
    }

    return {
        templateUrl: "patient/conditions/observationPicker.template.html",
        scope: {
            control: "="
        },
        link: function($scope, $element, $attrs) {
            var modal =  $($element[0]).find('.modal');
            
            $scope.control.show = function() {
                modal.modal('show');
                return $scope.control;
            }

            $scope.control.hide = function() {
                modal.modal('hide');
                return $scope.control;
            }

            $scope.onSelect = angular.noop;

            $scope.selectObservation = function(obs) {
                $scope.control.onSelect(obs);
                $scope.control.onSelect = angular.noop; // reset after selecting
                $scope.control.hide();
                return $scope.control;
            }

        },
        controller: ['$scope', 'models_service', '$route', '$routeParams', controller]

    }
}

},{}],16:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname 
                    + '\\:8080/api/hp/:hpId/patients/:patientId/encounters';
	var encounters = $resource(
		url
		, 
		{
			hpId: '@hpId',
			patientId: '@patientId'
		}
	);

	return encounters;
}

},{}],17:[function(require,module,exports){
module.exports = function($resource, $rootScope) {
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname 
        + '\\:8080/api/hp/:hpId/patients/:patientId/lab-results/:labResultId';
    var labResult = $resource(
            url
            , 
            {
                hpId: '@hpId',
                patientId: '@patientId',
                labResultId: '@labResultId'
            },
            {
                update: { method: "PUT" }
            }
        );
    labResult.prototype.name = "";
    labResult.prototype.status = "";
    labResult.prototype.result = "";
    labResult.prototype.hpId = null;
    labResult.prototype.patientId = null;
    labResult.prototype.lastUpdated = null;
    labResult.prototype.infermedicaLabId = null;
    labResult.prototype.edit = function() { this.mode = "edit" }
    return labResult;
}

},{}],18:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams, 
                            labResult_factory, labTests_factory) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.loading = true;
        $scope.loadingLabTests = true;
        $scope.newLabs = [];
	$scope.patient
		.fetchLabResults()
		.then(
			function() { $scope.loading = false; },
			function(failure) { handleError(failure); }
		);

        $scope.labStatusChoices = [
            "Started", "Pending", "Received", "Processing", "Delivered", "Completed", "Cancelled"    
        ];

        $scope.labTestSuggestions = labTests_factory.query();
        $scope.labTestSuggestions.$promise.then(
                function(response) {
                    $scope.loadingLabTests = false;
                });

	$scope.addLabResult = function() {
            var newLab = new labResult_factory();

            $scope.newLabs.push(newLab);
        }

        $scope.saveNewLab = function(newLab, index) {
            if (!newLab.name) return !(newLab._error = 'name');
            if (!newLab.category) return !(newLab._error = 'category');
            if (!newLab.status) return !(newLab._error = 'status');

            newLab.loading = true;
            $scope.patient.saveLabResult(newLab)
                .then(function() {
                    $scope.newLabs.splice(index, 1);
                });
        }

        $scope.saveLab = function(lab) {
            lab.loading = true;
            lab.$update().then(
                function() {
                    lab.loading = false;
                    lab.mode = '';
                },
                function(failure) {
                    lab.loading = false;
                }
            );
        }

        $scope.selectLabTest = function(newLab, labTest) {
            newLab.name = labTest.name;
            newLab.category = labTest.category;
            newLab.readonly = true;
            newLab.infermedicaLabId = labTest.id;
        }

	var handleError = function(failure) {
		$scope.error = failure.error ? failure.error : failure;
				
		$scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
		$scope.waiting = false;
	}
}

},{}],19:[function(require,module,exports){
module.exports = function($resource) {
    var url = 'http://' + window.location.hostname + '\\:8080/labs';
    var labTests = $resource(url);

    return labTests;
}

},{}],20:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	/* include files */
	$scope.incConditionList = "patient/conditions/activeConditionList.html";
	$scope.incObservationList = "patient/observations/observations.html";
	$scope.incLabResults = "patient/labs/labResults.html";

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
},{}],21:[function(require,module,exports){
module.exports = function($rootScope, patient_factory) {
    var models = {
        patients: [],
        patientIndex: {}
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
        },

        getPatients: function() {
            return model.patients;
        }
    }

    return service;
}

},{}],22:[function(require,module,exports){
module.exports = function($resource) {
	var hpId = sessionStorage.getItem("medicloud_hp_id");
	var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId/observations';
	var observation = $resource(
		url
		, 
		{
			hpId: hpId,
			patientId: '@patientId'
		}
		,
		{
			save: { method: 'POST' }
		}
	);

	return observation;
}
},{}],23:[function(require,module,exports){
module.exports = function() {
    return {
        templateUrl: 'patient/observations/addObservationForm.html',
        scope: {
            control: "="
        }
        ,
            link: function($scope, $element, $attrs) {
                var modal = $($element[0]).find('.modal').modal('hide');
                var btnPickEncounter = $element.find("#btnPickEncounterDate");

                btnPickEncounter.find('input').on('click', function(e) {
                    e.stopPropagation();
                });

                $scope.control.show = function() {
                    modal.modal('show');
                }
                $scope.control.hide = function() {
                    modal.modal('hide');
                }

            }
        ,
            controller: [
                '$scope', '$filter', 'models_service', 
                '$route', '$routeParams', 'observationSuggestions_factory'
                , function($scope, $filter, models_service, $route, $routeParams, obsSuggestionsFactory) {
                    $scope.error = "";
                    $scope.waiting = false;
                    $scope.control = {};
                    $scope.form = {
                        encounterDate: '',
                        encounterReason: '',
                        state: '',
                        comments: ''
                    }

                    $scope.patient = models_service.getPatient($routeParams['patient_id']);

                    $scope.setEncounterDate = function(d) {
                        var encDate;
                        if (typeof d == 'object' && d != null) {
                            encDate = $filter('date')(d, 'shortDate');
                        } else if (typeof d == 'number') {
                            encDate = new Date();
                            encDate.setDate(encDate.getDate() + d);
                        } else {
                            return;
                        }

                        $scope.form.encounterDate = $filter('date')(encDate, 'shortDate');
                    }

                    $scope.submitNewObservationForm = function() {
                        $scope.waiting = true;
                        $scope.patient
                            .addNewObservation($scope.form)
                            .then(
                                    function(succcess) {
                                        $scope.waiting = false;
                                        $scope.control.hide();
                                        $scope.form = {};
                                    },
                                    function(failure) { handleError(failure); }
                                 );
                    }

                    $scope.queryObservationSuggestions = function(keywords) {
                        $scope.obsSuggestions = obsSuggestionsFactory.query(
                                { 
                                    keywords: keywords,
                                    gender: $scope.patient.gender || ''
                                });

                        return $scope.obsSuggestions.$promise.then(
                                    function() { return $scope.obsSuggestions; }
                                );
                    }

                    $scope.addToObservationComments = function(sugg) {
                        if ($scope.form.comments) $scope.form.comments += "\n";
                        $scope.form.comments += sugg.label;
                        $scope.selectedObsSuggestion = "";
                    }

                    var handleError = function(failure) {
                        $scope.error = failure.error ? failure.error : failure;

                        $scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
                        $scope.waiting = false;
                    }

                }]
    }
}

},{}],24:[function(require,module,exports){
module.exports = function($resource) {
    var url = 'http://' + window.location.hostname + '\\:8080/observations';
    var obsSuggestions = $resource(url);

    return obsSuggestions;
}

},{}],25:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
	$scope.waiting = true;
	$scope.patient
		.fetchEncounters()
		.then(
			function() { $scope.waiting = false; },
			function(failure) {	handleError(failure); }
		);

	$scope.openObservationForm = function() {
		$scope.observationForm.show();
	}

	var handleError = function(failure) {
		$scope.error = failure.error ? failure.error : failure;
				
		$scope.error = angular.isArray($scope.error) ? $scope.error.join("\n") : $scope.error;
		$scope.waiting = false;
	}
}
},{}],26:[function(require,module,exports){
module.exports = function($resource, $rootScope, $filter, 
            activeCondition_factory, observation_factory, 
            encounterList_factory, labResult_factory) {
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + '\\:8080/api/hp/:hpId/patients/:patientId';
    var client = $resource(url, {
        hpId: hpId,
        patientId: '@patientId'
    });

    var url_cond = url + "/conditions/:conditionId";
    var cond_client = $resource(url_cond, {
        hpId: hpId,
        patientId: '@patientId',
        conditionId: '@conditionId'
    });

    var url_obs = url + "/observations/:obsId";
    var obsList = $resource(url_obs, {
        hpId: hpId,
        patientId: '@patientId',
        obsId: '@obsId'
    });

    var patient = function(patientId) {
        this.patientId = patientId;
        this.onLoadCallback = angular.noop;
        this.onFailureCallback = angular.noop;
        this.conditions = [];
        this.observations = [];
        this.encounters = [];
        this.labs = [];
        this.lastVisit = null;
        this.$promise = this.fetch();
    }

    patient.prototype = {
        constructor: patient
            , onLoad: function(callback) {
                this.onLoadCallback = callback;
            }
        , onFailure: function(callback) {
            this.onFailureCallback = callback;
        }
        , fetch: function() {
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

            return promise.$promise;
        }
        , fetchConditions: function() {
            var self = this;

            self.conditions.splice(0, self.conditions.length);

            var promise = cond_client.query({
                patientId: self.patientId
            }, function(response) {
                var sorted = $filter('orderBy')(response, '-dateCreated');
                angular.copy(sorted, self.conditions);
                
            }, function(response) {
                $rootScope.$broadcast('error', response);
            }).$promise;

            return promise;
        }
        , addActiveCondition: function(name, severity, description, infer_c_id) {
            var self = this;

            var newAC = activeCondition_factory.save({
                name: name,
                severity: severity,
                description: description,
                inferCId: infer_c_id,
                patient: self,
                patientId: self.patientId
            });

            newAC.$promise
                .then(
                        function(response) {
                            self.conditions.unshift(newAC);
                        },
                        function(response) {
                            $rootScope.$broadcast('error', response);
                        });

            return newAC.$promise;
        }
        ,fetchObservations: function() {
            var self = this;
            self.observations.splice(0, self.observations.length);

            var newList = obsList.query(
                    { patientId: self.patientId }
                    , function(response) {
                        angular.copy(response, self.observations);
                    }
                    , function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    );

            return newList.$promise;
        }
        , addNewObservation: function(formData) {
            var self = this;
            var newObservation = observation_factory.save(
                    { hpId: hpId, patientId: self.patientId }, 
                    formData
                    );

            newObservation.$promise.then(
                    function(response) {
                        self.fetchObservations();
                        self.fetchEncounters();
                    }
                    ,
                    function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    )

                return newObservation.$promise;
        }
        , fetchEncounters: function() {
            var self = this;
            self.encounters.splice(0, self.encounters.length);

            var newList = encounterList_factory.query(
                    { hpId: hpId, patientId: self.patientId }
                    , function(response) {
                        var sorted = $filter('orderBy')(response, '-encounterDateTime');
                        angular.copy(sorted, self.encounters);
                        if (self.encounters.length > 0) {
                            self.lastVisit = self.encounters[0].encounterDateTime;
                        }
                    }
                    , function(failure) {
                        $rootScope.$broadcast('error', failure);
                    }
                    );

            return newList.$promise;
        }
        , fetchLabResults: function() {
            var self = this;
            self.labs.splice(0, self.labs.length);

            var newList = labResult_factory.query(
                    {hpId: hpId, patientId: self.patientId }
                    , function(response) {
                        var sorted = $filter('orderBy')(response, '-lastUpdated');
                        angular.copy(sorted, self.labs);
                    }
                    , function(failure) {
                        $rootScope.$broadcast('error', failure);  
                    }
                );

            return newList.$promise;
        }
        , saveLabResult: function(newLab) {
            var self= this;
            var savedLab = labResult_factory.save(
                    { hpId: hpId, patientId: self.patientId }, 
                    newLab)

            savedLab.$promise.then(
                    function(response) {
                        self.labs.push(savedLab);
                    },
                    function(failure) {
                        $rootScope.$broadcast('error', failure); 
                    });

            return savedLab.$promise;
        }
    }

    return patient;
}

},{}],27:[function(require,module,exports){
module.exports = function() {
    var auth = require("../../Shared/authorization.interceptor");

    var main_ctrl = require(".//main.controller");
    var modal_dir = require("./../share/modal.directive");
    var models_service = require("./models.service");

    var patient_factory = require("./patient.factory");
    var profile_ctrl = require("./profile/profile.controller");
    var conditionList_ctrl = require("./conditions/activeConditionList.controller");
    var activeCondition_dir = require("./conditions/activeCondition.directive");
    var newActiveCondition_dir = require("./conditions/newActiveCondition.directive");
    var activeCondition_factory = require("./conditions/activeCondition.factory");
    var conditionSearch_dir = require("./../conditionSearch/conditionSearch.directive");
    var infermedicaConditions_serv = require("./../conditionSearch/infermedicaConditions.service");
    var observations_ctrl = require("./observations/observations.controller");
    var observation_factory = require("./observations/observation.factory");
    var observationForm_directive = require("./observations/observationForm.directive");
    var encounterList_factory = require("./encounters/encounterList.factory");
    var observationPicker_directive = require("./conditions/observationPicker.directive");
    var observationSuggestions_factory = require("./observations/observationSuggestions.factory");
    var labResult_factory = require('./labs/lab-result.factory');
    var labResults_controller = require('./labs/lab-results.controller');
    var labTests_factory = require('./labs/lab-tests_factory');

    // initialize angular module 
    var app = angular.module('hpPatient', ['ngRoute', 'ngResource', 'ui.bootstrap']);
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
        .service('models_service', 
                ['$rootScope', 'patient_factory',
                models_service])
        .service('infermedicaConditions_serv', 
                ['$resource', '$rootScope', infermedicaConditions_serv])
        .service('patient_factory', 
                ['$resource', '$rootScope', '$filter', 'activeCondition_factory', 
                'observation_factory', 'encounterList_factory', 'labResult_factory'
                , patient_factory])
    ;
    
    app
        .factory('activeCondition_factory', ['$resource', '$rootScope', activeCondition_factory])
        .factory('observation_factory', ['$resource', observation_factory])
        .factory('encounterList_factory', ['$resource', encounterList_factory])
        .factory('observationSuggestions_factory',
                ['$resource', observationSuggestions_factory])
        .factory('labResult_factory', ['$resource', labResult_factory])
        .factory('labTests_factory', ['$resource', labTests_factory])
    ;

    // directives
    app
        .directive('mcConditionSearch', conditionSearch_dir)
        .directive('mcNewActiveCondition', newActiveCondition_dir)
        .directive('mcActiveCondition', activeCondition_dir)
        .directive('mcObservationForm', observationForm_directive)
        .directive('mcModal', modal_dir)
        .directive('mcObservationPicker', observationPicker_directive)
    ;

    // controllers
    app
        .controller("profile_ctrl", ['$scope', 'models_service', '$route', '$routeParams', profile_ctrl])
        .controller("conditionList_ctrl", ['$scope', 'models_service', '$route', '$routeParams', conditionList_ctrl])
        .controller("observations_ctrl", ['$scope', 'models_service', '$route', '$routeParams', observations_ctrl])
        .controller("labResults_controller", 
                ['$scope', 'models_service', '$route', '$routeParams', 
                'labResult_factory', 'labTests_factory', labResults_controller ])
        .controller("main_ctrl", ['$scope', 'models_service', '$route', '$routeParams', main_ctrl])
    ;
}

},{"../../Shared/authorization.interceptor":1,"./../conditionSearch/conditionSearch.directive":6,"./../conditionSearch/infermedicaConditions.service":7,"./../share/modal.directive":33,".//main.controller":20,"./conditions/activeCondition.directive":11,"./conditions/activeCondition.factory":12,"./conditions/activeConditionList.controller":13,"./conditions/newActiveCondition.directive":14,"./conditions/observationPicker.directive":15,"./encounters/encounterList.factory":16,"./labs/lab-result.factory":17,"./labs/lab-results.controller":18,"./labs/lab-tests_factory":19,"./models.service":21,"./observations/observation.factory":22,"./observations/observationForm.directive":23,"./observations/observationSuggestions.factory":24,"./observations/observations.controller":25,"./patient.factory":26,"./profile/profile.controller":28}],28:[function(require,module,exports){
module.exports = function($scope, models_service, $route, $routeParams) {
	
	$scope.patient = models_service.getPatient($routeParams['patient_id']);
}

},{}],29:[function(require,module,exports){
module.exports = function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            submit: '=',
            error: '=',
            waiting: '='
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
               console.log(scope.checked);
               if (scope.checked == false) {
               var data = scope.patient;
               data = angular.extend({}, scope.patient);
               data.birthdate = element.find('[type=date]').val();
               scope.submit(data);
             }
             else {
               scope.submit(scope.invitationCode);
             }
            });


        },
        templateUrl: 'patients/formAddPatient/formAddPatient.html',
        controller: ['$scope', '$rootScope', function($scope, $rootScope) {
          $scope.checked = false;
          $('[data-toggle="tooltip"]').tooltip('disable');
          $scope.patient = {
            firstName: "", lastName: ""
          };
          $scope.newOrExistingPatient = function() {
            console.log("$scope.checked: " + $scope.checked);
            if ($scope.checked) {
              $rootScope.$broadcast('existingPatient');
            }
            else {
              $rootScope.$broadcast('newPatient');
            }
          }
        }],
    };
}

},{}],30:[function(require,module,exports){
module.exports = function() {
	var patientsList_ctrl = require("./patientsList/patientsList.controller");
	var patientsListService = require("./patientsList/patientsList.service");

	var formAddPatient_dir = require("./formAddPatient/formAddPatient.directive");
	var auth = require("../../Shared/authorization.interceptor");


	var app = angular.module('hpPatientList', ['ngRoute', 'hpCalendar', 'hpPatient']);
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
	app.directive('modalDialog', ["$rootScope", formAddPatient_dir]);

	// controllers
	app.controller("patientsList_ctrl", ['$scope', '$rootScope', 
                'patientsListService', 'calendarService', 'patient_factory', patientsList_ctrl]);

}

},{"../../Shared/authorization.interceptor":1,"./formAddPatient/formAddPatient.directive":29,"./patientsList/patientsList.controller":31,"./patientsList/patientsList.service":32}],31:[function(require,module,exports){
module.exports = function($scope, $rootScope, service, calendarService, patient_factory) {
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
    var newPatient = true;

    $scope.appointments = calendarService.appointments;

    var existingPatientCode = {
      invitationCode: 123456
    };
    $('#patientSuccessAlert').hide();
    $('#patientFailureAlert').hide();
    
    $scope.clicked = function(patient) {
        if (!$scope.selectedPatient) {
            $('[data-spy="affix"]').affix({
                offset: {
                    top: 200
                }
            });
        }
        $scope.contactClicked = false;

        $scope.contactClicked = true;
        $scope.selectedPatient = patient;
        var fullProfile = new patient_factory(patient.patientId);
        fullProfile.$promise.then(function() {
            $scope.selectedPatient = fullProfile;
            $scope.selectedPatient.fetchConditions();
            $scope.selectedPatient.fetchEncounters();
            $scope.selectedPatient.fetchLabResults();
        });
    
    }
   
    $rootScope.$on('patientAdded', function() {
        $scope.modalShown = false;
        $scope.waiting = false;
        $('#AddPatientForm')[0].reset();
    });
    $rootScope.$on('existingPatient', function() {
      newPatient = false;
      console.log("newPatient" + newPatient);
    });

    $rootScope.$on('newPatient', function() {
      newPatient = true;
      console.log("newPatient" + newPatient);

    });

    $scope.addPatient = function(newPatientData) {
        $scope.waiting = true;
        if (!newPatient) {
          service.invitationCode = newPatientData;
          existingPatientCode.invitationCode = newPatientData;
          console.log('in contoller: code is' + newPatientData);
          service.addExistingPatient(existingPatientCode);
        }
        else {
            service.addPatient(newPatientData)
            .then(function(response) {
                if (response.personId) {
                    $scope.modalShown = false;
                }
                $scope.waiting = false;
            }, function(failure) {
                $scope.error = failure.data.message || failure.data.error
                                || failure.message || failure.error || failure;
                $scope.waiting = false;
            });
          }
    }

    function getPatients() {
        $scope.waiting = true;
        service.getPatients().onSuccess(function(patient) {
                $scope.waiting = false;
                $scope.patientList = service.patients;
            })
            .onFailure(function(error) {
                $scope.waiting = false;
                console.log(error);
            });
    }
}

},{}],32:[function(require,module,exports){
module.exports = function($http, $rootScope, $resource) {
    var onSuccessFn;
    var onFailureFn;
    var invitationCode;
    var hpId = sessionStorage.getItem("medicloud_hp_id");
    var url = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/:patientId';
    var addExistingPatientUrl = 'http://' + window.location.hostname + ':8080/api/hp/:hpId/patients/addCode';

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
          debugger;
            var client = $resource(url, {
                hpId: hpId
            });
            var result = client.save(patient,
                function(response) {
                    if (response.personId) {
                        $rootScope.$broadcast('patientAdded');

                        service.patients.push(response);
                        $('#patientSuccessAlert').show();
                        setTimeout(function() {
                            $('#patientSuccessAlert').fadeOut('slow');
                        }, 3000);

                    } else {
                        $('#patientFailureAlert').show();
                    }
                    console.log(response);
                });

            return result.$promise;
        },

        addExistingPatient: function(PIN) {
          invitationCode = this.invitationCode;
          console.log('service code is ' + invitationCode);
          var client = $resource(addExistingPatientUrl, {
            hpId: hpId
          });
          var result = client.save(PIN, function(response) {
            debugger;
            if (response.personId) {
              $rootScope.$broadcast('patientAdded');
              service.patients.push(response);
              $('#patientSuccessAlert').show();
              setTimeout(function() {
                $('#patientSuccessAlert').fadeOut('slow');
              }, 3000);
            }
            else {
              $('#patientFailureAlert').show();
            }
              console.log('existing patient added');
          });
        }
    }
    return service;
}

},{}],33:[function(require,module,exports){
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
