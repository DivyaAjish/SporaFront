import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private httpClient: HttpClient) { }

  getPlants(){
    let url = environment.PLANTS_BASE_URL+environment.PLANTS.GET_ALL_PLANTS;
    return this.httpClient.get(url);
  }
  getPlant(id){
    let url = environment.PLANTS_BASE_URL+environment.PLANTS.GET_A_PLANT+id;
    return this.httpClient.get(url);
  }
  deletePlant(id){
    let url = environment.PLANTS_BASE_URL+environment.PLANTS.DELETE_PLANT+id;
    return this.httpClient.get(url);
  }

  createPlant(data){
    let url = environment.PLANTS_BASE_URL+environment.PLANTS.CREATE_PLANT;
    return this.httpClient.post(url, data );
  }
  updatePlant(data){
    let url = environment.PLANTS_BASE_URL+environment.PLANTS.UPDATE_PLANT;
    return this.httpClient.put(url, data );
  }

}
