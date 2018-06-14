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
  private count: number = 0;

  constructor(public renderer: Renderer,
    public navCtrl: NavController,
    private functions: GlobalFunctionsProvider) 
  {
    this.setDisplayDate();
    while(this.displaydate == null)
    { 
      //Reset and retry
      this.functions.resetNextDayFromOneWeakAheadArrayIndex();
      this.setDisplayDate();
    }
  }
  
  setDisplayDate()
  {
    this.displaydate = this.functions.getNextDayFromOneWeakAheadArray();
  }

  //legger til recipes per kort, endrings knappen bruker også denne
  addRecipes()
  {
    if(!this.planned)
    {
      this.functions.setIsPlanning(true);
      //NB: the value(string) in setDayPlanningFor will be set on add-button in RecipeDetails!
      this.functions.setDayPlanningFor(this.displaydate);
      this.renderer.setElementStyle(this.content.nativeElement, "height", "150px")
      this.navCtrl.push("RecipesPage");
    }
    else
    {
        this.removeDayPlans();
        this.functions.setIsPlanning(true);
        this.functions.setDayPlanningFor(this.displaydate);
        this.renderer.setElementStyle(this.content.nativeElement, "height", "150px")
        this.navCtrl.push("RecipesPage");
    }
  }

  //ser på om det er en planlagt middag, og hvis det er det vil den endre stylen til å vise bilde + knapper
  public checkPlannedStatus()
  {
    this.recipe = this.functions.getRecipeOfPlannedDayInDayPlans(this.displaydate).recipe;

    if(this.recipe)
    {
      this.planned = true;
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
      this.renderer.setElementStyle(this.content.nativeElement, "padding", "0px 0px");
    }
  }

  pushRecipeDetails()
  {
    this.checkPlannedStatus();
    var recipe = this.recipe;
    this.navCtrl.push('RecipedetailsPage', { recipe });
  }

  removeDayPlans()
  {
    this.planned = false;
    this.renderer.setElementStyle(this.content.nativeElement, "height", "0px")
    this.functions.removeRecipeToDayPlans(this.recipe);
  }

  ngOnInit()
  {
    // console.log(this.content.nativeElement);
    this.renderer.setElementStyle(this.content.nativeElement, "webkitTransition", "max-height 150px");
  }

  toggleAccordion()
  {
    if(this.accordionExpanded) 
    {
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "0px");
      //this.renderer.setElementStyle(this.content.nativeElement, "padding", "0px 16px");
    } 
    else 
    {
      this.renderer.setElementStyle(this.content.nativeElement, "max-height", "300px");
      //this.renderer.setElementStyle(this.content.nativeElement, "padding", "13px 16px");
    }

    this.accordionExpanded = !this.accordionExpanded;
    this.icon = this.icon == "arrow-forward" ? "arrow-down" : "arrow-forward";
  }
  
  ngDoCheck() //TODO! Memleaks, any better ways?
  {
    this.count ++;
    if (this.count == 5)
    {
      this.checkPlannedStatus();
      this.count = 0
    }  
    }
}