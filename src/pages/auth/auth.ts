import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})

export class AuthPage 
{
  public user =
  {
    email: "",
    pass: ""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
  }

  loginUser()
  {
    //Sign in with email and password
    this.af.app.auth()
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
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad AuthPage');
  }
}