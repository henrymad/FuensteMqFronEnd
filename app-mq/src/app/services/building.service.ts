import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  URL:string = HOST.concat("/mqservices/building/list-user");
  URL_LIST_BUILDING = HOST.concat("/mqservices/building/list-information");
  URL_EMPLOYEE_BUILDING = HOST.concat("/mqservices/building/information")

  constructor() { }

  getListBuildings(token:string, userName:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
      params: {username: `${userName}`} 
    }
    return from(Http.get(options));
  }

  listBuilding(token:string){
    const options: HttpOptions = {
      url: this.URL_LIST_BUILDING,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
    }
    return from(Http.get(options)).pipe(delay(1500));
  }

  getEmployeeBuilding(token:string, idBuilding:number){
    const options: HttpOptions = {
      url: this.URL_EMPLOYEE_BUILDING,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
      params: {buildingId: `${idBuilding}`} 
    }
    return from(Http.get(options)).pipe(delay(1500));
  }
}
