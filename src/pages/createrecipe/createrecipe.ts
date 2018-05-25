import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-createrecipe',
  templateUrl: 'createrecipe.html',
})
export class CreaterecipePage 
{
  private instructions: string = "";
  private data: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    private functions: GlobalFunctionsProvider) 
  {
  }

  addIngredient() 
  {
    //TODO go to seach, allow user to add ingredients to list
    this.functions.makeToast("WIP...");
  }

  saveRecipe() 
  {
    //TODO save data
    this.storage.setItem("test", "tests");
    this.functions.makeToast("Lagrer...");
    this.get();
  }

  get() 
  {
    this.data = this.storage.getItem("test");
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreaterecipePage');
  }
}