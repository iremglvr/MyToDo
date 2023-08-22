import { Component, OnInit } from '@angular/core';
import { User } from '../user.class';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData : User = new User();

  constructor(private router:Router, private fireService:FireService) { 

  }

  ngOnInit() {

  }

  async login()
  {
    const res = await this.fireService.logininWithEmail(this.userData);
    if(res)
    this.router.navigateByUrl('/home');
    else
    this.fireService.presentAlert('Hatalı kullanıcı adı ya da şifre');
  }
  
}
