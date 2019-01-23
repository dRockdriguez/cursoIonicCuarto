import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {

  images: Archivo[] = [];
  lastKey: string = null;

  constructor(
    private toastCtrl: ToastController,
    public afDB: AngularFireDatabase
  ) {
    this.cargarLastKey().subscribe(() => {
      this.cargarImagenes();
    });
  }
  
  private cargarLastKey(){
    return this.afDB.list('/post',ref => ref.orderByKey().limitToLast(1)).valueChanges().map((res: any) => {
      this.lastKey = res[0].key;

      this.images.push(res[0]);
    });
  }

  // Baja las 3 últimas
  cargarImagenes(){
    return new Promise((resolve, reject) => {
      this.afDB.list('/post', ref => ref.limitToLast(3).orderByKey().endAt(this.lastKey)).valueChanges().subscribe((posts: any) => {
        posts.pop(); // Seborra la ultima
        if(posts.length === 0) {
          // No hay más registros
          resolve(false);
          return;
        }

        this.lastKey = posts[0].key; // Vienen en orden descendiente

        for (let i = posts.length -1; i>= 0 ; i --){
          let post = posts[i];
          this.images.push(post);
        }
        resolve(true);
      });
    });
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
          uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl => {
            this.mostrarToast('Imágen cargada');
            let url = downloadUrl;
            console.log('URL ' + url);
            this.crearPost(archivo.titulo, url, nombre);
            resolve();
          }));
        }
      );

    });
    return promesa;
  }

  private crearPost(titulo: string, url: string, nombreArchivo: string){
    let post: Archivo = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };
    this.afDB.object(`/post/${nombreArchivo}`).update(post);

    console.log('POSTCREADO ' + JSON.stringify(post));
    this.images.push(post);
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
