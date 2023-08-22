import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { FireService, taskData } from '../fire.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit 
{
  @Input() id?:string;

  task:taskData;

  constructor(private auth:Auth, private alertController:AlertController, private toastController:ToastController, private fireService:FireService, private modalController:ModalController) { }

  ngOnInit() {
    this.fireService.getData(this.id, this.auth.currentUser.uid).subscribe(sonuc=> {this.task = sonuc}, hata=>{console.log(hata);});
    
  }

  close()
  {
    this.modalController.dismiss();
  }

  async update()
  {
    this.fireService.updateData(this.task, this.auth.currentUser.uid);
      const toast = await this.toastController.create({
        message: 'Güncellendi !',
        duration: 2000
      });
      toast.present();
      this.modalController.dismiss();
  }
    
  
  async del()
  {
    const alert = await this.alertController.create({
      header: 'Silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Sil',
          role: 'confirm',
          handler: () => {
            this.fireService.delData(this.task.id,this.auth.currentUser.uid);
            this.modalController.dismiss();
           
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
}
/*
this.fireService.delData(this.task.id);
    const toast = await this.toastController.create({
      message: 'Silindi!',
      duration: 2000
    });
    toast.present();
    this.modalController.dismiss();
*/
