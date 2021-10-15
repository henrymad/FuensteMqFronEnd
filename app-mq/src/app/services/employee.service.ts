import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL: string = HOST.concat("/mqservices/user-information/basic-information");
  URL_LIST_EMPLOYEE = HOST.concat("/mqservices/user/list-manager-employee");
  URL_LOCATION = HOST.concat("/mqservices/employee/location");

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

    listEmployee(token:string){
      const options: HttpOptions = {
        url: this.URL_LIST_EMPLOYEE,
        headers:{
          'Authorization':`${TOKEN_TYPE} ${token}`
        },
      }
      return from(Http.get(options));
    }

    getLocationEmployee(token:string, username:string){
      const options: HttpOptions = {
        url: this.URL_LOCATION,
        headers:{
          'Authorization':`${TOKEN_TYPE} ${token}`
        },
        params: {username: `${username}`} 
      }
      return from(Http.get(options));
    }
  }



