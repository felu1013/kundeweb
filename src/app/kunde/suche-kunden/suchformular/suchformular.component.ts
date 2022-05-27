import { Component, Output } from '@angular/core';
import { type GeschlechtTyp } from '../../shared/kunde';
import { Subject } from 'rxjs';
import { type Suchkriterien } from '../../shared';
import { fadeIn } from '../../../shared';
import log from 'loglevel';

/**
 * Komponente für das Tag hs suchformular
 */
@Component({
    selector: 'hs-suchformular',
    templateUrl: './suchformular.component.html',
    animations: [fadeIn],
})
export class SuchformularComponent {
    @Output()
    readonly suchkriterien$ = new Subject<Suchkriterien>();

    #nachname = '';

    #geschlecht: GeschlechtTyp | '' = '';

    constructor() {
        log.debug('SuchformularComponent.constructor()');
    }

    setNachname(nachname: string) {
        log.debug('Suchformular.setNachname', nachname);
        this.#nachname = nachname;
    }

    setGeschlecht(geschlecht: GeschlechtTyp | '') {
        log.debug('SuchformularComponent.setGeschlecht', geschlecht);
        this.#geschlecht = geschlecht;
    }

    /**
     * Suche nach Kunden, die den spezifizieren Suchkriterien entsprechen
     * @return false, um duch den Button Klick ausgelöste Ereignis
     *         zu konsumieren
     */
    onSubmit() {
        log.debug(
            'SuchformularComponent.onSubmit: nachname / geschlecht',
            this.#nachname,
            this.#geschlecht,
        );

        this.suchkriterien$.next({
            nachname: this.#nachname,
            geschlecht: this.#geschlecht,
        });

        return false;
    }
}
