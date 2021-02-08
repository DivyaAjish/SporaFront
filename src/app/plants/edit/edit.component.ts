import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  isUpdated = false;
  msg = '';
  plantId = '';

  plantObj = {
    "plantName": "",
    "plantType": "",
    "plantDescription": "",
    "plantUses": "",
    "plantLocation": "",
    "plantUrl": ""
  }

  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService,
    private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    // Reactive Form
    this.activatedRoute.params.subscribe(data => {
      this.plantId = data.id;
    });

    this.plantService.getPlant(this.plantId).subscribe(data => {
      if(data){
        
        this.form = this.fb.group({
          plantId: [this.plantId],
          plantName: [data["plantName"], Validators.required],
          plantType: [data["plantType"], Validators.required],
          plantDesc: [data["plantDescription"], Validators.required],
          plantUses: [data["plantUses"], Validators.required],
          plantLocation: [data["plantLocation"], Validators.required],
          avatar: [data["plantUrl"]]
        })

        this.preview = data["plantUrl"];
      }
    });
    
  }

  ngOnInit(): void {
  }

  editPlant(formValue: NgForm){
    let editPlant = formValue.value;

    /*
    let plantObj = {
        "plantId": this.plantId,
        "plantName": editPlant["plantObj.plantName"],
        "plantType": editPlant["plantObj.plantType"],
        "plantDescription": editPlant["plantObj.plantDescription"],
        "plantUses": editPlant["plantObj.plantUses"],
        "plantLocation": editPlant["plantObj.plantLocation"],
        "plantUrl": "https://unsplash.com/photos/jxslQxviEJ0"
    }
    
    this.plantService.updatePlant(plantObj).subscribe(data => {
      if(data){
        this.isUpdated = true;
        this.msg = "Plant updated successfully";
        formValue.setValue(formValue.value);
      }
    });
   */
  }
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
    console.log(this.form.value);

    this.fileUploadService.editPlant(
      this.form.value.plantId,
      this.form.value.plantName,
      this.form.value.avatar,
      this.form.value.plantType,
      this.form.value.plantDesc,
      this.form.value.plantLocation,
      this.form.value.plantUses
      
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
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['plants'])
      }
    })
  }

}
