import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import { TipoParametroService } from '../../servicios/tipoParametro.service';
import { ResultadosService } from '../../servicios/resultados.service';
import { TrabajosService } from '../../servicios/trabajos.service';
import { FinalizarTrabajoService } from '../../movimientos/finalizarTrabajo.service';

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
  constructor(
    private tipoParametroService: TipoParametroService,
    private resultadosService: ResultadosService,
    private trabajosService: TrabajosService,
    private finalizarTrabajoService: FinalizarTrabajoService,

  ) { }
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
      console.log('elem asdasdasdasd');
      console.log(elem);
      resultadosIngresados.push({
          'valor': parseInt(elem.valor),
          'trabajo': trabajo,
          'tipoParametro': elem
      });
    });

    console.log('ACA ESTAN LOS PARAMETROS');
    console.log(resultadosIngresados);

    // Registramos los resultados obtendios
    let trabajo = this.trabajoSeleccionado._id; // NumTrabajo esta bien? o hace falta tipoTrabajo tmb?

    let yo = this;



    let fechaRealizacion = new Date();

    this.finalizarTrabajoService.finalizar(trabajo, fechaRealizacion, resultadosIngresados)
    .then(res => {
      console.log('### Finalice el trabajo');
      console.log(res);
    })
    .catch(err => {
      console.log('Error en valores-entrada');
      console.log(err);
    });


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
