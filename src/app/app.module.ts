import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PipesModule } from '../pipes/pipes.module';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';

export const firebaseConfig = {
  apiKey: "AIzaSyDVgd3IqG880Vd6bmfovdEJHXqKgf_HT5c",
  authDomain: "gag-5d3f0.firebaseapp.com",
  databaseURL: "https://gag-5d3f0.firebaseio.com",
  projectId: "gag-5d3f0",
  storageBucket: "gag-5d3f0.appspot.com",
  messagingSenderId: "979955400889"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    CargaArchivoProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastController
  ]
})
export class AppModule { }
