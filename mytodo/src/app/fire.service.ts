import { Injectable } from '@angular/core';
import { Firestore, doc, collection, addDoc, deleteDoc, docData, collectionData, query, orderBy, updateDoc, Timestamp } from '@angular/fire/firestore';
import { Auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from './user.class';
import { AlertController } from '@ionic/angular';



export interface taskData{
  id?:string;
  task?:string;
  taskdetail?:string;
  date?:number;
  fav?:boolean;
  lastDt?:any;
}


@Injectable({
  providedIn: 'root'
})
export class FireService 
{

  constructor(private alertController:AlertController, private auth:Auth, private firestore:Firestore) { }

  taskList(userId)
  {
    const tasksonuc = collection(this.firestore,`users/${userId}/tasks`);
    const q = query(tasksonuc, orderBy('date', 'asc'));
    return collectionData(q, {idField: 'id'});
  }

newTask(task:taskData, userId)
{
  const tasksonuc = collection(this.firestore,`users/${userId}/tasks`);
  return addDoc(tasksonuc,task);
}

getData(id, userId):any
{
  const tasksonuc = doc(this.firestore, `users/${userId}/tasks/${id}`);
  return docData(tasksonuc, {idField: 'id'});
}

delData(id, userId):any
{
  const tasksonuc = doc(this.firestore, `users/${userId}/tasks/${id}`);
  return deleteDoc(tasksonuc);
}

updateData(task:taskData, userId)
{
  const tasksonuc = doc(this.firestore, `users/${userId}/tasks/${task.id}`);
  return updateDoc(tasksonuc, {task:task.task, date:task.date, taskdetail:task.taskdetail, lastDt:task.lastDt});
}

async signinWithEmail(user:User)
{
  try {
    const regUser = await createUserWithEmailAndPassword(this.auth, user.email, user.password)
    return regUser;
  } catch (error) {
    return null;
  }
}

async logininWithEmail(user:User)
{
  try {
    const logUser = await signInWithEmailAndPassword(this.auth, user.email, user.password)
    return logUser;
  } catch (error) {
    return null;
  }
}

async cikisYap()
  {
    try {
      await signOut(this.auth);
      return true;
    } catch (error) {
      return error;
    }
  }

  async presentAlert(mesaj) {
    const alert = await this.alertController.create({
      header: 'Hata',
      message: mesaj,
      buttons: ['Tamam'],
    });
    await alert.present();
  }

}

