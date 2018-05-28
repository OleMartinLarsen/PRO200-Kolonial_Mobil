import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipedetailsPage } from './recipedetails';

@NgModule({
  declarations: [
    RecipedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipedetailsPage),
  ],
})
export class RecipedetailsPageModule {}
