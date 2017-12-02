import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { TrabajoMasPedidoComponent } from './movimientos/trabajo-mas-pedido/trabajo-mas-pedido.component';
import { EmpleadoMasTrabajosComponent } from './movimientos/empleadoMasTrabajos/empleadoMasTrabajos.component';


const appRoutes: Routes =  [
	{
		path:'',
		component: WizardComponent
	},
	{
		path:'FinalizarTrabajo',
		component: WizardComponent
	},
	{
		path:'TrabajoMasPedido',
		component: TrabajoMasPedidoComponent
	},
	{
		path:'EmpleadoMasTrabajos',
		component: EmpleadoMasTrabajosComponent
	}
];


export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
