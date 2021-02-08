import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploadService } from "../../services/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService,
    private authService: AuthService,
  ) {

    let isUserLogged = this.authService.isUserLogged();
      console.log(isUserLogged);
      if(!isUserLogged){
        this.router.navigateByUrl('login');
      }

    // Reactive Form
    this.form = this.fb.group({
      plantName: ['', Validators.required],
      plantType: ['', Validators.required],
      plantDesc: ['', Validators.required],
      plantUses: ['', Validators.required],
      plantLocation: ['', Validators.required],
      avatar: [null]
    })
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addPlant(
      this.form.value.plantName,
      this.form.value.avatar,
      this.form.value.plantType,
      this.form.value.plantDesc,
      this.form.value.plantUses,
      this.form.value.plantLocation
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Plant successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['plants'])
      }
    })
  }

}
