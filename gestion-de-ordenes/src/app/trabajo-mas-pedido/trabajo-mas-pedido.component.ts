import { Component, OnInit } from '@angular/core';

import { TrabajoMasPedidoService } from '../movimientos/trabajoMasPedido.service';

@Component({
  selector: 'app-trabajo-mas-pedido',
  templateUrl: './trabajo-mas-pedido.component.html',
  styleUrls: ['./trabajo-mas-pedido.component.css']
})
export class TrabajoMasPedidoComponent implements OnInit {

  public empresas = [];
  public nombreEmpresa = null;
  public nombreTrabajoMasPedido = null;
  public cantidadTrabajoMasPedido = null;
  
  constructor(private trabajoMasPedidoService: TrabajoMasPedidoService ) { }

  ngOnInit() {
    //obtenemos las empresas al iniciar.
    let yo = this;
    this.trabajoMasPedidoService.consultarEmpresas().then(emp => {
      console.log("Las empresas que llegaron son....",emp);
      this.empresas = emp.obj;
    });
  }

  public empresaElegida(idEmpresa){
    console.log("La empresa elegida es..." , idEmpresa);
  
    this.trabajoMasPedidoService.obtenerTrabajoMasPedido(idEmpresa).then(trabajo => {
      console.log("Lo que me llego por parametro es....", trabajo);

      let empresa = this.retornarEmpresa(idEmpresa);
      if(empresa!=null){
        console.log("la empresa q me devolvio fue.... ", empresa);
        this.nombreEmpresa = empresa.Nombre;
        this.nombreTrabajoMasPedido = trabajo.obj.nombre;
        this.cantidadTrabajoMasPedido = trabajo.obj.cantidad;
      }
    })
  
  
  }


  private retornarEmpresa(idEmpresa){

    for (var index = 0; index < this.empresas.length; index++) {
      var element = this.empresas[index];
      
      if(element._id === idEmpresa){
        return element;
      }
    }

    return null;

  }



}
