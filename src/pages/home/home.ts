import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
<<<<<<< HEAD

  constructor(public navCtrl: NavController) 
=======
  constructor(public navCtrl: NavController,
    private afAuth :AngularFireAuth) 
>>>>>>> 0439d7f411f0e9ba1ba89642991580a17b1d41b2
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