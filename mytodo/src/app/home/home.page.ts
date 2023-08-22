import { Component } from '@angular/core';
import { FireService, taskData } from '../fire.service';
import { AlertController, ModalController} from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

tasks:taskData[] = [] ;

  constructor(private auth:Auth, private router:Router, private modalController:ModalController, private alertController:AlertController, private fireService:FireService) {
    //if (this.auth.currentUser.uid)
    this.fireService.taskList(this.auth.currentUser.uid).subscribe(sonuc => {this.tasks = sonuc; console.log(this.tasks)})
    //else
    //this.router.navigateByUrl('/login');
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Görev Ekle',
      inputs: [
        {
          name:'task',
          placeholder: 'Görev Adı.',
          type: 'text'
        },
        {
          name:'taskdetail',
          placeholder: 'Görevinizi yazınız.',
          type: 'text'
        },
        {
          name:'lastDt',
          //placeholder: 'Görevinizi yazınız.',
          type: 'date'
        }
      ],
      buttons: [
        {
          text:'Vazgeç',
          role:'Cancel'
        },
        {
          text:'Ekle',
          handler: res => {
           let task ={
            task:res.task,
            taskdetail:res.taskdetail,
            lastDt:res.lastDt,
            date:Math.floor(Date.now()/1000),
           };
           this.fireService.newTask(task,this.auth.currentUser.uid);
          }
        }
    ],
    });

    await alert.present();
  }

  async showDetail(task:taskData)
  {
    //console.log(task.id);
    const modal = await this.modalController.create({
      component:ModalPage,
      componentProps:{id:task.id},
    });
    await modal.present();
  }

  async logout()
  {
    const res = await this.fireService.cikisYap();
    if (res)
    //console.log(res);
    this.router.navigateByUrl('/login');
    else
    this.fireService.presentAlert('Çıkış yapılamadı, lütfen tekrar deneyin');
  }

  userInfo()
  {
    console.log(this.auth.currentUser);

  }



}
