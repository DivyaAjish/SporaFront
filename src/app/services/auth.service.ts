import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  isUserLogged(){
    let isLogged = localStorage.getItem('loggedIn');
    if(isLogged === '1'){
      return true;
    }
    else { return false;}
  }
  isUserAdmin(){
    let isAdmin = localStorage.getItem('loggedUserType');
    if(isAdmin === 'admin'){
      return true;
    }
    else { return false;}
  }

  loginUser(userCred){
    let url = environment.BASE_URL+environment.AUTH.LOGIN;
    return this.httpClient.post(url, userCred);
  }

  registerUser(userObj){
    let updateUserObj = Object.assign(userObj);
    if(updateUserObj['isAdmin'] === true){
      updateUserObj['isAdmin']= 'admin'
    }
    else {
      updateUserObj['isAdmin']= 'standard'
    }
    let url = environment.BASE_URL+environment.AUTH.CREATE;
    return this.httpClient.post(url, updateUserObj);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedUserType');
    localStorage.setItem('loggedIn', '0');
  }
  
}
