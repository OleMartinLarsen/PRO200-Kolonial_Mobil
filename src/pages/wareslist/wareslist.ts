import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Ware } from '../../models/ware';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

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
    private af: AngularFirestore, 
    private functions: GlobalFunctionsProvider) 
  {
    this.wareCollection = af.collection<Ware>("wares", ref =>
      {
        //Order by name (alphabetically)
        //Alternativly one could order by type ("kjøtt", "frukt" etc.) by using wareType 
        //or price by using warePrice
        return ref.orderBy("wareName", "asc");     
      });

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

  addToIngredients(addWare: any)
  {
    this.functions.addIngredientToRecipeIngredients(addWare);
    this.navCtrl.pop();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad WareslistPage');
  }
}