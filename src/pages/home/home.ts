import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AccordionComponent } from '../../components/accordion/accordion';

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

  addToCart()
  {
    if(this.functions.addRecipesToCart())
    {
      this.functions.makeToast("Lagt til i handlevogn.");
      // this.navCtrl.push("CartPage"); //TODO bug
    }
    else
    {
      this.functions.makeToast("Legg til minst én oppskrift!");
    }
  }

  pushUser() 
  {
    this.navCtrl.push("UserPage");
  }

}