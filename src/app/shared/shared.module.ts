// https://angular.io/guide/sharing-ngmodules

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WaitingComponent } from './waiting.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ErrorMessageComponent, WaitingComponent],
    // *NICHT* BrowserAnimationsModule, weil dort BrowserModule importiert wird
    exports: [
        // *ngIf="...", *ngFor="...", *ngSwitch="..."
        CommonModule,
        ErrorMessageComponent,
        // [(ngModel)]="..."
        FormsModule,
        // [formGroup]="..."
        ReactiveFormsModule,
        // [routerLink]="...", [state]="...", <router-outlet>
        RouterModule,
        WaitingComponent,
    ],
})
export class SharedModule {}
