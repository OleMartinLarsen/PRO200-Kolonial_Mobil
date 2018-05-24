import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  constructor(public navCtrl: NavController,
    private afAuth :AngularFireAuth, private api: ApiProvider) 
  {
  }

  pushAuthUser() {
      if (this.afAuth.auth.currentUser)
        this.navCtrl.push('UserPage');
      else
        this.navCtrl.push('AuthPage');
  }

  getItem() {
    this.api.getItem();
  }
}