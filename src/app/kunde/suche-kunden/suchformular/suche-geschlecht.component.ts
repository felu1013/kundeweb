import { Component, Output } from '@angular/core';
import { type GeschlechtTyp } from '../../shared/kunde';
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente für das Tag hs suche geschlecht
 */
@Component({
    selector: 'hs-suche-geschlecht',
    templateUrl: './suche-geschlecht.component.html',
})
export class SucheGeschlechtComponent {
    geschlecht: GeschlechtTyp | '' = '';

    @Output()
    readonly geschlecht$ = new Subject<GeschlechtTyp | ''>();

    constructor() {
        log.debug('SucheGeschlechtComponent.constructor()');
    }

    onChange(event: Event) {
        const { value } = event.target as HTMLInputElement;
        log.debug(`SucheGeschlechtComponent.onChange: geschlecht=${value}`);
        this.geschlecht$.next(value as GeschlechtTyp | '');
    }
}
