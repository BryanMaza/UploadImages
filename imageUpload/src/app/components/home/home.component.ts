import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { ImagesService } from '../../services/images.service';
import { global } from '../../services/global';
import { Imagen } from '../../models/imagen';
Imagen


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image = new Imagen();



   
  constructor(
    public imageService: ImagesService
  ) { }

  ngOnInit(): void {
 
    

  }

  onFileInput(event) {

    this.image.file = event.target.files.item(0);
    if (this.imageService.validateExt(this.image.file)) {
      this.image.cargando = true;
      this.image.name = this.image.file.name;
      this.image.url += '/image/' + this.image.name;

      this.imageService.subir(this.image.file).subscribe(res => {
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
      alert("Archivo no valido");
      return;
    }

  }




}
