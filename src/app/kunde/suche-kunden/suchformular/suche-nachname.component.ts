import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente für das Tag hs suche nachname
 */
@Component({
    selector: 'hs-suche-nachname',
    templateUrl: './suche-nachname.component.html',
})
export class SucheNachnameComponent {
    nachname = '';

    @Output()
    readonly nachname$ = new Subject<string>();

    constructor() {
        log.debug('SucheNachnameComponent.constructor()');
    }

    onBlur() {
        log.debug(`SucheNachnameComponent.onBlur: nachname=${this.nachname}`);
        this.nachname$.next(this.nachname);
    }
}
