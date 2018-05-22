import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage 
{
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
    private functions :GlobalFunctionsProvider) 
  {
    this.userCollection = af.collection<User>('users');
  }

  registerUser()
  {
    if(this.user.password.match(this.user.repeatPassword)) //Make sure the user has typed the correct password twice
    { 
      //Register with email and password
      this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(this.user.email, this.user.password)
      .then((resp) =>
      {
        console.log(resp);
        this.registerUserInDB(); //Store userdata in db
        this.navCtrl.push('UserPage');
      })
      .catch((error) =>
      {
        this.functions.makeToast("Kunne ikke registrere bruker!");
        console.log(error);
      });
    }
    else
    {
      this.functions.makeToast("Passordene er ikke like!");
    }
  }

  registerUserInDB()
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

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RegisterPage');
  }
}