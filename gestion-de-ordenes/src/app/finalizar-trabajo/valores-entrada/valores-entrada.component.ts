import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { TipoParametroService } from '../../servicios/tipoParametro.service';

import {default as swal} from 'sweetalert2';

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
      this.tipoParametroService.getTipoParametroDocumento(this.documentoSeleccionado._id).then((resultados)=>{
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

    let texto = '';
    for (let i = 0; i < resultadosIngresados.length; i++) {
      texto = texto + '<b>' + this.parametros[i].nombreAtributo + '</b>: ' + resultadosIngresados[i].valor + "</br>";
    }

    swal({
      title: 'Estas seguro de estos resultados?',
      // text: 'Valores ingresados: ` '+texto,
      html: '<p>Valores Ingresados: </p> </br>'+texto,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar datos!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Enviados!',
        'Sus resultados fueron registrados correctamente',
        'success'
      )
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelado',
          'Sus datos no fueron enviados',
          'error'
        )
      }
    });
  }
  cancelar(){
    this.model = {};
    this.volverStep.next();
  }

}
