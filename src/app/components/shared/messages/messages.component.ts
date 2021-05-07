import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../../services/messenger.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message$: Observable<{ mesg: string, type: number }>;
  message: { mesg: string, type: number }
 
  constructor(private messageService: MessengerService) { }

  ngOnInit(): void {
    this.message$ = this.messageService.message$;
    this.message$.subscribe((val) => { this.message = val ; 
    
    });
   
  }

  clear() {
    this.messageService.clearMessage();
  }
}
