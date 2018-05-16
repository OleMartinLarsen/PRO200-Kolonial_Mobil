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
  users :any[] = [];
  private userCollection :AngularFirestoreCollection<UserModel>;
  private userName :string;
  private userSurname :string;
  private userPhone :number;
  private userEmail :string;

  public user =
  {
    name :"",
    surname :"",
    phone :"",
    email :"",
    password :""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private af :AngularFireAuth,
    private toastCtrl: ToastController) 
  {
    this.userCollection = navParams.get('usersCollection');
  }

  registerUser()
  {
    //If pass1 == pass2..

    //Register with email and password
    this.af.auth
    .createUserAndRetrieveDataWithEmailAndPassword(this.user.email, this.user.password)
    .then((resp) =>
    {
      // this.registerUserDB(); //Store userdata in db
      console.log(resp);
    })
    .catch((error) =>
    {
      this.makeToast("Kunne ikke registrere bruker!");
      console.log(error);
    })
  }

  registerUserDB()
  {
    this.userCollection.add(
      {
        userName: this.userName,
        userSurname: this.userSurname,
        userPhone: this.userPhone,
        userEmail: this.userEmail
      } as UserModel);
      
      this.navCtrl.push('UserPage');
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