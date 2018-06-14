import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { contains } from '@firebase/util';

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

  errorBorderColor(element)
  {
    element.style.border = "solid 5px #ff0000";
  }

  registerUser()
  {

    let correct: number = 0;
    let all = document.getElementsByClassName('textInputField') as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < all.length; i++)
    {
      all[i].style.border = '0px';
      correct = 1;
    }

    if(this.user.name.length == 0)
    {
      this.errorBorderColor(all[0]);
      this.functions.makeToast("Fornavn tomt felt")
      correct = 1;
    }

    if(this.user.surname.length == 0)
    {
      this.errorBorderColor(all[1]);
      this.functions.makeToast("Etternavn tomt felt")
      correct = 1;
    }

    if(this.user.phone.toString().length != 8)
    {
      this.functions.makeToast("Mobil nummer trenger 8 siffre")
      correct = 1;
      this.errorBorderColor(all[2]);
    }

    if(this.user.adress.length == 0)
    {
      correct = 1;
      this.errorBorderColor(all[4]);
    }

    if(this.user.password.match(this.user.repeatPassword) && this.user.password.length != 0) //Make sure the user has typed the correct password twice
    { 
      //Register with email and password
      this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(this.user.email, this.user.password)
      .then((resp) =>
      {
        if (correct = 0)
        {
          console.log(resp);
          this.registerUserInDB(); //Store userdata in db
        
          this.navCtrl.push('TabsPage');
        }
      })
      .catch((error) =>
      {
        if(String(error).indexOf("The email address is badly formatted.") != -1)
        {
          this.errorBorderColor(all[3]);
          this.functions.makeToast("E-post er ikke riktig formatert!")
        } 
        else if(String(error).indexOf("The email address is already in use by another account") != -1)
        {
          this.errorBorderColor(all[3]);
          this.functions.makeToast("En bruker med denne e-posten eksisterer allerede!")
        }
        else if(String(error).indexOf("Password should be at least 6 characters") != -1)
        {
          this.errorBorderColor(all[3]);
          this.functions.makeToast("Passordet er for kort!")
        }
        
        console.log(error);
      });
    }
    else
    {
      let password = document.getElementsByClassName('passwordFields') as HTMLCollectionOf<HTMLElement>;
      
      for(var i = 0; i < password.length; i++){
        this.errorBorderColor(password[i]);
      }
      this.user.repeatPassword = "";
      this.user.password = "";
     
      this.functions.makeToast("Passordene er ikke like!");
    }
  }

  registerUserInDB()
  {
    //DO NOT store password! user.email and user.password is stored (hashed) with afAuth
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