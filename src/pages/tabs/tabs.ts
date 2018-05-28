import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage 
{
  homePage: any;
  recipesPage: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
    {
    this.homePage = HomePage;
    this.recipesPage = RecipesPage;
  }
}