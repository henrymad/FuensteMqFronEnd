import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL: string = HOST.concat("/security/oauth/token");

  constructor() { }

  postInformationBasic(userName:string, password:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
      headers:{
        'Authorization': 'Basic bXFfbWljcm9fc2VydmljZTptcV9lbF9wcm9fZGVfcHJvc18xNQ==',
        'Content-Type':  'application/x-www-form-urlencoded',
      },
      data:{
        'username': `${userName}`, 'password': `${password}`, 'grant_type':`${"password"}`
      }
    }
    return from(Http.post(options));
    }

  }



