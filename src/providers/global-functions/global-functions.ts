import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GlobalFunctionsProvider 
{
  recipeHistory: Array<any> = [];
  recipeFavorites: Array<any> = [];
  recipeIngredients: Array<any> = [];
  recipeInstructions: Array<any> = [];
  plannedWeeks: Array<any> = [];
  dayPlans: Array<any> = [];

  constructor(private toastCtrl: ToastController) 
  {
  }

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

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

  addWeekToPlannedWeeks(weeknumber: number)
  {
    this.plannedWeeks.push("Uke " + weeknumber);
  }

  getPlannedWeeks()
  {
    return this.plannedWeeks;
  }

  addRecipeToDayPlans(recipe: any)
  {
    this.dayPlans.push(recipe);
    console.log(recipe + " added to dayPlans");
  }

  getDayPlans()
  {
    return this.dayPlans;
  }

  removeItemFromList(item, array: Array<any>)
  {

    array.splice(array.indexOf(item), 1);
    return array;
  }
}