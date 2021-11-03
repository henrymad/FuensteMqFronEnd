import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-building',
  templateUrl: './card-building.component.html',
  styleUrls: ['./card-building.component.scss'],
})
export class CardBuildingComponent implements OnInit {


  @Input() nameBuilding: string;
  @Input() role: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() address: string
  @Input() city: string;

  constructor() { }

  ngOnInit() {}

}
