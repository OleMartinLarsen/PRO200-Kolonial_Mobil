import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { AuthPage } from '../auth/auth';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage 
{
  private loading: boolean = true;
  private collection :AngularFirestoreCollection<User>;
  private currentUserEmail: string;
  private users :Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFirestore,
    private functions :GlobalFunctionsProvider) 
  {
    this.currentUserEmail = af.app.auth().currentUser.email;
    
    //NB: this method fetches the userdata async from the DB with a query, so it might take some time.
    //TODO find a btter way to load userdata
    this.collection = af.collection<User>('users', (ref) => 
    {
      //Get correct user (limit 1 in case of duplicate emails in database 
      //(which shouldn't really happens as we use FirebaseAuth which will handle this automatically))
      return ref.where('userEmail', '==', this.currentUserEmail).limit(1); 
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

  pushAuthUser()
  {
      if (this.af.app.auth().currentUser)
        this.navCtrl.push('UserPage');
      else
        this.navCtrl.push('AuthPage');
  }

  pushSettings()
  {
    // this.navCtrl.push('SettingsPage');
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