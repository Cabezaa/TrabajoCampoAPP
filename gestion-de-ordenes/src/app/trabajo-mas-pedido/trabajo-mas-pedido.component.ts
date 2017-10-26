import { Component, OnInit } from '@angular/core';

import { TrabajoMasPedidoService } from '../movimientos/trabajoMasPedido.service';

@Component({
  selector: 'app-trabajo-mas-pedido',
  templateUrl: './trabajo-mas-pedido.component.html',
  styleUrls: ['./trabajo-mas-pedido.component.css']
})
export class TrabajoMasPedidoComponent implements OnInit {

  public empresas = [];

  constructor(private trabajoMasPedidoService: TrabajoMasPedidoService ) { }

  ngOnInit() {
    //obtenemos las empresas al iniciar.
    let yo = this;
    this.trabajoMasPedidoService.consultarEmpresas().then(emp => {
      console.log("Las empresas que llegaron son....",emp);
      this.empresas = emp.obj;
    });
  }

  public empresaElegida(empresa){
    console.log("La empresa elegida es..." , empresa)
  }



}
