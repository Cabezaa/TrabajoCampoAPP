import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { TrabajoMasPedidoComponent } from './trabajo-mas-pedido/trabajo-mas-pedido.component';


const appRoutes: Routes =  [
	{
		path:'',
		component: AppComponent
	},
	{
		path:'FinalizarTrabajo',
		component: WizardComponent
	},
	{
		path:'TrabajoMasPedido',
		component: TrabajoMasPedidoComponent
	}
];


export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
