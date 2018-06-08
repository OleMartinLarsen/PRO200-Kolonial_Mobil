import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { ElementSchemaRegistry } from '@angular/compiler';

@Injectable()
export class GlobalFunctionsProvider 
{
  private recipeHistory: Array<any> = []; //List of recipes ordered
  private recipeFavorites: Array<any> = []; //List og recipes favorited
  private recipeIngredients: Array<any> = []; //List of ingredients when adding a recipe
  private recipeIngredientsQ: Array<any> = []; //Used for initializing the quantity of the added ingredient
  private recipeInstructions: Array<any> = []; //List of instructions when adding recipe
  private myRecipes: Array<any> = []; //List of recipes added by the user
  private dayPlans: Array<any> = []; //List that holds date and recipe
  private isPlanning: boolean = false; //Toggles "Legg til for x.y" button in RecipeDetails
  private planningFor: string = ""; //Date planning when adding recipe to day

  private daysArrayNo: Array<string> = []; //Weekdays in norwegian
  private oneWeakAheadArray: Array<string> = []; //List of dates one week ahead
  private nextDayFromOneWeakAheadArrayIndex: number = 0; //Index indicating which day to get in accordion
  private recipesCart: Array<any> = []; //List of recipes in cart

  constructor(private toastCtrl: ToastController) 
  {
    this.populateDaysArrayNo();
    this.populateOneWeakAheadArray();
  }

  //TODO? tests?

  //Unused, can be used for testing 
  // getOneWeakAheadArrayDay(i: number)
  // {
  //   console.log("oneWeakAheadArray: " + this.oneWeakAheadArray.toString());
  //   console.log("nextday test: " + this.getNextDay(30, 6));
  //   return this.oneWeakAheadArray[i];
  // }

  // --- Toasts ---

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  // --- Create recipes (dummy data) --- 

  addIngredientToRecipeIngredients(ingredient: any)
  {
    this.recipeIngredientsQ.push(1);
    this.recipeIngredients.push(ingredient);
  }

  getRecipeIngredients()
  {
    return this.recipeIngredients;
  }

  clearRecipeIngredients()
  {
    this.recipeIngredients = [];
    return true;
  }

  addInstructionsToRecipeInstructions(instructions: any)
  {
    this.recipeInstructions.push(instructions);
    console.log(instructions + " added to recipe");
  }

  getRecipeIngredientsQ()
  {
    return this.recipeIngredientsQ;
  }

  clearRecipeIngredientsQ()
  {
    this.recipeIngredientsQ = [];
    return true;
  }

  getRecipeInstructions()
  {
    return this.recipeInstructions;
  }

  clearRecipeInstructions()
  {
    this.recipeInstructions = [];
    return true;
  }

  // --- Create recipes (users recipes) --- 

  addMyRecipes(recipe: any)
  {
    this.myRecipes.push(recipe);
    console.log(recipe.recipeName + " added to myRecipes");
  }

  getMyRecipes()
  {
    return this.myRecipes;
  }

  // --- Planning for dinner --- 

  addRecipeToDayPlans(recipe: any)
  {
    this.dayPlans.push(recipe);
    console.log(recipe.recipe.recipeName + " added to dayPlans");
  }

  getDayPlans()
  {
    return this.dayPlans;
  }

  setIsPlanning(planning: boolean)
  {
    this.isPlanning = planning;
  }

  getIsPlanning()
  {
    return this.isPlanning;
  }

  setDayPlanningFor(day: string)
  {
    this.planningFor = day;
  }

  getDayPlanningFor()
  {
    return this.planningFor;
  }

  // --- Set up days and dates for planner --- 

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

  getDayInNorwegian(day: number)
  {
    return this.daysArrayNo[day - 1];
  }

  populateOneWeakAheadArray()
  {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    //Get the next week
    var next0 = this.getNextDay(day - 1, month); //Today
    var next1 = this.getNextDay(day++, month);
    var next2 = this.getNextDay(day++, month);
    var next3 = this.getNextDay(day++, month);
    var next4 = this.getNextDay(day++, month);
    var next5 = this.getNextDay(day++, month);
    var next6 = this.getNextDay(day, month);

    this.oneWeakAheadArray.push(next0);
    this.oneWeakAheadArray.push(next1);
    this.oneWeakAheadArray.push(next2);
    this.oneWeakAheadArray.push(next3);
    this.oneWeakAheadArray.push(next4);
    this.oneWeakAheadArray.push(next5);
    this.oneWeakAheadArray.push(next6);
  }

  getNextDayFromOneWeakAheadArray()
  {
    var res = this.oneWeakAheadArray[this.nextDayFromOneWeakAheadArrayIndex];
    this.nextDayFromOneWeakAheadArrayIndex++;
    return res;
  }

  getNextDay(day: number, month: number)
  {
    //NB: does not take into account leap years
    day++;

    if(month == 2)
    {
      if(day > 27)
      {
        day = 1;
        month++;
      }
    }
    else if(month == 4 || month == 6 || month == 9 || month == 11)
    {
      if(day > 29)
      {
        day = 1;
        month++;
      }
    }
    else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10)
    {
      if(day > 30)
      {
        day = 1;
        month++;
      }
    }
    else if(month == 12)
    {
      if(day > 30)
      {
        day = 1;
        month = 1;
      }
    }

    var findDayInFuture = day - (new Date().getDate());
    var findDayFor = findDayInFuture + (new Date().getDay());

    //Reset week once findDayFor passes 7 (sunday), only works for 1 week and a few days depending on current day
    if(findDayFor > 7)
    {
      findDayFor -= 7;
    }

    var dayNo = this.getDayInNorwegian(findDayFor);

    return dayNo + " " + day + "." + month;
  }

  getWeekNumber()
  {
    var month = new Date().getMonth();
    var day = new Date().getDate() + 2;

    // console.log("getweek date: " + day + "." + month);

    //Not accurate on a month to month basis, does not take leap year into account, may need tweeking from day to day
    return Math.round((month * 4.348214) + (day / 7));
  }

  getRecipeOfPlannedDayInDayPlans(displaydate: any)
  {
    var days = this.getDayPlans();
    var day = days.find((e) => e.date === displaydate);

    if(day)
    {
      var index = days.map((e) => { return e.date; }).indexOf(displaydate);
      // console.log("index for displaydate: " + index + " and " + displaydate); //Beware of spam
      return days[index];
    }
    return false;
  }

  // --- History/Favorites handeling --- 

  addRecipeToHistory(recipe: any)
  {
    this.recipeHistory.push(recipe);
  }

  addOrderToHistory(order: Array<any>)
  {
    var i = this.recipeHistory.length;
    this.recipeHistory.push.apply(this.recipeHistory, order);
    if(this.recipeHistory.length > i)
    {
      return true;
    }
    return false;
  }

  getRecipeHistory()
  {
    return this.recipeHistory;
  }

  addRecipeFavorite(recipe: any) 
  {
    var i = this.recipeFavorites.length;
    this.recipeFavorites.push(recipe);
    localStorage.setItem('recipeFavorites', JSON.stringify(this.recipeFavorites));
    console.log(JSON.parse(localStorage.getItem('recipeFavorites')));
    if(this.recipeFavorites.length > i)
    {
      return true;
    }
    return false;
  }

  removeRecipeFavorite(recipe: any)
  {
    var res = this.recipeFavorites.find((e) => e === recipe);
    if(res)
    {
      var i = this.recipeFavorites.indexOf(res);
      this.recipeFavorites.splice(i, 1);
      return true;
    }
    return false;
  }

  ionViewDidLoad()
  {
    
    this.recipeFavorites.push(JSON.parse(localStorage.getItem('recipeFavorites'))); //todo talk to Ole
  }

  getRecipeFavorites() 
  {
    return this.recipeFavorites;
  }

  // --- Cart handeling --- 
  
  getRecipesCart()
  {
    return this.recipesCart;
  }

  addRecipesToCart()
  {
    var days = this.getDayPlans();
    if(days.length > 0)
    {
      for(var i = 0; i < days.length; i++)
      {
        //NB: adding the same recipe 2 times will result in 2 orders.
        var res = this.recipesCart.find((e) => e === days[i].recipe);
        if(!res)
        {
          this.recipesCart.push(days[i].recipe);
        }
      }
      return true;
    }
    return false;
  }
}