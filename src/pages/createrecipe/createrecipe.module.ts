import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaterecipePage } from './createrecipe';

@NgModule({
  declarations: [
    CreaterecipePage,
  ],
  imports: [
    IonicPageModule.forChild(CreaterecipePage),
  ],
})
export class CreaterecipePageModule {}
