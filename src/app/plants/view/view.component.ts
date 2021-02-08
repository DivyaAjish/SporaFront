import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  plantId: any;
  plant: any;
  isUserAdmin = false;
  constructor(private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
      this.isUserAdmin = this.authService.isUserAdmin();
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.plantId = data.id;
    });
    
    this.plant = this.plantService.getPlant(this.plantId).subscribe(data => {
      console.log(data);
      this.plant = data;
    });

    
    
  }

}
