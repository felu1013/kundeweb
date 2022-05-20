import { CreateFahrradModule } from './create-fahrrad/create-fahrrad.module';
import { DetailsFahrradModule } from './details-fahrrad/details-fahrrad.module';
import { DiagrammeModule } from './diagramme/diagramme.module';
import { NgModule } from '@angular/core';
import { SucheFahrraederModule } from './suche-fahrraeder/suche-fahrraeder.module';
import { UpdateFahrradModule } from './update-fahrrad/update-fahrrad.module';

@NgModule({
    imports: [
        CreateFahrradModule,
        DetailsFahrradModule,
        DiagrammeModule,
        SucheFahrraederModule,
        UpdateFahrradModule,
    ],
})
export class FahrradModule {}
