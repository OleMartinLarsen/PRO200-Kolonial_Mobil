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
  private debugUkeNavn = 0;

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    //nye konstruktøren
    this.displayWeek = "Uke " + this.functions.getWeekNumber();
    var i;
    for (i = 0; i < 7; i++) 
    { 
      this.week.push("");
    } 
  }

  addWeek() 
  {
    var pass = this.getWeekNumber() + this.debugUkeNavn;
    this.debugUkeNavn ++;
    //addweekto plannedweeks var i den forige konstruktøren
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