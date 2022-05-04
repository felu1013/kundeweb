import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    // fuer <router-outlet>
    imports: [SharedModule],
    declarations: [MainComponent],
    exports: [MainComponent],
})
export class MainModule {}
