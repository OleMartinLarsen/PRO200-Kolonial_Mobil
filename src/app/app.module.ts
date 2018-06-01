import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import env from './env';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { HomePage } from '../pages/home/home';
import { RecipesPage } from '../pages/recipes/recipes';
import { GlobalFunctionsProvider } from '../providers/global-functions/global-functions';
import { CartPage } from '../pages/cart/cart';
import { RecipehistoryPage } from '../pages/recipehistory/recipehistory';
import { AccordionComponent } from '../components/accordion/accordion';
import { RecipesPageModule } from '../pages/recipes/recipes.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    RecipehistoryPage,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    AngularFireModule.initializeApp(env),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RecipesPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipesPage,
    CartPage,
    RecipehistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalFunctionsProvider
  ]
})
export class AppModule {}