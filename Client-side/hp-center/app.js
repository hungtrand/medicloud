!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports=function(a,b){return{request:function(b){var c=sessionStorage.getItem("medicloud_user_credentials");return c&&(b.headers.Authorization="Basic "+c),b||a.when(b)},responseError:function(b){return console.log("Found responseError: ",b),401==b.status&&(console.log("Access denied (error 401), please login again"),window.location.href="/sign-in/"),a.reject(b)}}}},{}],2:[function(a,b,c){!function(){var b=a("./patient/patient.module"),c=a("./patients/patients.module"),d=a("../Shared/authorization.interceptor"),e=a("./calendar/calendar.module"),f=a("./error/error.directive"),g=a("./main.controller");b(),c(),e();var h=new angular.module("hp-center",["ngRoute","ngResource","ngAnimate","hpPatient","hpPatientList","hpCalendar"]);h.config(["$routeProvider","$httpProvider",function(a,b){"use strict";a.otherwise({redirectTo:"/patients/"}),b.interceptors.push(["$q","$location",d])}]),h.directive("mdErrorModal",f),h.controller("hpCenter_main_controller",["$scope","$resource",g]),angular.bootstrap(window.document,["hp-center"])}()},{"../Shared/authorization.interceptor":1,"./calendar/calendar.module":4,"./error/error.directive":8,"./main.controller":9,"./patient/patient.module":27,"./patients/patients.module":30}],3:[function(a,b,c){b.exports=function(){return{link:function(a,b,c){function d(a){a.each(function(){var a={title:$.trim($(this).text())};$(this).data("eventObject",a),$(this).draggable({zIndex:1070,revert:!0,revertDuration:0})})}d($("#external-events div.external-event"));var e=new Date;e.getDate(),e.getMonth(),e.getFullYear();$("#calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},buttonText:{today:"today",month:"month",week:"week",day:"day"},editable:!0,droppable:!0,drop:function(a,b){var c=$(this).data("eventObject"),d=$.extend({},c);d.start=a,d.allDay=b,d.backgroundColor=$(this).css("background-color"),d.borderColor=$(this).css("border-color"),$("#calendar").fullCalendar("renderEvent",d,!0),$("#drop-remove").is(":checked")&&$(this).remove()}});var f="#3c8dbc";$("#color-chooser-btn");$("#color-chooser > li > a").click(function(a){a.preventDefault(),f=$(this).css("color"),$("#add-new-event").css({"background-color":f,"border-color":f})}),$("#add-new-event").click(function(a){a.preventDefault();var b=$("#new-event").val();if(0!=b.length){var c=$("<div />");c.css({"background-color":f,"border-color":f,color:"#fff"}).addClass("external-event"),c.html(b),$("#external-events").prepend(c),d(c),$("#new-event").val("")}}),$("[data-date]").click(function(){a.modalControl.show=!a.modalControl.show,a.selectedDate=$(this).attr("data-date"),a.$apply(),a.setSelectedDate()})},controller:["$scope","$rootScope","calendarService",function(a,b,c){a.modalControl={show:!1},a.setSelectedDate=function(){c.selectedDate=a.selectedDate,b.$broadcast("dateSelected",{date:c.selectedDate})}}]}}},{}],4:[function(a,b,c){b.exports=function(){var b=a("./calendar.service.js"),c=a("../modalDialogue/modal.directive"),d=a("./calendar.js"),e=angular.module("hpCalendar",["ngRoute","hpPatientList"]);e.config(["$routeProvider",function(a){"use strict";a.when("/calendar/",{templateUrl:"calendar/calendar.html"})}]),e.service("calendarService",["$http","$rootScope","$resource",b]),e.directive("appointmentModalDirective",c),e.directive("calendarDirective",d)}},{"../modalDialogue/modal.directive":10,"./calendar.js":3,"./calendar.service.js":5}],5:[function(a,b,c){b.exports=function(a,b,c){var d,e,f,g,h=sessionStorage.getItem("medicloud_hp_id"),i="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/:patientId",j="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/availability?userDate=:selectedDate",k="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/:patientId/appointment",l="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/getListOfAppointments?userDate=:selectedDate",m={times:[],getTimes:function(){g=this.selectedDate;var a=this,b=c(j,{hpId:h,selectedDate:g});console.log("service.getTimes() selectedDate is "+g);var f=b.query().$promise;return f.then(function(b){angular.copy(b,a.times),(d||angular.noop)(),d=null,e=null},function(a){(e||angular.noop)(a),d=null,e=null}),f},appointments:[],getAppointments:function(){g=this.selectedDate;var a=this,b=c(l,{hpId:h,selectedDate:g});console.log("getAppointments function");var f=b.query().$promise;return f.then(function(b){angular.copy(b,a.appointments),(d||angular.noop)(),d=null,e=null},function(a){(e||angular.noop)(a),d=null,e=null}),f},patients:[],getPatients:function(){var a=this,b=c(i,{hpId:h}),f=b.query().$promise;return f.then(function(b){angular.extend(a.patients,b),(d||angular.noop)(),d=null,e=null},function(a){(e||angular.noop)(a),d=null,e=null}),this.patients},addAppointment:function(a,d){f=d,console.log("In calendar service. patientId is "+d);var e=c(k,{hpId:h,patientId:d});e.save(a,function(a){b.$broadcast("appointmentAdded"),console.log("appointment broadcast"),a.personId?(m.patients.push(a),$("#patientSuccessAlert").show(),setTimeout(function(){$("#patientSuccessAlert").fadeOut("slow")},3e3)):$("#patientFailureAlert").show(),console.log(a)})},onSuccess:function(a){return d=a,this},onFailure:function(a){return e=a,this}};return m}},{}],6:[function(a,b,c){b.exports=function(){var a=function(a,b){a.waiting=!0;var c=function(){a.suggestions=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.obj.whitespace("name"),queryTokenizer:Bloodhound.tokenizers.whitespace,identify:function(a){return a.id},local:b.data.conditions}),setTimeout(function(){a.$broadcast("conditionSearch.suggestions.updated")},200),a.waiting=!1};b.ready?c():a.$on("infermedicaConditions_serv.data.updated",function(){c()})};return{templateUrl:"conditionSearch/conditionSearch.template.html",scope:{onSelect:"="},link:function(a,b,c){a.$on("conditionSearch.suggestions.updated",function(){b.find(".inputSearch").typeahead("destroy"),b.find(".inputSearch").typeahead({hint:!0,highlight:!0,minLength:1},{name:"conditions",source:a.suggestions,displayKey:"name",templates:{empty:['<div class="text-muted">',"No Suggestion","</div>"].join("\n"),suggestion:function(a){var b='<div class="list-group-item"><dl><dt>{{name}}<label class="label pull-right">{{severity}}</label></dt><dd><em>{{categories}}</em></dd></div>',c=b.replace(/{{name}}/g,a.name).replace(/{{severity}}/g,a.severity).replace(/{{categories}}/g,a.categories.join(", "));return c=$(c),"mild"==a.severity?c.find("label").toggleClass("label-info",!0):"moderate"==a.severity?c.find("label").toggleClass("label-warning",!0):"severe"==a.severity?c.find("label").toggleClass("label-danger",!0):c.find("label").toggleClass("label-default",!0),c}}}),b.find(".inputSearch").bind("typeahead:select",function(b,c){(a.onSelect||angular.noop)(c)})})},controller:["$scope","infermedicaConditions_serv",a]}}},{}],7:[function(a,b,c){b.exports=function(a,b){var c="http://"+window.location.hostname+"\\:8080/conditions",d=("http://"+window.location.hostname+"\\:8080/conditions/:condition_id",a(c,{condition_id:"@c_id"})),e={ready:!1,data:{conditions:[]},fetchAll:function(){var a=this,c=d.query({},function(){a.data.conditions.splice(0,a.data.conditions.length),angular.extend(a.data.conditions,c),b.$broadcast("infermedicaConditions_serv.data.updated"),a.ready=!0},function(a){b.$broadcast("infermedicaConditions_serv.data.error",a)});return d.$promise}};return e.fetchAll(),e}},{}],8:[function(a,b,c){b.exports=function(){return{scope:{error:"=",control:"="},templateUrl:"error/error.template.html",link:function(a,b,c){var d=$(b[0]).modal("hide");a.control={isShown:!1,show:function(b){a.error=b||a.error,d.modal("show"),d.on("modal.bs.shown",function(){a.isShown=!0})},hide:function(){d.modal("hide"),moda.on("modal.bs.hidden",function(){a.isShown=!1})}}}}}},{}],9:[function(a,b,c){b.exports=function(a,b){a.error="",a.errorModalControl={},a.$on("error",function(b){a.error=b.data.error||b.data,a.errorModalControl.show()});var c="http://"+window.location.hostname+"\\:8080/api/hp/:hpId/profile",d=sessionStorage.getItem("medicloud_hp_id");a.profile=b(c,{hpId:d}).get(),a.signout=function(){sessionStorage.clear(),window.location.href="/sign-in/"}}},{}],10:[function(a,b,c){b.exports=function(){return{restrict:"E",scope:{show:"=",submit:"="},replace:!0,transclude:!0,link:function(a,b,c){$(document).on("dblclick",function(){console.log("scope.show is "+a.show)}),a.$watch("show",function(c){c?$(b[0]).modal("show"):$(b[0]).on("hidden.bs.modal",function(){a.show=!1,a.$apply()})})},templateUrl:"modalDialogue/modal.html",controller:["$scope","$rootScope","patientsListService","calendarService",function(a,b,c,d){var e,f={appointmentTime:"9:00",appointmentDate:"2000-01-01",reason:"N/A"};a.selectedPatient="Select a patient",a.selectedTime="Select a time",a.appointmentList=d.appointments,a.timesList=d.times,$('[data-toggle="tooltip"]').tooltip("disable"),b.$on("dateSelected",function(b,e){console.log("Broadcast received. Date is "+e.date),a.patientList=c.getPatients(),d.getTimes(),d.getAppointments().then(function(){console.log("appointmentList is "+a.appointmentList)}),f.appointmentDate=e.date}),a.selectPatient=function(b){a.selectedPatient=b,e=a.selectedPatient.patientId},a.selectTime=function(b){a.selectedTime=b,f.appointmentTime=a.selectedTime},a.submitAppointment=function(){f.reason=a.reason,d.addAppointment(f,e),console.log("Appointment is "+f)},a.$on("appointmentAdded",function(){$(".modal.in").modal("hide"),$("#AddAppointmentForm")[0].reset(),a.selectedTime="Select a time"})}]}}},{}],11:[function(a,b,c){b.exports=function(){return{templateUrl:"patient/conditions/activeCondition.template.html",scope:{activeCondition:"=",observationPicker:"="},link:function(a,b,c){},controller:["$scope","activeCondition_factory",function(a,b){a.pickStartObservation=function(){a.observationPicker.show(),a.observationPicker.onSelect=function(c){a.activeCondition.startObservation=c,a.activeCondition.startObsId=c.obsId,b.update({patientId:a.activeCondition.patientId,activeConditionId:a.activeCondition.activeConditionId},a.activeCondition)}},a.pickEndObservation=function(){a.observationPicker.show(),a.observationPicker.onSelect=function(c){a.activeCondition.endObservation=c,a.activeCondition.endObsId=c.obsId,b.update({patientId:a.activeCondition.patientId,activeConditionId:a.activeCondition.activeConditionId},a.activeCondition)}}}]}}},{}],12:[function(a,b,c){b.exports=function(a,b){var c=sessionStorage.getItem("medicloud_hp_id"),d="http://"+window.location.hostname+"\\:8080/api/hp/:hpId/patients/:patientId/conditions/:activeConditionId",e=a(d,{hpId:c,patientId:"@patientId",activeConditionId:"@activeConditionId"},{update:{method:"PUT"}});return e}},{}],13:[function(a,b,c){b.exports=function(a,b,c,d){a.patient=b.getPatient(d.patient_id),a.patient.fetchConditions(),a.newActiveConditionForms=[],a.observationPickerControl={},a.getNewActiveConditionForm=function(){a.newActiveConditionForms.unshift({})},a.removeForm=function(b){a.newActiveConditionForms.splice(b,1)}}},{}],14:[function(a,b,c){b.exports=function(){var a=function(a,b){a.mode="search",a.formatDate=function(a){return a?new Date(a):"none"},a.showSearch=function(){a.mode="search"},a.save=function(){a.patient.addActiveCondition(a.condition.name,a.condition.severity,a.condition.description,a.condition.inferCId),(a.onSaved||angular.noop)()},a.cancel=function(){(a.onCancelled||angular.noop)()},a.severityOptions=["mild","moderate","severe"],a.create=function(b){b&&(a.condition.name=b.name,a.condition.severity=b.severity,a.condition.inferCId=b.id,a.condition.description=""),a.mode="create",setTimeout(function(){a.$apply()},200)}};return{templateUrl:"patient/conditions/newActiveCondition.template.html",scope:{condition:"=condData",patient:"=",onSaved:"&",onCancelled:"&"},link:function(a,b,c){a.condition.name="",a.condition.severity="",a.condition.infer_c_id=null,a.condition.description="",a.confirm=function(){a.mode="confirm"}},controller:["$scope","models_service",a]}}},{}],15:[function(a,b,c){b.exports=function(){var a=function(a,b,c,d){a.patient=b.getPatient(d.patient_id),a.patient.fetchObservations()};return{templateUrl:"patient/conditions/observationPicker.template.html",scope:{control:"="},link:function(a,b,c){var d=$(b[0]).find(".modal");a.control.show=function(){return d.modal("show"),a.control},a.control.hide=function(){return d.modal("hide"),a.control},a.onSelect=angular.noop,a.selectObservation=function(b){return a.control.onSelect(b),a.control.onSelect=angular.noop,a.control.hide(),a.control}},controller:["$scope","models_service","$route","$routeParams",a]}}},{}],16:[function(a,b,c){b.exports=function(a,b){var c=(sessionStorage.getItem("medicloud_hp_id"),"http://"+window.location.hostname+"\\:8080/api/hp/:hpId/patients/:patientId/encounters"),d=a(c,{hpId:"@hpId",patientId:"@patientId"});return d}},{}],17:[function(a,b,c){b.exports=function(a,b){var c=(sessionStorage.getItem("medicloud_hp_id"),"http://"+window.location.hostname+"\\:8080/api/hp/:hpId/patients/:patientId/lab-results/:labResultId"),d=a(c,{hpId:"@hpId",patientId:"@patientId",labResultId:"@labResultId"},{update:{method:"PUT"}});return d.prototype.name="",d.prototype.status="Started",d.prototype.result="",d.prototype.hpId=null,d.prototype.patientId=null,d.prototype.lastUpdated=null,d.prototype.infermedicaLabId=null,d.prototype.edit=function(){this.mode="edit"},d}},{}],18:[function(a,b,c){b.exports=function(a,b,c,d,e,f){a.patient=b.getPatient(d.patient_id),a.loading=!0,a.loadingLabTests=!0,a.newLabs=[],a.patient.fetchLabResults().then(function(){a.loading=!1},function(a){g(a)}),a.labStatusChoices=["Started","Pending","Received","Processing","Delivered","Completed","Cancelled"],a.labTestSuggestions=f.query(),a.labTestSuggestions.$promise.then(function(b){a.loadingLabTests=!1}),a.addLabResult=function(){var b=new e;a.newLabs.push(b)},a.saveNewLab=function(b,c){return b.name?b.category?b.status?(b.loading=!0,void a.patient.saveLabResult(b).then(function(){a.newLabs.splice(c,1)})):!(b._error="status"):!(b._error="category"):!(b._error="name")},a.saveLab=function(a){a.loading=!0,a.$update().then(function(){a.loading=!1,a.edit=!1},function(b){a.loading=!1})},a.selectLabTest=function(a,b){a.name=b.name,a.category=b.category,a.readonly=!0,a.infermedicaLabId=b.id};var g=function(b){a.error=b.error?b.error:b,a.error=angular.isArray(a.error)?a.error.join("\n"):a.error,a.waiting=!1}}},{}],19:[function(a,b,c){b.exports=function(a){var b="http://"+window.location.hostname+"\\:8080/labs",c=a(b);return c}},{}],20:[function(a,b,c){b.exports=function(a,b,c,d){a.incConditionList="patient/conditions/activeConditionList.html",a.incObservationList="patient/observations/observations.html",a.incLabResults="patient/labs/labResults.html",a.patient=b.getPatient(d.patient_id),a.modalMessage={show:!1,title:"patient/message/formMessage.title.html",body:"patient/message/formMessage.html",footer:"patient/message/formMessage.footer.html",actions:{send:function(){console.log("Sent")}}}}},{}],21:[function(a,b,c){b.exports=function(a,b){var c={patients:[],patientIndex:{}},d={getPatient:function(d){if(c.patientIndex.hasOwnProperty(d)){var e=c.patientIndex[d];return c.patients[e]}var f=c.patients.length;return c.patientIndex[d]=f,c.patients.push(new b(d)),c.patients[f].onLoad(function(b){a.$broadcast("patients.updated",c.patients[f])}),c.patients[f].onFailure(function(a){c.patients[f]=null,delete c.patientIndex[d]}),c.patients[f]},getPatients:function(){return model.patients}};return d}},{}],22:[function(a,b,c){b.exports=function(a){var b=sessionStorage.getItem("medicloud_hp_id"),c="http://"+window.location.hostname+"\\:8080/api/hp/:hpId/patients/:patientId/observations",d=a(c,{hpId:b,patientId:"@patientId"},{save:{method:"POST"}});return d}},{}],23:[function(a,b,c){b.exports=function(){return{templateUrl:"patient/observations/addObservationForm.html",scope:{control:"="},link:function(a,b,c){var d=$(b[0]).find(".modal").modal("hide"),e=b.find("#btnPickEncounterDate");e.find("input").on("click",function(a){a.stopPropagation()}),a.control.show=function(){d.modal("show")},a.control.hide=function(){d.modal("hide")}},controller:["$scope","$filter","models_service","$route","$routeParams","observationSuggestions_factory",function(a,b,c,d,e,f){a.error="",a.waiting=!1,a.control={},a.form={encounterDate:"",encounterReason:"",state:"",comments:""},a.patient=c.getPatient(e.patient_id),a.setEncounterDate=function(c){var d;if("object"==typeof c&&null!=c)d=b("date")(c,"shortDate");else{if("number"!=typeof c)return;d=new Date,d.setDate(d.getDate()+c)}a.form.encounterDate=b("date")(d,"shortDate")},a.submitNewObservationForm=function(){a.waiting=!0,a.patient.addNewObservation(a.form).then(function(b){a.waiting=!1,a.control.hide(),a.form={}},function(a){g(a)})},a.queryObservationSuggestions=function(b){return a.obsSuggestions=f.query({keywords:b,gender:a.patient.gender||""}),a.obsSuggestions.$promise.then(function(){return a.obsSuggestions})},a.addToObservationComments=function(b){a.form.comments&&(a.form.comments+="\n"),a.form.comments+=b.label,a.selectedObsSuggestion=""};var g=function(b){a.error=b.error?b.error:b,a.error=angular.isArray(a.error)?a.error.join("\n"):a.error,a.waiting=!1}}]}}},{}],24:[function(a,b,c){b.exports=function(a){var b="http://"+window.location.hostname+"\\:8080/observations",c=a(b);return c}},{}],25:[function(a,b,c){b.exports=function(a,b,c,d){a.patient=b.getPatient(d.patient_id),a.waiting=!0,a.patient.fetchEncounters().then(function(){a.waiting=!1},function(a){e(a)}),a.openObservationForm=function(){a.observationForm.show()};var e=function(b){a.error=b.error?b.error:b,a.error=angular.isArray(a.error)?a.error.join("\n"):a.error,a.waiting=!1}}},{}],26:[function(a,b,c){b.exports=function(a,b,c,d,e,f,g){var h=sessionStorage.getItem("medicloud_hp_id"),i="http://"+window.location.hostname+"\\:8080/api/hp/:hpId/patients/:patientId",j=a(i,{hpId:h,patientId:"@patientId"}),k=i+"/conditions/:conditionId",l=a(k,{hpId:h,patientId:"@patientId",conditionId:"@conditionId"}),m=i+"/observations/:obsId",n=a(m,{hpId:h,patientId:"@patientId",obsId:"@obsId"}),o=function(a){this.patientId=a,this.onLoadCallback=angular.noop,this.onFailureCallback=angular.noop,this.conditions=[],this.observations=[],this.encounters=[],this.labs=[],this.lastVisit=null,this.$promise=this.fetch()};return o.prototype={constructor:o,onLoad:function(a){this.onLoadCallback=a},onFailure:function(a){this.onFailureCallback=a},fetch:function(){var a=this,c=j.get({patientId:a.patientId},function(b,c){angular.extend(a,b),a.onLoadCallback.call(a,b)},function(c){b.$broadcast("error",c),a.onFailureCallback.call(a,c)});return c.$promise},fetchConditions:function(){var a=this;a.conditions.splice(0,a.conditions.length);var d=l.query({patientId:a.patientId},function(b){var d=c("orderBy")(b,"-dateCreated");angular.copy(d,a.conditions)},function(a){b.$broadcast("error",a)}).$promise;return d},addActiveCondition:function(a,c,e,f){var g=this,h=d.save({name:a,severity:c,description:e,inferCId:f,patient:g,patientId:g.patientId});return h.$promise.then(function(a){g.conditions.unshift(h)},function(a){b.$broadcast("error",a)}),h.$promise},fetchObservations:function(){var a=this;a.observations.splice(0,a.observations.length);var c=n.query({patientId:a.patientId},function(b){angular.copy(b,a.observations)},function(a){b.$broadcast("error",a)});return c.$promise},addNewObservation:function(a){var c=this,d=e.save({hpId:h,patientId:c.patientId},a);return d.$promise.then(function(a){c.fetchObservations(),c.fetchEncounters()},function(a){b.$broadcast("error",a)}),d.$promise},fetchEncounters:function(){var a=this;a.encounters.splice(0,a.encounters.length);var d=f.query({hpId:h,patientId:a.patientId},function(b){var d=c("orderBy")(b,"-encounterDateTime");angular.copy(d,a.encounters),a.encounters.length>0&&(a.lastVisit=a.encounters[0].encounterDateTime)},function(a){b.$broadcast("error",a)});return d.$promise},fetchLabResults:function(){var a=this;a.labs.splice(0,a.labs.length);var d=g.query({hpId:h,patientId:a.patientId},function(b){var d=c("orderBy")(b,"-lastUpdated");angular.copy(d,a.labs)},function(a){b.$broadcast("error",a)});return d.$promise},saveLabResult:function(a){var c=this,d=g.save({hpId:h,patientId:c.patientId},a);return d.$promise.then(function(a){c.labs.push(d)},function(a){b.$broadcast("error",a)}),d.$promise}},o}},{}],27:[function(a,b,c){b.exports=function(){var b=a("../../Shared/authorization.interceptor"),c=a(".//main.controller"),d=a("./../share/modal.directive"),e=a("./models.service"),f=a("./patient.factory"),g=a("./profile/profile.controller"),h=a("./conditions/activeConditionList.controller"),i=a("./conditions/activeCondition.directive"),j=a("./conditions/newActiveCondition.directive"),k=a("./conditions/activeCondition.factory"),l=a("./../conditionSearch/conditionSearch.directive"),m=a("./../conditionSearch/infermedicaConditions.service"),n=a("./observations/observations.controller"),o=a("./observations/observation.factory"),p=a("./observations/observationForm.directive"),q=a("./encounters/encounterList.factory"),r=a("./conditions/observationPicker.directive"),s=a("./observations/observationSuggestions.factory"),t=a("./labs/lab-result.factory"),u=a("./labs/lab-results.controller"),v=a("./labs/lab-tests_factory"),w=angular.module("hpPatient",["ngRoute","ngResource","ui.bootstrap"]);w.config(["$routeProvider","$httpProvider",function(a,c){"use strict";a.when("/patient/:patient_id/:tab?",{templateUrl:"patient/",controller:"profile_ctrl"}),c.interceptors.push(["$q","$location",b])}]),w.service("models_service",["$rootScope","patient_factory",e]).service("infermedicaConditions_serv",["$resource","$rootScope",m]).service("patient_factory",["$resource","$rootScope","$filter","activeCondition_factory","observation_factory","encounterList_factory","labResult_factory",f]),w.factory("activeCondition_factory",["$resource","$rootScope",k]).factory("observation_factory",["$resource",o]).factory("encounterList_factory",["$resource",q]).factory("observationSuggestions_factory",["$resource",s]).factory("labResult_factory",["$resource",t]).factory("labTests_factory",["$resource",v]),w.directive("mcConditionSearch",l).directive("mcNewActiveCondition",j).directive("mcActiveCondition",i).directive("mcObservationForm",p).directive("mcModal",d).directive("mcObservationPicker",r),w.controller("profile_ctrl",["$scope","models_service","$route","$routeParams",g]).controller("conditionList_ctrl",["$scope","models_service","$route","$routeParams",h]).controller("observations_ctrl",["$scope","models_service","$route","$routeParams",n]).controller("labResults_controller",["$scope","models_service","$route","$routeParams","labResult_factory","labTests_factory",u]).controller("main_ctrl",["$scope","models_service","$route","$routeParams",c])}},{"../../Shared/authorization.interceptor":1,"./../conditionSearch/conditionSearch.directive":6,"./../conditionSearch/infermedicaConditions.service":7,"./../share/modal.directive":33,".//main.controller":20,"./conditions/activeCondition.directive":11,"./conditions/activeCondition.factory":12,"./conditions/activeConditionList.controller":13,"./conditions/newActiveCondition.directive":14,"./conditions/observationPicker.directive":15,"./encounters/encounterList.factory":16,"./labs/lab-result.factory":17,"./labs/lab-results.controller":18,"./labs/lab-tests_factory":19,"./models.service":21,"./observations/observation.factory":22,"./observations/observationForm.directive":23,"./observations/observationSuggestions.factory":24,"./observations/observations.controller":25,"./patient.factory":26,"./profile/profile.controller":28}],28:[function(a,b,c){b.exports=function(a,b,c,d){a.patient=b.getPatient(d.patient_id)}},{}],29:[function(a,b,c){b.exports=function(){return{restrict:"E",scope:{show:"=",submit:"=",error:"=",waiting:"="},replace:!0,transclude:!0,link:function(a,b,c){a.$watch("show",function(a){a?$(b[0]).modal("show"):$(b[0]).modal("hide")}),b.on("submit",function(){for(var c=b[0].querySelectorAll("input,select,textarea"),d=c.length;d--;)c[d].addEventListener("invalid",function(){this.scrollIntoView(!1)});if(console.log(a.checked),0==a.checked){var e=a.patient;e=angular.extend({},a.patient),e.birthdate=b.find("[type=date]").val(),a.submit(e)}else a.submit(a.invitationCode)})},templateUrl:"patients/formAddPatient/formAddPatient.html",controller:["$scope","$rootScope",function(a,b){a.checked=!1,$('[data-toggle="tooltip"]').tooltip("disable"),a.patient={firstName:"",lastName:""},a.newOrExistingPatient=function(){console.log("$scope.checked: "+a.checked),a.checked?b.$broadcast("existingPatient"):b.$broadcast("newPatient")}}]}}},{}],30:[function(a,b,c){b.exports=function(){var b=a("./patientsList/patientsList.controller"),c=a("./patientsList/patientsList.service"),d=a("./formAddPatient/formAddPatient.directive"),e=a("../../Shared/authorization.interceptor"),f=angular.module("hpPatientList",["ngRoute","hpCalendar","hpPatient"]);f.config(["$routeProvider","$httpProvider",function(a,b){"use strict";a.when("/patients/",{templateUrl:"patients/",controller:"patientsList_ctrl"}),b.interceptors.push(["$q","$location",e])}]),f.service("patientsListService",["$http","$rootScope","$resource",c]),f.directive("modalDialog",["$rootScope",d]),f.controller("patientsList_ctrl",["$scope","$rootScope","patientsListService","calendarService","patient_factory",b])}},{"../../Shared/authorization.interceptor":1,"./formAddPatient/formAddPatient.directive":29,"./patientsList/patientsList.controller":31,"./patientsList/patientsList.service":32}],31:[function(a,b,c){b.exports=function(a,b,c,d,e){function f(){a.waiting=!0,c.getPatients().onSuccess(function(b){a.waiting=!1,a.patientList=c.patients}).onFailure(function(b){a.waiting=!1,console.log(b)})}a.patientList=[],f(),a.status,a.modalShown=!1,a.patient={},a.toggleModal=function(){a.modalShown=!a.modalShown},a.contactClicked=!1,a.selectedPatient;var g=!0;a.appointments=d.appointments;var h={invitationCode:123456};$("#patientSuccessAlert").hide(),$("#patientFailureAlert").hide(),a.clicked=function(b){a.selectedPatient||$('[data-spy="affix"]').affix({offset:{top:200}}),a.contactClicked=!1,a.contactClicked=!0,a.selectedPatient=b;var c=new e(b.patientId);c.$promise.then(function(){a.selectedPatient=c,a.selectedPatient.fetchConditions(),a.selectedPatient.fetchEncounters(),a.selectedPatient.fetchLabResults()})},b.$on("patientAdded",function(){a.modalShown=!1,a.waiting=!1,$("#AddPatientForm")[0].reset()}),b.$on("existingPatient",function(){g=!1,console.log("newPatient"+g)}),b.$on("newPatient",function(){g=!0,console.log("newPatient"+g)}),a.addPatient=function(b){a.waiting=!0,g?c.addPatient(b).then(function(b){b.personId&&(a.modalShown=!1),a.waiting=!1},function(b){a.error=b.data.message||b.data.error||b.message||b.error||b,a.waiting=!1}):(c.invitationCode=b,h.invitationCode=b,console.log("in contoller: code is"+b),c.addExistingPatient(h))}}},{}],32:[function(a,b,c){b.exports=function(a,b,c){var d,e,f,g=sessionStorage.getItem("medicloud_hp_id"),h="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/:patientId",i="http://"+window.location.hostname+":8080/api/hp/:hpId/patients/addCode",j={patients:[{firstName:"Peter",lastName:"Parker",email:"peterparker@gmail.com"},{firstName:"Bruce",lastName:"Wayne",email:"brucewayne@gmail.com"}],getPatients:function(){var a=this,b=c(h,{hpId:g}),f=b.query().$promise;return f.then(function(b){a.patients=b,(d||angular.noop)(),d=null,e=null},function(a){(e||angular.noop)(a),d=null,e=null}),this},onSuccess:function(a){return d=a,this},onFailure:function(a){return e=a,this},addPatient:function(a){var d=c(h,{hpId:g}),e=d.save(a,function(a){a.personId?(b.$broadcast("patientAdded"),j.patients.push(a),$("#patientSuccessAlert").show(),setTimeout(function(){$("#patientSuccessAlert").fadeOut("slow")},3e3)):$("#patientFailureAlert").show(),console.log(a)});return e.$promise},addExistingPatient:function(a){f=this.invitationCode,console.log("service code is "+f);var d=c(i,{hpId:g});d.save(a,function(a){a.personId?(b.$broadcast("patientAdded"),j.patients.push(a),$("#patientSuccessAlert").show(),setTimeout(function(){$("#patientSuccessAlert").fadeOut("slow")},3e3)):$("#patientFailureAlert").show(),console.log("existing patient added")})}};return j}},{}],33:[function(a,b,c){b.exports=function(){return{templateUrl:"share/modal.template.html",scope:{show:"=show",title:"=mcTitle",body:"=mcBody",footer:"=mcFooter",actions:"=mcActions"},link:function(a,b,c){a.$watch("show",function(a,c){a?b.find(".modal").modal("show"):b.find(".modal").modal("hide")}),b.find(".modal").on("shown.bs.modal",function(){a.show=!0,a.$apply()}),b.find(".modal").on("hidden.bs.modal",function(){a.show=!1,a.$apply()})}}}},{}]},{},[2]);