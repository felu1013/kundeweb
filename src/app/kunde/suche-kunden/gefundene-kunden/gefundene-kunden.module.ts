import { GefundeneKundenComponent } from './gefundene-kunden.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [GefundeneKundenComponent],
    exports: [GefundeneKundenComponent],
})
export class GefundeneKundenModule {}
