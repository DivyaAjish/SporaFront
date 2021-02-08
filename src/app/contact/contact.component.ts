import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  isCreated = false;
  msg = '';

  messageName = '';
  userEmail = '';
  messageDescription = '';

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
  }

  addMessage(formValue: NgForm){
    
    let msgObj = {
        "messageName": formValue.value.messageName,
        "userEmail": formValue.value.userEmail,
        "messageDescription": formValue.value.messageDescription,
    }

    this.messagesService.createMessage(msgObj).subscribe(data => {
      if(data){
        this.isCreated = true;
        this.msg = "Message added successfully";
        formValue.reset();
      }
    });
   
  }

}
