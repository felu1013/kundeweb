import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SucheKundenComponent } from './suche-kunden.component';
import { SuchergebnisModule } from './suchergebnis/suchergebnis.module';
import { SuchformularModule } from './suchformular/suchformular.module';
import { Title } from '@angular/platform-browser';

@NgModule({
    imports: [SharedModule, SuchergebnisModule, SuchformularModule],
    declarations: [SucheKundenComponent],
    providers: [Title],
})
export class SucheKundenModule {}
