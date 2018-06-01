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
  private displayWeek: string = "";

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.displayWeek = "Uke " + this.functions.getWeekNumber();
    // console.log(this.functions);
  }

  //to be mocked
  // addWeek() 
  // {
  //   this.functions.addWeekToPlannedWeeks(this.getWeekNumber());
  // }

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