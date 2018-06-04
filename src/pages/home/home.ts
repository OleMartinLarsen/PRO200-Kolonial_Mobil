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
  private week: Array<any> = [];

  constructor(public navCtrl: NavController,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.displayWeek = "Uke " + this.functions.getWeekNumber();
    var i;
    for (i = 0; i < 7; i++) 
    { 
      this.week.push("");
    }
  }

  addIngredientsToCart()
  {
    this.functions.makeToast("Lagt til i handlekurv!");
    // this.navCtrl.push("CartPage");
    this.functions.addRecipeToCart();
  }

  pushUser() 
  {
    this.navCtrl.push("UserPage");
  }
}