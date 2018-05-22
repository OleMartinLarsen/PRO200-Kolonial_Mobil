import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GlobalFunctionsProvider 
{
  constructor(private toastCtrl: ToastController) 
  {
  }

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}