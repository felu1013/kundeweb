import { Component, Input } from '@angular/core';
import log from 'loglevel';
import { Kunde } from '../../shared';

/**
 * Komponente für das Tag hs suchergebnis
 */
@Component({
    selector: 'hs-suchergebnis',
    templateUrl: './suchergebnis.component.html',
})
export class SuchergebnisComponent {
    @Input()
    kunden: Kunde[] = [];

    @Input()
    errorMsg: string | undefined;

    constructor() {
        log.debug('SuchergebnisComponent.constructor()');
    }
}
