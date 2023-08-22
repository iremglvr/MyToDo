import { Component, OnInit } from '@angular/core';
import { User } from '../user.class';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userData : User = new User();

  constructor(private router:Router, private fireService:FireService) { }

  ngOnInit() {
  }

  async signin()
  {
    const res = await this.fireService.signinWithEmail(this.userData);
    if(res)
    this.router.navigateByUrl('/home');
    else
    this.fireService.presentAlert('Bu e-posta zaten kullanımda.');
  }

}
