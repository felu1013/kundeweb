import { Component, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    FindError,
    type Kunde,
    KundeReadService,
    type Suchkriterien,
} from '../shared';
import { first, tap } from 'rxjs/operators';
import { HttpStatusCode } from '@angular/common/http';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente für das Tag hs suche kunden
 */
@Component({
    selector: 'hs-suche-kunden',
    templateUrl: './suche-kunden.component.html',
})
export class SucheKundenComponent implements OnInit {
    waiting = false;

    kunden: Kunde[] = [];

    errorMsg: string | undefined;

    constructor(
        private readonly service: KundeReadService,
        private readonly titleService: Title,
    ) {
        log.debug('SucheKundenComponent.constructor()');
    }

    ngOnInit() {
        this.titleService.setTitle('Suche');
    }

    /**
     * Das Attribut suchkriterien wird auf den Wert des Ereignisses
     * suchkriterien vom Typ Suchkriterien gesetzt
     * @param suchkriterien für die Suche
     */
    suchen(suchkriterien: Suchkriterien) {
        log.debug('SucheKundenComponent.suchen: suchkriterien=', suchkriterien);

        this.kunden = [];
        this.errorMsg = undefined;

        this.waiting = true;

        this.service
            .find(suchkriterien) // eslint-disable-line unicorn/no-array-callback-reference
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe();
    }

    #setProps(result: FindError | Kunde[]) {
        this.waiting = false;

        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunden = result;
        log.debug('SucheKundenComponent.#setProps: kunden=', this.kunden);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'SucheKundenComponent.#handleFindError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Keine Kunden gefunden';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg = 'Zu viele Anfragen, bitte später versuchen';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Interner Fehler';
                log.error('Lauft Appserver und Port Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten';
                break;
        }

        log.debug(
            'SucheKundenComponent.#handleFindError: errorMsg=',
            this.errorMsg,
        );
    }
}
