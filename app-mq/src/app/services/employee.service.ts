import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL: string = HOST.concat("/mqservices/user-information/basic-information");

  constructor() { }

  getInformationUser(user:string, token:string, rol:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`
      },
      params: {username: `${user}`, rolname: `${rol}`} 
    }
    return from(Http.get(options));
    }
  }


