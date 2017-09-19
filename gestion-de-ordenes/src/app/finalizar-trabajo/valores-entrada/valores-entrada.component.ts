import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { TipoParametroService } from '../../servicios/tipoParametro.service';

@Component({
  selector: 'app-valores-entrada',
  templateUrl: './valores-entrada.component.html',
  styleUrls: ['./valores-entrada.component.css']
})
export class ValoresEntradaComponent implements OnInit {

  @Input() documentoSeleccionado;
  @Input() trabajoSeleccionado;
  @Input() ordenSeleccionada;

  @Output() volverStep = new EventEmitter();

  private saveSuccess = false;
  private parametros = [];
  constructor(private tipoParametroService: TipoParametroService) { }
  public model = {};
  ngOnInit() {
  }

  ngOnChanges(){
    if(this.documentoSeleccionado != null){
      this.tipoParametroService.getTipoParametroDocumento(this.documentoSeleccionado.idDocumento).then((resultados)=>{
        console.log("Parametros actualizadosss");
        this.parametros = resultados;
        console.log(this.parametros);
      })
    }
  }

  enviar(){

    // Registramos los resultados ingresados por cada parametro
    let resultadosIngresados = [];
    this.parametros.forEach(function(elem,index){
      resultadosIngresados.push({
          'valor': elem.valor,
          'idTipoParametro': elem.idTipoParametro
      });
    });


    // Registramos los resultados obtendios
    let trabajo = this.trabajoSeleccionado.numTrabajo; // NumTrabajo esta bien? o hace falta tipoTrabajo tmb?

    // ACA LO GUARDAMOS

    this.saveSuccess = true;
  }
  cancelar(){
    this.model = {};
    this.volverStep.next();
  }

}
