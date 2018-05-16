import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})

export class AuthPage 
{
  public user =
  {
    email :"",
    pass :""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFireAuth,
    private toastCtrl: ToastController) 
  {
  }

  loginUser()
  {
    //Sign in with email and password
    this.af.auth
      .signInWithEmailAndPassword(this.user.email, this.user.pass)
      .then((resp) =>
      {
        this.navCtrl.push('UserPage');
        console.log(resp);
      })
      .catch((error) =>
      {
        this.makeToast("Kunne ikke logge inn bruker!");
        console.log(error);
      });
  }

  pushRegister()
  {
    this.navCtrl.push('RegisterPage');
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
    console.log('ionViewDidLoad AuthPage');
  }
}