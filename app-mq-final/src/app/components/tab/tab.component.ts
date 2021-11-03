import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @Input() rol:string;

  constructor() { }

  ngOnInit() {
    this.isActiveManager(this.rol);
    console.log(this.isActiveManager(this.rol));
  }

  isActiveManager(rolValue:string):boolean{
    return rolValue == "Admin" ? true:false;
  }

}
