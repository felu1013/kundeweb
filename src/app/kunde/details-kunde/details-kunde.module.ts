import { DetailsBearbeitenComponent } from './details-bearbeiten.component';
import { DetailsBreadcrumbsComponent } from './details-breadcrumbs.component';
import { DetailsKundeComponent } from './details-kunde.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsBearbeitenComponent,
        DetailsBreadcrumbsComponent,
        DetailsKundeComponent,
    ],
    providers: [Title],
})
export class DetailsKundeModule {}
