import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-valores-entrada',
  templateUrl: './valores-entrada.component.html',
  styleUrls: ['./valores-entrada.component.css']
})
export class ValoresEntradaComponent implements OnInit {

  @Input() documentoSeleccionado;
  @Input() trabajoSeleccionado;
  @Input() ordenSeleccionada;
  private saveSuccess = false;
  constructor() { }
  public model = {};
  ngOnInit() {
  }


  enviar(){
    this.saveSuccess = true;
  }
  cancelar(){
    this.model = {};
  }

}
