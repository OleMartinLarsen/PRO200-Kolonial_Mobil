import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  constructor(public navCtrl: NavController,
    private afAuth :AngularFireAuth) 
  {
  }

  pushAuthUser()
  {
      if (this.afAuth.auth.currentUser)
        this.navCtrl.push('UserPage');
      else
        this.navCtrl.push('AuthPage');
  }
}