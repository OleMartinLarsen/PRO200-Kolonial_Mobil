import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

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
    private afAuth: AngularFireAuth,
    private functions : GlobalFunctionsProvider) 
  {
  }

  loginUser()
  {
    //Sign in with email and password
    this.afAuth.auth
      .signInWithEmailAndPassword(this.user.email, this.user.pass)
      .then((resp) =>
      {
        this.navCtrl.push('TabsPage');
        console.log(resp);
      })
      .catch((error) =>
      {
        this.functions.makeToast("Kunne ikke logge inn bruker!");
        console.log(error);
      });
  }

  pushRegister()
  {
    this.navCtrl.push('RegisterPage')
    .then(() => {
      this.navCtrl.remove(1); //Removes this page from backstack
    });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AuthPage');
  }
}