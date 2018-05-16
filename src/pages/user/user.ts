import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage 
{
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFireAuth,
    private toastCtrl: ToastController) 
  {
  }

  pushSettings()
  {
    // this.navCtrl.push('SettingsPage');
  }

  logoutUser()
  {
    this.af.auth.signOut();
    this.navCtrl.push('HomePage'); //TODO virker ikke
    this.makeToast("Logger ut...");
  }

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad UserPage');
  }
}