import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent implements OnInit {

  @Input() photo: string;
  @Input() nameUser: string;
  @Input() roleUser: string;
  @Input() nameStyle: string; 
  @Input() positionUser:string;
  @Input() profile:string;

  constructor() { }

  ngOnInit() {}

  isActiveRol():boolean{
    return this.roleUser == "Employee" || this.positionUser == "Employee" || this.profile == "active" ? true:false;
  }
}
