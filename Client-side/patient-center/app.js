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
    var configuration = require('./configuration');

    var calendar_directive = require('./calendar');

    var appointmentModal_directive = require('./appointment-modal/modal.directive');
    
    var profile_factory = require('./profile/profile.factory');

    var patientCenterModel_service = require("./model.service");

    var main_controller = require("./main.controller");
    var profile_controller = require("./profile/profile.controller");

    var app = angular.module('patientCenter', ['ngRoute', 'ngResource', 'ngAnimate']);

    app.config(['$routeProvider', '$httpProvider', configuration]);

    app
        .directive('calendar_directive', calendar_directive)
        .directive('appointmentModal_directive', appointmentModal_directive)
    ;

    app
        .factory('patientCenter_profile_factory', ['$resource', profile_factory])
    ;

    app
        .service('patientCenter_model_service', 
                ['$resource', 'patientCenter_profile_factory', patientCenterModel_service])
    ;

    app
        .controller('patientCenter_main_controller', 
            ['$scope', 'patientCenter_model_service', main_controller])
        .controller("patientCenter_profile_controller",
            ['$scope', 'patientCenter_model_service', profile_controller]);
    ;
})();

},{"./appointment-modal/modal.directive":3,"./calendar":4,"./configuration":5,"./main.controller":6,"./model.service":7,"./profile/profile.controller":8,"./profile/profile.factory":9}],3:[function(require,module,exports){
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
        templateUrl: 'appointment-modal/modal.html',
        controller: ['$scope', function($scope) {
          $('[data-toggle="tooltip"]').tooltip('disable');
          $scope.patient = {
            firstName: "", lastName: ""
          };
        }],
    };
}

},{}],4:[function(require,module,exports){
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
        $scope.modalControl.show = true;
        var selectedDate = $(this).attr("data-date");
        console.log("selectedDate is " + selectedDate);
        $scope.$apply();
      });

    },
    controller: ['$scope', function($scope) {
      $scope.modalControl = {
        show: false
      };
    }]
  }
}

},{}],5:[function(require,module,exports){
module.exports = function($route, $httpProvider) {
    /* config navigation*/
    var auth = require("../Shared/authorization.interceptor");
    $route
	.when('/', {
	    templateUrl : 'profile/profile.html',
            controller: "patientCenter_profile_controller"
	})
	.otherwise({
	    redirectTo: '/'
	})
    ;

    $httpProvider.interceptors.push(['$q', '$location', auth]);
}

},{"../Shared/authorization.interceptor":1}],6:[function(require,module,exports){
module.exports = function ($scope, model) {
    // initialize models 
    console.log("patient-center: main.controller initiated."); 
}

},{}],7:[function(require,module,exports){
module.exports = function ($resource, profile_factory) {
    var personId = sessionStorage.getItem("medicloud_person_id");
    return {
        profile: profile_factory.get({personId: personId})
    }
}

},{}],8:[function(require,module,exports){
module.exports = function($scope, model) {
    $scope.ready = false;
    
    $scope.profile = model.profile;
    $scope.profile.$promise.then(
        function(response) {
            $scope.ready = true;
            console.log($scope.profile);
        },
        function(failure) {
            $scope.error = failure.data.message || failure.data.error ||
                            failure.message || failure.error || failure;
        }
    ); 

    console.log("patient-center: profile.controller initiated")
}

},{}],9:[function(require,module,exports){
module.exports = function($resource) {
    var url = "http://" + window.location.hostname + ":8080/api/patient/:personId/profile";

    return $resource(url);
}

},{}]},{},[2]);
