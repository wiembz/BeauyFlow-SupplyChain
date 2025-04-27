import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, DateSelectArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions;
  selectedEvent: EventApi | null = null;
  selectedDate: string = '';
  
  showActionIcons = false;
  showAddForm = false;
  showEditForm = false;
  
  newEventTitle = '';
  editEventTitle = '';

  iconTop = 0;
  iconLeft = 0;

  constructor() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: []
    };
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = selectInfo.startStr;
    this.showAddForm = true;
    this.showEditForm = false;
    this.showActionIcons = false;
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.selectedEvent = clickInfo.event;
    this.showEditForm = true;
    this.showAddForm = false;
    this.editEventTitle = this.selectedEvent.title;
  }

  saveNewEvent() {
    const calendarApi = this.calendarComponent.getApi();
    if (this.newEventTitle.trim()) {
      calendarApi.addEvent({
        title: this.newEventTitle,
        start: this.selectedDate,
        allDay: true
      });
      this.newEventTitle = '';
      this.showAddForm = false;
    }
  }

  saveEditedEvent() {
    if (this.selectedEvent && this.editEventTitle.trim()) {
      this.selectedEvent.setProp('title', this.editEventTitle);
      this.showEditForm = false;
      this.editEventTitle = '';
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newEventTitle = '';
  }

  cancelEdit() {
    this.showEditForm = false;
    this.editEventTitle = '';
  }

  deleteEvent() {
    if (this.selectedEvent) {
      this.selectedEvent.remove();
      this.showEditForm = false;
      this.selectedEvent = null;
    }
  }
}
