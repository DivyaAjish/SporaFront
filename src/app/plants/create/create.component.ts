import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PlantService } from 'src/app/services/plant.service';
import { HttpClient } from '@angular/common/http';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedFile: ImageSnippet;

  msg = '';
  isCreated = false;

  plantType: string = '';
  plantDescription: string = '';
  plantName: string = '';
  plantUses: string = '';
  plantLocation: string = '';

  name = 'Angular';
  img: File;
  enter_name = '';
  your_name = '';
  your_new_name = '';

  fileInputLabel: string;
  url: string;
  upload_url = 'http://localhost:3000/plants/upload';

  constructor(private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private httpClient:HttpClient) {
      let isUserLogged = this.authService.isUserLogged();
      console.log(isUserLogged);
      if(!isUserLogged){
        this.router.navigateByUrl('login');
      }
    }

  ngOnInit(): void {
  }

  addPlant(formValue: NgForm){
    console.log(formValue.value);

    let plantObj = {
        "plantName": formValue.value.plantName,
        "plantType": formValue.value.plantType,
        "plantDescription": formValue.value.plantDescription,
        "plantUses": formValue.value.plantUses,
        "plantLocation": formValue.value.plantLocation,
        "plantUrl": this.img.name,
        "plantImage": this.img
    }

    /*
    let formData = new FormData();
    formData.append('plantName', formValue.value.plantName);
    formData.append('plantType', formValue.value.plantName);
    formData.append('plantDescription', formValue.value.plantName);
    formData.append('plantUses', formValue.value.plantName);
    formData.append('plantLocation', formValue.value.plantName);
    formData.append('plantUrl', formValue.value.plantName);
    formData.append('plantImage', formValue.value.uploadedImage);

    console.log(formData);
    */
    /*
    console.log(formValue.value.new_name);
    const formdata = new FormData();
    formdata.append('plantName', formValue.value.plantName);
    formdata.append('plantType', formValue.value.plantType);
    formdata.append('plantDescription', formValue.value.plantDescription);
    formdata.append('plantUses', formValue.value.plantUses);
    formdata.append('plantLocation', formValue.value.plantLocation);
    formdata.append('plantImage', this.img);
      */
    //formdata.append('img', this.img,this.img.name);

    this.plantService.createPlant(plantObj).subscribe(data => {
      if(data){
        this.isCreated = true;
        this.msg = "Plant added successfully";
        formValue.reset();
      }
    });
   
  }

  onFileSelect(event) {
    this.img = event.target.files[0];
    //const file = event.target.files[0];
    this.fileInputLabel = this.img.name;
    //this.fileUploadForm.get('uploadedImage').setValue(this.img);
  }

  onSubmit() {
    
  }
  
}
