import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) { }

  createMessage(data){
    let url = environment.MESSAGES_BASE_URL+environment.MESSAGES.CREATE_MESSAGE;
    return this.httpClient.post(url, data );
  }
  
}
