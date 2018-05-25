import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class GlobalFunctionsProvider 
{
  // recipehistory :any[] = [];
  recipehistory :Array<any> = [];

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
    this.recipehistory.push(recipe);
  }

  getRecipeHistory()
  {
    return this.recipehistory;
  }
}