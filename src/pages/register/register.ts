import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { UserModel } from '../../models/userModel';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage 
{
  public userCollection :AngularFirestoreCollection<UserModel>;
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
    private toastCtrl: ToastController) 
  {
    this.userCollection = af.collection<UserModel>('users');
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
        this.makeToast("Kunne ikke registrere bruker!");
        console.log(error);
      });
    }
    else
    {
      this.makeToast("Passordene er ikke like!");
    }
  }

  registerUserInDB()
  {
    //DO NOT store password, user.email and user.password is store (hashed) with afAuth
    this.userCollection.add(
      {
        userName: this.user.name,
        userSurname: this.user.surname,
        userPhone: this.user.phone,
        userEmail: this.user.email,
        userAdress: this.user.adress
      } as UserModel);
  }

  makeToast(toastMessage :string)
  {
    this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad RegisterPage');
  }
}