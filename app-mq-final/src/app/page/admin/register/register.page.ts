import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    userName: '',
    name: '',
    lastName: '',
    email:'',
    password:'',
    rol:'',
    position: 1
  }
  token: string;
  selected: string;

  request = {
    firstName: '',
    lastName:'',
    username:'',
    email:'',
    password:'',
    rolName:'',
    avatar:'',
    positionId:1,
    phone:''
  }
  successResponse :any;
  failedResponse :any;

  constructor(private router: Router,
    private registerService: RegisterService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.activate();
    this.unActive();
    this.setToken();
  }


  ruoterWelcome(): void{
    this.router.navigate(['/splash/welcome']);
  }

  ruoterLogin(){
    this.router.navigate(['/splash/login']);
  }

  register(user:any): void{
    console.log("test campo" + this.user.position);
    if(!this.user.name || !this.user.lastName || !this.user.userName 
      || !this.user.email || !this.user.password || !this.user.rol){
        this.emptyAlert()
    }else{
      this.request.firstName = this.user.name;
      this.request.lastName = this.user.lastName;
      this.request.username = this.user.userName;
      this.request.email = this.user.email;
      this.request.password = this.user.password;
      this.request.rolName = this.user.rol;
      this.request.positionId = this.user.position;
      this.registerService.create(this.request, this.token).subscribe(
        response => {
          if(response.status == 200){
            this.successAlert();
            this.router.navigate(['admin']);
            return;
          }
          else{
            this.failedAlert();
            return;
          }
        });
    }
  }

  recoverValue(event: CustomEvent){
    if(event.detail.value === "Manager"){
      this.user.position = 1;
    } else if(event.detail.value === "Cleaner"){
      this.user.position = 2;
    } else if(event.detail.value === "Afternoon day porter"){
      this.user.position = 3;
    } else if(event.detail.value === "Overnight supervisor"){
      this.user.position = 4;
    } else if(event.detail.value === "Assistent supervisor"){
      this.user.position = 5;
    }else if(event.detail.value === "Supervisor"){
      this.user.position = 6;
    }
  }

  recoverRolValue(event: CustomEvent){
    this.user.rol = event.detail.value;
  }

  activate():boolean {
    const SIZE = 0;
    return this.user.userName.length != SIZE && this.user.password.length != SIZE ? true : false; 
  }

  unActive():boolean {
    const SIZE = 0;
    return this.user.userName.length === SIZE || this.user.password.length === SIZE ? true: false;
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Register Success',
      buttons: ['OK']
    });

    await alert.present();
  }

  async failedAlert() {
    const alert = await this.alertController.create({
      mode:"ios",
      header: 'Register failed',
      message: 'Failed to register, try again',
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async emptyAlert() {
    const alert = await this.alertController.create({
      header: 'Register failed',
      mode:"ios",
      message: 'Some input is empty or is null, verify!',
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }


  async getToken(): Promise<string>{
    const token = await Storage.get({key: 'token'});
    return token.value
  }
  
  async setToken(){
    this.token = await this.getToken();
  }

}
