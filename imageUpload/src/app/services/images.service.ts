import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { } from '../services/global';
import { global } from './global';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  progress:number;
  url = global.url;
  constructor(
    private http: HttpClient,

  ) { }

  
  subir(file:File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.url}/subir`, formData,{
      reportProgress: true,
      observe: "events"
    });
  }

  getImage(nombre:string) {
    
    return this.http.get(`${this.url}/image/${nombre}`);
  }

  validateExt(file:File):boolean {
    let valid = false;
    const name = file.name.toLowerCase();
    if (!name || name.match(/\.(jpg|jpeg|png|svg|gif)$/i)) {
      valid = true;
    }

    return valid;
  }



}
