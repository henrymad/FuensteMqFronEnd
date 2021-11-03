import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tab-admin',
  templateUrl: './tab-admin.component.html',
  styleUrls: ['./tab-admin.component.scss'],
})
export class TabAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goProfile(){
    this.router.navigate(["admin"]);
  }

  goRegister(){
    this.router.navigate(["admin/register"]);
  }

}
