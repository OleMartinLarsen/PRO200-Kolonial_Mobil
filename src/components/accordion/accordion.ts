import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

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
  private currentDay: string = "";
  private currentDate: string = "";
  private daysArrayNo: Array<string> = [];
  
  private date: string;
  private recipe: any = "";

  constructor(public renderer: Renderer,
    public navCtrl: NavController,
    private functions: GlobalFunctionsProvider) 
  {
    this.populateDaysArrayNo();
    this.currentDay = this.daysArrayNo[new Date().getDay() - 1]; //Get current day in norwegian
    this.currentDate = new Date().getDate() + "." + (new Date().getMonth() + 1);
    this.displaydate = this.currentDay + " " + this.currentDate;
  }

  addRecipes()
  {
    //TODO implement abort option for choosing recipe for day
    this.functions.setIsPlanning(true);
    //NB: the value(string) in setDayPlanningFor will be set on add-button in RecipeDetails!
    this.functions.setDayPlanningFor(this.displaydate); //TODO this.date for each day
    this.navCtrl.push("RecipesPage");

    var days = this.functions.getDayPlans();
    // TODO find a better way to update this.planned
    if(days.length > 0)
    {
      this.date = days[0].date;
      this.recipe = days[0].recipe;
      console.log("Day: " + this.date + ", Recipe: " + this.recipe.recipeName);
      this.planned = true;
    }
  }

  pushRecipeDetails()
  {
    var recipe = this.recipe;
    this.navCtrl.push('RecipedetailsPage', { recipe });
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