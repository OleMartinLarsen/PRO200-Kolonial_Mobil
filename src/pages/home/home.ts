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
  public weekId = 3;
  private debugUkeNavn = 0;

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.weeksPlanned = this.functions.getPlannedWeeks();
  }

  addWeek() 
  {
    this.weekId ++;
    var pass = this.getWeekNumber() + this.debugUkeNavn;
    this.debugUkeNavn ++;
    this.functions.addWeekToPlannedWeeks(pass);
  }

  removeWeekFromList(week)
  {
    this.weeksPlanned = this.functions.removeItemFromList(week, this.weeksPlanned)
   // this.weeksPlanned.splice(this.weeksPlanned.indexOf(week), 1);
        //this.navCtrl.push("createdummydataPage")
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

  mockAddWeekToCart()
  {
    this.functions.makeToast("lagt uken til handlekurv!");
  }

  pushUser() 
  {
    this.navCtrl.push("UserPage");
  }
}