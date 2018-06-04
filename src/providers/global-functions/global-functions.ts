import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GlobalFunctionsProvider 
{
  private recipeHistory: Array<any> = [];
  private recipeFavorites: Array<any> = [];
  private recipeIngredients: Array<any> = [];
  private recipeInstructions: Array<any> = [];
  private dayPlans: Array<any> = [];
  private isPlanning: boolean = false;
  private planningFor: string = "";

  private currentDay: string = "";
  private currentDate: string = "";
  private currentDayDate: string = "";
  private currentWeek :string = "";
  private daysArrayNo: Array<string> = [];
  private oneWeakAheadArray: Array<string> = [];
  private nextDayFromOneWeakAheadArrayIndex: number = 0;

  constructor(private toastCtrl: ToastController) 
  {
    this.populateDaysArrayNo();
    this.populateOneWeakAheadArray();
    this.currentDay = this.getDayInNorwegian(new Date().getDay());
    this.currentDate = new Date().getDate() + "." + (new Date().getMonth() + 1);
    this.currentDayDate = this.currentDay + " " + this.currentDate;
  }

  //Days

  //TODO tests?

  getRecipeOfPlannedDayInDayPlans(displaydate: any)
  {
    var days = this.getDayPlans();
    let day = days.find(o => o.date === displaydate);

    if(day)
    {
      var index = days.map((d) => { return d.date; }).indexOf(displaydate);
      console.log("index for displaydate: " + index + " and " + displaydate);
      return days[index];
    }
    return false;
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

    //TODO daynames?
    return day + "." + month;
  }

  populateOneWeakAheadArray()
  {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    //Get the next week
    var next0 = day + "." + month; //today
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

  //Unused, can be used for testing 
  getOneWeakAheadArrayDay(i: number)
  {
    console.log("oneWeakAheadArray: " + this.oneWeakAheadArray.toString());
    console.log("nextday test: " + this.getNextDay(30, 6));
    return this.oneWeakAheadArray[i];
  }

  getNextDayFromOneWeakAheadArray()
  {
    var res = this.oneWeakAheadArray[this.nextDayFromOneWeakAheadArrayIndex];
    this.nextDayFromOneWeakAheadArrayIndex++;
    return res;
  }

  getNextDayFromOneWeakAheadArrayIndex()
  {
    return this.nextDayFromOneWeakAheadArrayIndex;
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

  getDayInNorwegian(day: number)
  {
    return this.daysArrayNo[day - 1];
  }

  //Toast

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  //Getters and setters

  addRecipeToHistory(recipe: any)
  {
    this.recipeHistory.push(recipe);
  }

  getRecipeHistory()
  {
    return this.recipeHistory;
  }

  addRecipeFavorites(recipe: any)
  {
    this.recipeFavorites.push(recipe);
  }

  getRecipeFavorites()
  {
    return this.recipeFavorites;
  }

  addIngredientToRecipeIngredients(ingredient: any)
  {
    this.recipeIngredients.push(ingredient);
    console.log(ingredient.wareName + " added to recipe");
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

  getRecipeInstructions()
  {
    return this.recipeInstructions;
  }

  clearRecipeInstructions()
  {
    this.recipeInstructions = [];
    return true;
  }

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
  
  getCurrentDay()
  {
    return this.currentDay;
  }

  getCurrentDate()
  {
    return this.currentDate;
  }

  getCurrentDayDate()
  {
    return this.currentDayDate;
  }

  getWeekNumber()
  {
    var month = new Date().getMonth();
    var day = new Date().getDate() + 2;

    // console.log("getweek date: " + day + "." + month);

    //Not accurate on a month to month basis, does not take leap year into account
    return Math.round((month * 4.348214) + (day / 7));
  }

  removeItemFromList(item, array: Array<any>)
  {

    array.splice(array.indexOf(item), 1);
    return array;
  }
}