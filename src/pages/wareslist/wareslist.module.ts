import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WareslistPage } from './wareslist';

@NgModule({
  declarations: [
    WareslistPage,
  ],
  imports: [
    IonicPageModule.forChild(WareslistPage),
  ],
})
export class WareslistPageModule {}
