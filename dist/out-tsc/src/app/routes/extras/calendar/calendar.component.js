var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent() {
        this.calendarOptions = {
            // isRTL: true,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonIcons: {
                prev: ' fa fa-caret-left',
                next: ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            editable: true,
            droppable: true,
            eventClick: this.eventClick.bind(this),
            dayClick: this.dayClick.bind(this)
        };
        this.calendarEvents = this.createDemoEvents();
        this.selectedEvent = null;
        this.calendarOptions.events = this.calendarEvents;
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.$calendar = $(this.fullcalendar.nativeElement);
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        // init calendar plugin
        this.$calendar.fullCalendar(this.calendarOptions);
    };
    CalendarComponent.prototype.addRandomEvent = function () {
        // add dynamically an event
        this.addEvent({
            title: 'Random Event',
            start: new Date((new Date).getFullYear(), (new Date).getMonth(), Math.random() * (30 - 1) + 1),
            backgroundColor: '#c594c5',
            borderColor: '#c594c5' //purple
        });
    };
    CalendarComponent.prototype.eventClick = function (calEvent, jsEvent, view) {
        this.selectedEvent = {
            title: calEvent.title,
            start: calEvent.start,
            url: calEvent.url || ''
        };
        console.log('Event: ' + calEvent.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);
    };
    CalendarComponent.prototype.dayClick = function (date, jsEvent, view) {
        this.selectedEvent = {
            date: date.format()
        };
    };
    CalendarComponent.prototype.addEvent = function (event) {
        // store event
        this.calendarEvents.push(event);
        // display event in calendar
        this.$calendar.fullCalendar('renderEvent', event, true);
    };
    CalendarComponent.prototype.createDemoEvents = function () {
        // Date for the calendar events (dummy data)
        var date = new Date();
        var d = date.getDate(), m = date.getMonth(), y = date.getFullYear();
        return [{
                title: 'All Day Event',
                start: new Date(y, m, 1),
                backgroundColor: '#f56954',
                borderColor: '#f56954' //red
            }, {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                backgroundColor: '#f39c12',
                borderColor: '#f39c12' //yellow
            }, {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                backgroundColor: '#0073b7',
                borderColor: '#0073b7' //Blue
            }, {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                backgroundColor: '#00c0ef',
                borderColor: '#00c0ef' //Info (aqua)
            }, {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                backgroundColor: '#00a65a',
                borderColor: '#00a65a' //Success (green)
            }, {
                title: 'Open Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: '//google.com/',
                backgroundColor: '#3c8dbc',
                borderColor: '#3c8dbc' //Primary (light-blue)
            }];
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.$calendar.fullCalendar('destroy');
    };
    __decorate([
        ViewChild('fullcalendar'),
        __metadata("design:type", ElementRef)
    ], CalendarComponent.prototype, "fullcalendar", void 0);
    CalendarComponent = __decorate([
        Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CalendarComponent);
    return CalendarComponent;
}());
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map