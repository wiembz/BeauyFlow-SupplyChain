// calendar.component.ts
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    selectMirror: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  newEventTitle = '';
  selectedEvent: EventApi | null = null;
  selectedDate = '';
  showPopup = false;
  userId = 8; // ID utilisateur (CPO)

  constructor(private calendarService: CalendarService) {
    this.loadEvents();
  }

  loadEvents() {
    this.calendarService.getEvents().subscribe(events => {
      this.calendarOptions.events = events.map(event => ({
        id: String(event.id),
        title: event.name,
        start: event.start,
        end: event.stop,
        allDay: true
      }));
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.selectedDate = selectInfo.startStr;
    this.showPopup = true;
    this.selectedEvent = null;
    this.newEventTitle = '';
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.selectedEvent = clickInfo.event;
    this.newEventTitle = this.selectedEvent.title;
    this.showPopup = true;
  }

  saveEvent() {
    if (this.selectedEvent) {
      // Si on modifie un event existant
      this.calendarService.updateEvent(Number(this.selectedEvent.id), {
        name: this.newEventTitle,
        start: this.selectedEvent.startStr,
        stop: this.selectedEvent.startStr,
        user_id: this.userId
      }).subscribe({
        next: () => {
          console.log('✅ Event updated');
          this.loadEvents();  // <<< recharge après update
          this.closePopup();
        },
        error: (err) => console.error('❌ Error updating event:', err)
      });
  
    } else {
      // Si c'est un nouvel event
      const calendarApi = this.calendarComponent.getApi();
      const event = calendarApi.addEvent({
        title: this.newEventTitle,
        start: this.selectedDate,
        allDay: true
      });
  
      this.calendarService.createEvent({
        name: this.newEventTitle,
        start: this.selectedDate,
        stop: this.selectedDate,
        user_id: this.userId
      }).subscribe({
        next: () => {
          console.log('✅ Event created');
          this.loadEvents();  // <<< recharge après création
          this.closePopup();
        },
        error: (err) => console.error('❌ Error creating event:', err)
      });
    }
  }
  
  deleteEvent() {
    if (this.selectedEvent) {
      this.calendarService.deleteEvent(Number(this.selectedEvent.id)).subscribe(() => {
        this.selectedEvent?.remove();
        console.log('🗑️ Event deleted from Odoo');
        this.closePopup();
      });
    }
  }

  closePopup() {
    this.showPopup = false;
    this.newEventTitle = '';
    this.selectedEvent = null;
    this.selectedDate = '';
  }
}
