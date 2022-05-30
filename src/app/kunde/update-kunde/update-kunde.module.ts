import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { UpdateEmailComponent } from './update-email.component';
import { UpdateGeschlechtComponent } from './update-geschlecht.component';
import { UpdateKategorieComponent } from './update-kategorie.component';
import { UpdateKundeComponent } from './update-kunde.component';
import { UpdateNachnameComponent } from './update-nachname.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        UpdateEmailComponent,
        UpdateGeschlechtComponent,
        UpdateKategorieComponent,
        UpdateKundeComponent,
        UpdateNachnameComponent,
    ],
    providers: [Title],
})
export class UpdateKundeModule {}
