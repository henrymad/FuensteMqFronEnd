import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-staff',
  templateUrl: './card-staff.component.html',
  styleUrls: ['./card-staff.component.scss'],
})
export class CardStaffComponent implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() role: string;
  @Input() posistion: string;
  @Input() photo: string;

  constructor() { }

  ngOnInit() {}

}
