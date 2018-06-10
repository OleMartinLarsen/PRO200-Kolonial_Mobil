import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public userCollection :AngularFirestoreCollection<User>;
  public user =
  {
    name: "",
    surname: "",
    phone: 0,
    email: "",
    adress: "",
    password: "",
    repeatPassword: ""
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private afAuth: AngularFireAuth,
    private functions :GlobalFunctionsProvider) {
    this.userCollection = af.collection<User>('users');
  }

  updateUserInDB()
  {
    //DO NOT store password, user.email and user.password is stored (hashed) with afAuth
    this.userCollection.add(
      {
        userName: this.user.name,
        userSurname: this.user.surname,
        userPhone: this.user.phone,
        userEmail: this.user.email,
        userAdress: this.user.adress
      } as User);
  }
}
