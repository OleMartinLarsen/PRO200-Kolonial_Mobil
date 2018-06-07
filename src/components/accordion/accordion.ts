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

  private planned: boolean = false;
  private displaydate: string;
  private recipe: any = "";

  constructor(public renderer: Renderer,
    public navCtrl: NavController,
    private functions: GlobalFunctionsProvider) 
  {
    this.displaydate = this.functions.getNextDayFromOneWeakAheadArray();
  }

  addRecipes()
  {
    if(!this.planned)
    {
      this.functions.setIsPlanning(true);
      //NB: the value(string) in setDayPlanningFor will be set on add-button in RecipeDetails!
      this.functions.setDayPlanningFor(this.displaydate);
      this.navCtrl.push("RecipesPage");
    }
    else
    {
      this.functions.makeToast("Vil du endre?"); 

      //TODO change recipe | rehaul recipe cards first
      //1. warning/confirm change
      //2. clear array for that day OR overwrite recipe
      var acceptedChangePlans = false;
      if(acceptedChangePlans)
      {
        this.functions.setIsPlanning(true);
        this.functions.setDayPlanningFor(this.displaydate);
        this.navCtrl.push("RecipesPage");
      }
    }
  }

  public checkPlannedStatus()
  {
    this.recipe = this.functions.getRecipeOfPlannedDayInDayPlans(this.displaydate).recipe;

    if(this.recipe)
    {
      this.planned = true;
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
      this.renderer.setElementStyle(this.content.nativeElement, "padding", "13px 16px");
    }
  }

  pushRecipeDetails()
  {
    this.checkPlannedStatus();
    var recipe = this.recipe;
    this.navCtrl.push('RecipedetailsPage', { recipe });
  }

  ngOnInit()
  {
    // console.log(this.content.nativeElement);
    this.renderer.setElementStyle(this.content.nativeElement, "webkitTransition", "max-height 400ms, padding 400ms");
  }

  toggleAccordion()
  {
    if(this.accordionExpanded) 
    {
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.content.nativeElement, "padding", "0px 16px");
    } 
    else 
    {
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
      this.renderer.setElementStyle(this.content.nativeElement, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }
  
  ngDoCheck() //TODO Memleaks, any better ways?
  {
    this.checkPlannedStatus();
  }
}