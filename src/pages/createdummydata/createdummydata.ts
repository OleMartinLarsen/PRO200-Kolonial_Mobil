import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-createdummydata',
  templateUrl: 'createdummydata.html',
})
export class CreatedummydataPage 
{
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) 
  {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreatedummydataPage');
  }
}