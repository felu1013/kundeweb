import { RouterModule, type Routes } from '@angular/router';
import { AdminGuard } from '../auth/admin.guard';
import { BalkendiagrammComponent } from './diagramme/balkendiagramm.component';
import { FahrradModule } from './fahrrad.module';
import { CreateFahrradComponent } from './create-fahrrad/create-fahrrad.component';
import { CreateFahrradGuard } from './create-fahrrad/create-fahrrad.guard';
import { DetailsFahrradComponent } from './details-fahrrad/details-fahrrad.component';
import { LiniendiagrammComponent } from './diagramme/liniendiagramm.component';
import { NgModule } from '@angular/core';
import { SucheFahrraederComponent } from './suche-fahrraeder/suche-fahrraeder.component';
import { TortendiagrammComponent } from './diagramme/tortendiagramm.component';
import { UpdateFahrradComponent } from './update-fahrrad/update-fahrrad.component';

// Route-Definitionen fuer das Feature-Modul "fahrrad":
// Zuordnung von Pfaden und Komponenten mit HTML-Templates
const routes: Routes = [
    {
        path: 'suche',
        component: SucheFahrraederComponent,
    },
    {
        path: 'create',
        component: CreateFahrradComponent,
        canActivate: [AdminGuard],
        canDeactivate: [CreateFahrradGuard],
    },
    {
        path: 'balkendiagramm',
        component: BalkendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'liniendiagramm',
        component: LiniendiagrammComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'tortendiagramm',
        component: TortendiagrammComponent,
        canActivate: [AdminGuard],
    },

    // id als Pfad-Parameter
    {
        path: 'update/:id',
        component: UpdateFahrradComponent,
        canActivate: [AdminGuard],
    },
    {
        path: ':id',
        component: DetailsFahrradComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), FahrradModule],
    exports: [RouterModule],
})
export class BuchRoutingModule {}
