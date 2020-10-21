export class Imagen{
  name: string;
  file: File;
  url: string;
  progress: number;
  cargando: boolean;
  cargada: boolean;
  constructor() {
    
    this.url = 'http://localhost:3999/api';
    this.cargando = false;
    this.progress = 0;
    this.cargada = false;
  }
}