import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserAdmin = false;
  isUserLogged = false;
  constructor(private plantService: PlantService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
      
     }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.isUserAdmin = this.authService.isUserAdmin();
  }

}
