import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Ware } from '../../models/ware';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-createdummydata',
  templateUrl: 'createdummydata.html',
})
export class CreatedummydataPage 
{
  public wareCollection :AngularFirestoreCollection<Ware>;
  public ware =
  {
    name: "",
    price: 0,
    type: "",
    img: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.wareCollection = af.collection<Ware>('wares');
  }

  saveWare()
  {
    this.wareCollection.add(
      {
        wareName: this.ware.name,
        warePrice: this.ware.price,
        wareType: this.ware.type,
        // wareImg: this.ware.img
      } as Ware);

    this.functions.makeToast("Lagret!");
    this.ware.name = "";
    this.ware.price = 0;
    this.ware.type = "";
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CreatedummydataPage');
  }
}