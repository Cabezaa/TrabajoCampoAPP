import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { WizardComponent } from './wizard/wizard.component';
import { EmpleadoMasTrabajosComponent } from './movimientos/empleadoMasTrabajos/empleadoMasTrabajos.component';



const appRoutes: Routes =  [
	{
		path:'',
		component: WizardComponent
	},
	{
		path:'movimiento1',
		component: WizardComponent
	},
	{
		path:'movimiento2',
		component: EmpleadoMasTrabajosComponent
	}
];


export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
