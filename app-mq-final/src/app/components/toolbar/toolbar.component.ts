import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input() title:string;
  @Input() role:string;
  @Input() subTitle:string;

  constructor(private router:Router) { }

  ngOnInit() {}
}
