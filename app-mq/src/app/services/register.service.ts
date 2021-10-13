import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { HOST, TOKEN_TYPE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  URL_REGISTER = HOST.concat("/mqservices/user/createUser");

  constructor() { }

  create(body:any, token:string): Observable<any>{
    const options: HttpOptions = {
      url: this. URL_REGISTER,
      method: 'POST',
      headers:{
        'Authorization':`${TOKEN_TYPE} ${token}`,
        'Content-Type': 'application/json'
      },
      data: body,
    }
    return from(Http.request(options));
  }
}
