import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage 
{
  private loading: boolean = true;
  private collection: AngularFirestoreCollection<User>;
  private currentUserEmail: string;
  private users: Observable<any[]>;

  private user: //Variable for user data (WIP)
  {
    name: "",
    surname,
    img,
    phone,
    email,
    adress
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private functions: GlobalFunctionsProvider) 
  {
    this.currentUserEmail = af.app.auth().currentUser.email;
    
    //TODO! find a better way to load userdata
    //NB: this method fetches the userdata async from the DB with a query, so it might take some time.
    this.collection = af.collection<User>("users", (ref) => 
    {
      //Get correct user (limit 1 in case of duplicate emails in database 
      //(which shouldn't really happens as we use FirebaseAuth which will handle this automatically))
      return ref.where("userEmail", "==", this.currentUserEmail).limit(1); 
    });

    this.users = this.collection.snapshotChanges()
      .map(actions =>
      {
        return actions.map(action =>
        {
          let data = action.payload.doc.data() as User;
          let id = action.payload.doc.id;
          
          return {
            id, 
            ...data
          }
        });
      });
  }

  pushAddData()
  {
    this.navCtrl.push("CreatedummydataPage");
  }

  pushAddMyRecipe()
  {
    this.navCtrl.push("CreaterecipePage");
  }

  logoutUser()
  {
    this.functions.makeToast("Logger ut...");
    this.af.app.auth().signOut();
    this.navCtrl.popToRoot; //Sends user to root (AuthPage)
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad UserPage');
    this.loading = false;
  }
}