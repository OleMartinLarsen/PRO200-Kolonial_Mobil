import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
<<<<<<< HEAD

import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
=======
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
>>>>>>> 0439d7f411f0e9ba1ba89642991580a17b1d41b2

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage 
{
  private email :string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFireAuth,
    private functions :GlobalFunctionsProvider) 
  {
    //Globalize
    var user = af.auth.currentUser;
    if (user != null) 
    {
      this.email = user.email;
    }
  }

  pushSettings()
  {
    // this.navCtrl.push('SettingsPage');
  }

  logoutUser()
  {
    this.functions.makeToast("Logger ut...");
    this.af.auth.signOut();
<<<<<<< HEAD
    this.navCtrl.setRoot(TabsPage); //Sends user to HomePage (main/frontpage)
  }

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
=======
    this.navCtrl.pop();
>>>>>>> 0439d7f411f0e9ba1ba89642991580a17b1d41b2
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad UserPage');
  }
}