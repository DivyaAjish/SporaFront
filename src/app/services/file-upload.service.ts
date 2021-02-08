import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  baseURL = "http://localhost:3000/plants/upload";
  updateUrl = "http://localhost:3000/plants/update";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers() {
    return this.http.get(this.baseURL)
  }

  // Create User
  addPlant(name: string, profileImage: File, plantType: string, plantDesc: string, plantLocation, plantuses): Observable<any> {
    var formData: any = new FormData();
    formData.append("plantName", name);
    formData.append("plantType", plantType);
    formData.append("plantDesc", plantDesc);
    formData.append("plantUses", plantDesc);
    formData.append("plantLocation", plantDesc);
    formData.append("plantUrl", profileImage);

    return this.http.post(`${this.baseURL}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  editPlant(plantId, name: string, profileImage: File, plantType: string, plantDesc: string, plantLocation, plantuses): Observable<any> {
    var formData: any = new FormData();
    formData.append("plantId", plantId);
    formData.append("plantName", name);
    formData.append("plantType", plantType);
    formData.append("plantDesc", plantDesc);
    formData.append("plantUses", plantuses);
    formData.append("plantLocation", plantLocation);
    formData.append("plantUrl", profileImage);

    console.log(formData);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    return this.http.post(`${this.updateUrl}`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
