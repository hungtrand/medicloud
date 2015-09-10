(function() {
    'use strict';

    angular
        .module('app.examples.calendar')
        .controller('EventDialogController', EventDialogController);

    /* @ngInject */
    function EventDialogController($scope, $mdDialog, $filter, triTheming, dialogData, event, edit) {

        var vm = this;
        vm.cancelClick = cancelClick;
        vm.colors = [];
        vm.colorChanged = colorChanged;
        vm.deleteClick = deleteClick;
        vm.allDayChanged = allDayChanged;
        vm.dialogData = dialogData;
        vm.edit = edit;
        vm.event = event;
        vm.okClick = okClick;
        vm.selectedColor = null;
        vm.start = convertMomentToBits(event.start);

        ////////////////

        function colorChanged() {
            vm.event.backgroundColor = vm.selectedColor.backgroundColor;
            vm.event.borderColor = vm.selectedColor.backgroundColor;
            vm.event.textColor = vm.selectedColor.textColor;
            vm.event.palette = vm.selectedColor.palette;
        }

        function okClick() {
            saveBitsToMoment(vm.start, vm.event.start);
            if(vm.event.end !== null) {
                saveBitsToMoment(vm.end, vm.event.end);
            }
            $mdDialog.hide(vm.event);
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function deleteClick() {
            vm.event.deleteMe = true;
            $mdDialog.hide(vm.event);
        }

        function allDayChanged() {
            // if all day turned on and event already saved we need to create a new date
            if(vm.event.allDay === false && vm.event.end === null) {
                vm.event.end = moment(vm.event.start);
                vm.event.end.endOf('day');
                vm.end = convertMomentToBits(vm.event.end);
            }
        }

        function convertMomentToBits(moment) {
            return {
                year: moment.year(),
                month: moment.month(),
                date: moment.date(),
                hour: moment.hour(),
                minute: moment.minute()
            };
        }

        function saveBitsToMoment(bits, moment) {
            moment.year(bits.year);
            moment.month(bits.month);
            moment.date(bits.date);
            moment.hour(bits.hour);
            moment.minute(bits.minute);
        }

        function createDateSelectOptions() {
            // create options for date select boxes (this will be removed in favor of mdDatetime picker when it becomes available)
            vm.dateSelectOptions = {
                years: [],
                months: ['CALENDAR.MONTHNAMES.JANUARY','CALENDAR.MONTHNAMES.FEBRUARY','CALENDAR.MONTHNAMES.MARCH','CALENDAR.MONTHNAMES.APRIL','CALENDAR.MONTHNAMES.MAY','CALENDAR.MONTHNAMES.JUNE','CALENDAR.MONTHNAMES.JULY','CALENDAR.MONTHNAMES.AUGUST','CALENDAR.MONTHNAMES.SEPTEMBER','CALENDAR.MONTHNAMES.OCTOBER','CALENDAR.MONTHNAMES.NOVEMBER', 'CALENDAR.MONTHNAMES.DECEMBER'],
                dates: [],
                hours: [],
                minutes: []
            };
            // years
            var now = new Date();
            for(var year = now.getFullYear() - 5; year <= now.getFullYear() + 5; year++) {
                vm.dateSelectOptions.years.push(year);
            }
            // days
            for(var date = 1; date <= 31; date++) {
                vm.dateSelectOptions.dates.push(date);
            }
            // hours
            for(var hour = 0; hour <= 23; hour++) {
                vm.dateSelectOptions.hours.push(hour);
            }
            // minutes
            for(var minute = 0; minute <= 59; minute++) {
                vm.dateSelectOptions.minutes.push(minute);
            }
        }

        // init

        if(event.end !== null) {
            vm.end = convertMomentToBits(vm.event.end);
        }

        createDateSelectOptions();

        // create colors
        angular.forEach(triTheming.palettes, function(palette, index) {
            var color = {
                name: index.replace(/-/g, ' '),
                palette: index,
                backgroundColor: triTheming.rgba(palette['500'].value),
                textColor: triTheming.rgba(palette['500'].contrast)
            };

            vm.colors.push(color);

            if(index === vm.event.palette) {
                vm.selectedColor = color;
                vm.colorChanged();
            }
        });
    }
})();
