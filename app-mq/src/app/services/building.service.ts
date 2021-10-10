import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  URL:string = HOST.concat("/mqservices/building/list");

  constructor() { }

  getListBuildings(token:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
    }
    return from(Http.get(options));
  }
}
