import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  public ordenSeleccionada = null;
  public trabajoSeleccionado = null;
  public documentoSeleccionado = null;
  constructor() { }

  ngOnInit() {
  }

  OnTrabajoSeleccionado(trabajo){
    console.log('trabajo: ');
    console.log(trabajo);
    this.trabajoSeleccionado = trabajo;
    // this.abrirTerceroTab();
  }
  OnOrdenSeleccionada(orden){
    console.log('orden: ');
    console.log(orden);
    console.log("ENTRE AL ON ORDEN SELECCIONADAAAAA");
    this.ordenSeleccionada = orden;
    // this.abrirSegundoTab();
  }
  OnDocumentoSeleccionado(documento){
    console.log('documento: ');
    console.log(documento);
    this.documentoSeleccionado = documento;
    // this.abrirCuartoTab();
  }


  resetStep1() {
    this.ordenSeleccionada = null;
    this.trabajoSeleccionado = null;
    this.documentoSeleccionado = null;
  }
  resetStep2() {
    this.ordenSeleccionada = null;
    this.trabajoSeleccionado = null;
    this.documentoSeleccionado = null;
  }
  resetStep3() {
    this.ordenSeleccionada = null;
    this.trabajoSeleccionado = null;
    this.documentoSeleccionado = null;
  }
}
