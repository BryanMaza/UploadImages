import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { HttpEventType } from '@angular/common/http';
import { Imagen } from '../models/imagen';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {




  @Input() cargada: boolean;
  @Input() image: Imagen;



  @HostListener('dragover', ['$event']) onDragOver(evt) {

    evt.preventDefault();
    evt.stopPropagation();


  }

  @HostListener('drop', ['$event']) drop(evt) {

    evt.preventDefault();
    evt.stopPropagation();

    const file = evt.dataTransfer.files[0];


    if (file != null) {
      this.subir(file);
    }

  }

  constructor(
    private imageServ: ImagesService
  ) {

  }

  subir(file: File) {

    if (this.imageServ.validateExt(file)) {
      this.image.cargando = true;
      this.image.name = file.name;
      this.image.url += '/image/' + this.image.name;
      this.imageServ.subir(file).subscribe(res => {
        if (res.type === HttpEventType.Response) {
          console.log(res.body);

        }
        setTimeout(() => {
          if (res.type === HttpEventType.UploadProgress) {
            this.image.progress = Math.round(100 * res.loaded / res.total);

          }

        }, 320)

      });

      setTimeout(() => {
        this.image.cargada = true;

      }, 820);
    } else {
      alert('Error: archivo no permitido');
      return;
    }


  }

}
