import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WizardModule } from 'ng2-archwizard';
import 'hammerjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdFormFieldModule} from '@angular/material';

// Routing
import { routing } from './app.routing';

// import {CdkTableModule} from '@angular/cdk';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { FinalizarTrabajoComponent } from './finalizar-trabajo/finalizar-trabajo.component';

import { TablaTrabajosComponent } from './finalizar-trabajo/tablaTrabajos/tablaTrabajos.component';
import { TablaOrdenesComponent } from './finalizar-trabajo/tablaOrdenes/tablaOrdenes.component';
import { TablaDocumentosComponent } from './finalizar-trabajo/tablaDocumentos/tablaDocumentos.component';
import { ValoresEntradaComponent } from './finalizar-trabajo/valores-entrada/valores-entrada.component';

import { TrabajosService } from './servicios/trabajos.service';
import { OrdenesService } from './servicios/ordenes.service';
import { DocumentosService } from './servicios/documentos.service';
import { TipoParametroService } from './servicios/tipoParametro.service';
import { ResultadosService } from './servicios/resultados.service';
import { FinalizarTrabajoService } from './movimientos/finalizarTrabajo.service';
import { TrabajoMasPedidoService } from './movimientos/trabajoMasPedido.service';

import { WizardComponent } from './wizard/wizard.component';
import { TrabajoMasPedidoComponent } from './trabajo-mas-pedido/trabajo-mas-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    FinalizarTrabajoComponent,
    TablaTrabajosComponent,
    TablaOrdenesComponent,
    TablaDocumentosComponent,
    ValoresEntradaComponent,
    WizardComponent,
    TrabajoMasPedidoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdTableModule,
    routing,
    // CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    WizardModule
  ],
  providers: [
    TrabajosService,
    OrdenesService,
    DocumentosService,
    TipoParametroService,
    ResultadosService,
    FinalizarTrabajoService,
    TrabajoMasPedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
