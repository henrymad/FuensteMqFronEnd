import { Injectable } from '@angular/core';
import { Http, HttpOptions} from '@capacitor-community/http';
import { from, Observable } from 'rxjs';
import { ClockInDTO } from '../class/employee';
import { HOST, TOKEN_TYPE } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ClockInService {

  URL: string = HOST.concat("/mqservices/employee/clock-in");

  constructor() { }

  clockIn(body:ClockInDTO, token:string): Observable<any>{
    const options: HttpOptions = {
      url: this.URL,
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
