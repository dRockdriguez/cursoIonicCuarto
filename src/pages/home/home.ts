import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
import { AngularFireDatabase } from '@angular/fire/database';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  blockInfiniteScroll: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private afDB: AngularFireDatabase,
    private cargaArchivo: CargaArchivoProvider
  ) {
   
  }

  mostrarModal(){
    let modal = this.modalCtrl.create(SubirPage).present();
  }

  doInfinite(infiniteScroll) {
      this.cargaArchivo.cargarImagenes().then(
        (mas: boolean) => {
          this.blockInfiniteScroll = mas;
          infiniteScroll.complete();
        }
      );
  }


}
