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
      if (this.af.auth.currentUser)
        this.navCtrl.push('UserPage');
      else
        this.navCtrl.push('AuthPage');
  }

  test()
  {
    this.navCtrl.push('TestPage');
  }
}