import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  public ordenSeleccionada = null;
  public trabajoSeleccionado = null;
  public documentoSeleccionado = null;

  public stepActivo: Number;

  @ViewChild('step1') step1: ElementRef;
  @ViewChild('step2') step2: ElementRef;
  @ViewChild('step3') step3: ElementRef;
  @ViewChild('step4') step4: ElementRef;


  constructor() { }

  ngOnInit() {
    this.stepActivo = 1;
  }

  OnTrabajoSeleccionado(trabajo){
    // console.log('trabajo: ');
    // console.log(trabajo);
    this.trabajoSeleccionado = trabajo;
    this.OnStep3();
    // this.abrirTerceroTab();
  }
  OnOrdenSeleccionada(orden){
    // console.log('orden: ');
    // console.log(orden);
    // console.log("ENTRE AL ON ORDEN SELECCIONADAAAAA");
    this.ordenSeleccionada = orden;
    this.OnStep2();
    // this.abrirSegundoTab();
  }
  OnDocumentoSeleccionado(documento){
    // console.log('documento: ');
    // console.log(documento);
    this.documentoSeleccionado = documento;
    this.OnStep4();
    // this.abrirCuartoTab();
  }

  OnStep1(){
    // Sacamos la clase al step activo
    this.desactivarStep(this.stepActivo);

    // Actualizamos el step activo
    this.stepActivo = 1;
    this.activarStep(this.stepActivo);
  }

  OnStep2(){
    // Sacamos la clase al step activo
    this.desactivarStep(this.stepActivo);

    // Actualizamos el step activo
    this.stepActivo = 2;
    this.activarStep(this.stepActivo);
  }

  OnStep3(){
    // Sacamos la clase al step activo
    this.desactivarStep(this.stepActivo);

    // Actualizamos el step activo
    this.stepActivo = 3;
    this.activarStep(this.stepActivo);
  }

  OnStep4(){
    // Sacamos la clase al step activo
    this.desactivarStep(this.stepActivo);

    // Actualizamos el step activo
    this.stepActivo = 4;
    this.activarStep(this.stepActivo);
  }

  OnVolverStep1(){
    this.OnStep1();
  }

  OnVolverStep2(){
    this.OnStep2();
  }

  OnVolverStep3(){
    this.OnStep3();
  }

  private desactivarStep(activo){
    if(activo == 1){
      this.step1.nativeElement.style.width = '0%';
    }else{
      if(activo == 2){
        this.step2.nativeElement.style.width = '0%';
      }
      else{
        if(activo == 3){
          this.step3.nativeElement.style.width = '0%';
        }
        else{
          this.step4.nativeElement.style.width = '0%';
        }
      }
    }
  }

  private activarStep(nuevoActivo){
    if(nuevoActivo == 1){
      this.step1.nativeElement.style.width = '100%';
    }else{
      if(nuevoActivo == 2){
        this.step2.nativeElement.style.width = '100%';
      }
      else{
        if(nuevoActivo == 3){
          this.step3.nativeElement.style.width = '100%';
        }
        else{
          this.step4.nativeElement.style.width = '100%';
        }
      }
    }
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
