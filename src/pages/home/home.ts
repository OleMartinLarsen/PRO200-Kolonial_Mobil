import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{

  weeksPlanned: Array<any> = [];

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.weeksPlanned = this.functions.getPlannedWeeks();
  }

  addWeek() 
  {
    this.functions.addWeekToPlannedWeeks(this.getWeekNumber());
  }

  getWeekNumber()
  {
    var month = new Date().getMonth();
    var day = new Date().getDate();

    //Not accurate on a month to month basis, does not take leap year into account
    return Math.round((month * 4.348214) + (day / 7));
  }

  mockAddToCart()
  {
    this.functions.makeToast("Lagt til i handlekurv!");
    // this.navCtrl.push("CartPage");
  }

  pushUser() 
  {
    this.navCtrl.push("UserPage");
  }
}