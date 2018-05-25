import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})

export class MyApp 
{
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private af: AngularFirestore) 
    {
      const authObserver = af.app.auth().onAuthStateChanged((user) =>
      {
        //Send the user to loginpage if they're not logged in
        if (user)
          this.rootPage = 'TabsPage';
        else
          this.rootPage = 'AuthPage';
      });


    platform.ready().then(() => 
    {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}