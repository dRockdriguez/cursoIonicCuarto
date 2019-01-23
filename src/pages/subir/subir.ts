import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = '';
  imagenB64: string = '';
  imagenB64ToFirebase: string;
  constructor(
    private viewCtrl: ViewController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public cap: CargaArchivoProvider
  ) {
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  abrirCamara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imagenB64 = 'data:image/jpeg;base64,' + imageData;
      this.imagenB64ToFirebase = imageData;
      console.log(this.imagenB64);
    }, (err) => {
      // Handle error
      console.log('ERROR: ' + err)
    });
  }

  abrirImagePicker() {
    let options: ImagePickerOptions = {
      quality: 70,
      outputType: 1, // Base64
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagenB64 = 'data:image/jpeg;base64,' + results[i];
        this.imagenB64ToFirebase =  results[i];
      }
    }, (err) => {
      console.log('ERROR: ' + err)
    });
  }

  crearPost(){
    let archivo = {
      img: this.imagenB64ToFirebase,
      titulo: this.titulo
    };
    this.cap.cargarImagenToFirebase(archivo).then(() => {
      this.cerrarModal();
    });
  }
}
