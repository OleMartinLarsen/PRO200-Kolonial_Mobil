import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

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
    this.navCtrl.pop();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad UserPage');
  }
}