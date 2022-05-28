import { DetailsAdresseComponent } from './details-adresse.component';
import { DetailsEmailComponent } from './details-email.component';
import { DetailsGeschlechtComponent } from './details-geschlecht.component';
import { DetailsKategorieComponent } from './details-kategorie.component';
import { DetailsNachnameComponent } from './details-nachname.component';
import { DetailsNewsletterComponent } from './details-newsletter.component';
import { DetailsStammdatenComponent } from './details-stammdaten.component';
import { DetailsUsernameComponent } from './details-username.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [
        DetailsAdresseComponent,
        DetailsEmailComponent,
        DetailsGeschlechtComponent,
        DetailsKategorieComponent,
        DetailsNachnameComponent,
        DetailsNewsletterComponent,
        DetailsStammdatenComponent,
        DetailsUsernameComponent,
    ],
    exports: [DetailsStammdatenComponent],
})
export class DetailsStammdatenModule {}
