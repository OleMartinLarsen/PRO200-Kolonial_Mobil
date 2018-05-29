import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Ware } from '../../models/ware';

@IonicPage()
@Component({
  selector: 'page-wareslist',
  templateUrl: 'wareslist.html',
})
export class WareslistPage 
{
  public wareCollection: AngularFirestoreCollection<Ware>;
  private wares: Observable<Ware[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFirestore) 
  {
    this.wareCollection = af.collection<Ware>('wares');

    this.wares = this.wareCollection.snapshotChanges()
      .map(actions =>
      {
        return actions.map(action =>
        {
          let data = action.payload.doc.data() as Ware;
          let id = action.payload.doc.id;
          
          return {
            id, 
            ...data
          }
        });
      });
  }

  addToIngredients(ware: any)
  {
    //add id to list, go back to add data page wiht udated ingredientslist
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WareslistPage');
  }
}