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
    private af :AngularFireAuth) 
  {
  }

  pushAuthUser()
  {
    const authObserver = this.af.auth.onAuthStateChanged((user) =>
    {
      //Send the user to UserPage if logged in (TODO sometimes pushes twice or thrice)
      if (user)
        this.navCtrl.push('UserPage');
      else
        this.navCtrl.push('AuthPage');
    });
  }
}