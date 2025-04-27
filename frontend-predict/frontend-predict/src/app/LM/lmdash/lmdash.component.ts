import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription, interval } from 'rxjs';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-lmdash',
  templateUrl: './lmdash.component.html',
  styleUrls: ['./lmdash.component.css']
})
export class LMDashComponent implements OnInit, OnDestroy {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  dashboardUrl: SafeResourceUrl;
  messages: any[] = [];
  users: any[] = [];
  newMessage: string = '';
  selectedDestinataireId: number | null = null;
  userId: number = 8;
  messageSent = false;

  showMessages = false;
  showNewMessage = false;
  showCalendarModal = false;
  successMessage = '';
  events: { day: string, hour: string, title: string }[] = [];

  refreshSubscription!: Subscription;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    events: []
  };

  constructor(
    private sanitizer: DomSanitizer,
    private chatService: ChatService,
    private userService: UserService,
    private calendarService: CalendarService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=2868037c-2ff6-49bc-86b3-612724cad2c0&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }

  ngOnInit() {
    this.loadMessages();
    this.loadUsers();
    this.loadEvents();
    this.listenToCalendarIcons();

    // ⏰ Auto-refresh des messages toutes les 5 secondes
    this.refreshSubscription = interval(5000).subscribe(() => {
      if (this.showMessages) {
        this.loadMessages();
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadMessages() {
    this.chatService.getMessages(this.userId).subscribe({
      next: (data) => this.messages = data,
      error: (err) => console.error('Erreur chargement messages', err)
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur chargement users', err)
    });
  }

  loadEvents() {
    this.calendarService.getEvents().subscribe({
      next: (events) => {
        this.calendarOptions.events = events.map(e => ({
          id: String(e.id),
          title: e.name,
          start: e.start,
          end: e.stop,
          extendedProps: {
            createdBy: e.user_id
          }
        }));
      },
      error: (err) => console.error('Erreur chargement événements', err)
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedDestinataireId) {
      this.chatService.sendMessage(this.userId, this.selectedDestinataireId, this.newMessage)
        .subscribe({
          next: () => {
            this.newMessage = '';
            this.selectedDestinataireId = null;
            this.messageSent = true;
            this.showNewMessage = false;
            this.loadMessages();
            setTimeout(() => {
              this.messageSent = false;
            }, 3000);
          },
          error: (err) => {
            console.error('Erreur envoi:', err);
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

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.addEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });

    calendarApi.unselect();
  }

  listenToCalendarIcons() {
    window.addEventListener('addEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent?.getApi().getEventById(id);
      const title = prompt('Titre de votre événement ?');
      if (title && event) {
        event.setProp('title', title);
      }
    });

    window.addEventListener('editEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent?.getApi().getEventById(id);
      const newTitle = prompt('Modifier le titre :', event?.title || '');
      if (newTitle && event) {
        event.setProp('title', newTitle);
      }
    });

    window.addEventListener('deleteEvent', (e: any) => {
      const id = e.detail;
      const event = this.calendarComponent?.getApi().getEventById(id);
      if (event && confirm('Supprimer cet événement ?')) {
        event.remove();
      }
    });
  }
}
