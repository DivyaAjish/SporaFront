import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  plantId: any;
  msg: any;

  constructor(private plantService: PlantService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.params.subscribe(data => {
      this.plantId = data.id;
    }));
    
    this.plantService.deletePlant(this.plantId).subscribe(data => {
      if(data){
        this.msg = "Plant deleted successfully";
      }
    });
  }

}
