import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { CalendarService } from '../../services/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-cpodash',
  templateUrl: './cpodash.component.html',
  styleUrls: ['./cpodash.component.css']
})
export class CPODashComponent {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  dashboardUrl: SafeResourceUrl;
  messages: any[] = [];
  users: any[] = [];
  newMessage: string = '';
  selectedDestinataireId: number | null = null;
  userId: number = 8;

  showMessages = false;
  showNewMessage = false;
  showCalendarModal = false;
  successMessage = '';
  refreshSubscription!: Subscription;


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: []
  };

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private userService: UserService,
    private calendarService: CalendarService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
    this.loadMessages();
    this.loadUsers();
    this.loadEvents();
    this.listenToCalendarIcons();
      // ⏰ Auto-refresh toutes les 5 secondes
      this.refreshSubscription = interval(5000).subscribe(() => {
        if (this.showMessages) {  // seulement si la section "Messages" est ouverte
          this.loadMessages();
        }
      });
  
  }

  loadMessages() {
    this.chatService.getMessages(this.userId).subscribe(data => {
      this.messages = data;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedDestinataireId) {
      this.chatService.sendMessage(this.userId, this.selectedDestinataireId, this.newMessage)
        .subscribe({
          next: () => {
            this.newMessage = '';
            this.selectedDestinataireId = null;
            this.successMessage = '✅ Message envoyé avec succès!';
            this.showNewMessage = false;
            this.loadMessages();
            setTimeout(() => this.successMessage = '', 3000);
          },
          error: () => {
            this.successMessage = '❌ Erreur lors de l\'envoi.';
            setTimeout(() => this.successMessage = '', 3000);
          }
        });
    }
  }

  toggleMessages() {
    this.showMessages = !this.showMessages;
    this.showNewMessage = false;
    this.showCalendarModal = false;
  }

  toggleNewMessage() {
    this.showNewMessage = !this.showNewMessage;
    this.showMessages = false;
    this.showCalendarModal = false;
  }

  toggleCalendar() {
    this.showCalendarModal = !this.showCalendarModal;
    this.showMessages = false;
    this.showNewMessage = false;
  }

  closeCalendar() {
    this.showCalendarModal = false;
  }

  loadEvents() {
    this.calendarService.getEvents().subscribe(events => {
      this.calendarOptions.events = events.map(e => ({
        id: String(e.id),
        title: e.name,
        start: e.start,
        end: e.stop,
        extendedProps: {
          createdBy: e.user_id
        }
      }));
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    const tempEvent = calendarApi.addEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });

   

    calendarApi.unselect();
  }

  handleEventClick(clickInfo: EventClickArg) {
    const eventId = Number(clickInfo.event.id);
    const createdBy = clickInfo.event.extendedProps['createdBy'];

    if (createdBy !== this.userId) {
      alert('🚫 Vous ne pouvez modifier/supprimer que vos propres événements.');
      return;
    }

    if (confirm(`Supprimer l'événement "${clickInfo.event.title}" ?`)) {
      this.calendarService.deleteEvent(eventId).subscribe(() => {
        clickInfo.event.remove();
      });
    }
  }

  listenToCalendarIcons() {
    window.addEventListener('addEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent.getApi().getEventById(id);
      const title = prompt('Titre de votre événement ?');
      if (title && event) {
        event.setProp('title', title);
      }
    });

    window.addEventListener('editEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent.getApi().getEventById(id);
      const newTitle = prompt('Modifier le titre :', event?.title || '');
      if (newTitle && event) {
        event.setProp('title', newTitle);
      }
    });

    window.addEventListener('deleteEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent.getApi().getEventById(id);
      if (event && confirm('Supprimer cet événement ?')) {
        event.remove();
      }
    });
  }
}
