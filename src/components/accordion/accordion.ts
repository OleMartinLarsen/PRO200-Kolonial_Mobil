import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html'
})
export class AccordionComponent implements OnInit 
{
  accordionExpanded = false;
  @ViewChild("cc") content: any;
  icon: string = "arrow-forward";

  private displaydate: string;
  private planned: boolean = false;
  private currentDay :string = "";
  private daysArrayNo :Array<string> = [];

  constructor(public renderer: Renderer,
    public navCtrl: NavController) 
  {
    this.getDinnerPlans();

    this.populateDaysArrayNo();
    this.currentDay = this.daysArrayNo[new Date().getDay() - 1]; //Get current day in norwegian

    this.displaydate = this.currentDay + " " + new Date().getDate() + "." + (new Date().getMonth() + 1);
  }

  getDinnerPlans()
  {
    // TODO get stored dinnerplans from storage to display
  }

  addRecipes()
  {
    // TODO go to special list with recipe, then days?
    this.navCtrl.push("RecipesPage");
    //get recipe/dinner
    //save plans (dinner + date)
    this.planned = true;
  }

  ngOnInit(){
    // console.log(this.content.nativeElement);
    this.renderer.setElementStyle(this.content.nativeElement, "webkitTransition", "max-height 400ms, padding 400ms");
  }

  toggleAccordion(){
      if(this.accordionExpanded) {
        this.renderer.setElementStyle(this.content.nativeElement, "max-height", "0px");
        this.renderer.setElementStyle(this.content.nativeElement, "padding", "0px 16px");
      } else {
        this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
        this.renderer.setElementStyle(this.content.nativeElement, "padding", "13px 16px");
      }

      this.accordionExpanded = !this.accordionExpanded;
      this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }

  populateDaysArrayNo()
  {
    this.daysArrayNo.push("Mandag");
    this.daysArrayNo.push("Tirsdag");
    this.daysArrayNo.push("Onsdag");
    this.daysArrayNo.push("Torsdag");
    this.daysArrayNo.push("Fredag");
    this.daysArrayNo.push("Lørdag");
    this.daysArrayNo.push("Søndag");
  }
}