import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  plants: any;
  constructor(private plantService:PlantService, 
    private authService: AuthService,
    private router: Router) { 
      let isUserLogged = this.authService.isUserLogged();
      console.log(isUserLogged);
      if(!isUserLogged){
        this.router.navigateByUrl('login');
      }
    }

  ngOnInit(): void {
    
    this.plantService.getPlants().subscribe(data => {
      this.plants = data;
      console.log(this.plants);
    });
  }

}
