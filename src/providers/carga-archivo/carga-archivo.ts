import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  constructor(
    private toastCtrl: ToastController
  ) {
  }

  cargarImagenToFirebase(archivo: Archivo){
    let promesa = new Promise((resolve, reject) => {
      this.mostrarToast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombre: string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
        storeRef.child(`img/${nombre}`).putString(archivo.img, 'base64', { contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          // % de subida
        },
        (error) => {
          console.log(error)
          this.mostrarToast('Error: ' + error);
          reject();
        },
        () => {
          // Todo bien, se ha subido
          this.mostrarToast('Imágen cargada');
          resolve();
        }
      );

    });
    return promesa;
  }

  mostrarToast(mensaje: string){
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

interface Archivo{
  titulo: string;
  img: string;
  key?: string;
}
