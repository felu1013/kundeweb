import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CreateAdresseComponent } from './create-adresse.component';
import { CreateEmailComponent } from './create-email.component';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { CreateKategorieComponent } from './create-kategorie.component';
import { CreateKundeComponent } from './create-kunde.component';
import { CreateNachnameComponent } from './create-nachname.component';
import { CreateNewsletterComponent } from './create-newslette.component';
import { CreateUsernameComponent } from './create-username.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        SharedModule,
    ],
    declarations: [
        CreateAdresseComponent,
        CreateEmailComponent,
        CreateGeschlechtComponent,
        CreateKategorieComponent,
        CreateKundeComponent,
        CreateNachnameComponent,
        CreateNewsletterComponent,
        CreateUsernameComponent,
    ],
    providers: [Title],
})
export class CreateKundeModule {}
