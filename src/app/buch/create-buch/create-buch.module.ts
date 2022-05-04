/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CreateArtComponent } from './create-art.component';
import { CreateBuchComponent } from './create-buch.component';
import { CreateDatumComponent } from './create-datum.component';
import { CreateIsbnComponent } from './create-isbn.component';
import { CreateLieferbarComponent } from './create-lieferbar.component';
import { CreatePreisComponent } from './create-preis.component';
import { CreateRabattComponent } from './create-rabatt.component';
import { CreateRatingComponent } from './create-rating.component';
import { CreateSchlagwoerterComponent } from './create-schlagwoerter.component';
import { CreateTitelComponent } from './create-titel.component';
import { CreateVerlagComponent } from './create-verlag.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// BuchModule ist ein "FeatureModule", das Features fuer Buecher bereitstellt
@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        SharedModule,
    ],
    declarations: [
        CreateArtComponent,
        CreateBuchComponent,
        CreateDatumComponent,
        CreateIsbnComponent,
        CreateLieferbarComponent,
        CreatePreisComponent,
        CreateRabattComponent,
        CreateRatingComponent,
        CreateSchlagwoerterComponent,
        CreateTitelComponent,
        CreateVerlagComponent,
    ],
    providers: [Title],
})
export class CreateBuchModule {}
