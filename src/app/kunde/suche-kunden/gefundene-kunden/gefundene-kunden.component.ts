/* eslint-disable max-classes-per-file */

import { AuthService, ROLLE_ADMIN } from '../../../auth/auth.service'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, Input, type OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    type Kunde,
    KundeReadService,
    KundeWriteService,
    RemoveError,
} from '../../shared';
import { easeIn, easeOut } from '../../../shared';
import { first, tap } from 'rxjs/operators';
import { NgLocalization } from '@angular/common';
import { Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Subject } from 'rxjs';
import log from 'loglevel';

/**
 * Komponente für das Tag hs gefundene Kunden
 */
@Component({
    selector: 'hs-gefundene-kunden',
    templateUrl: './gefundene-kunden.component.html',
    animations: [easeIn, easeOut],
})
export class GefundeneKundenComponent implements OnInit {
    @Input()
    kunden: Kunde[] = [];

    isAdmin!: boolean;

    isAdmin$ = new Subject<boolean>();

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeReadService,
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly writeService: KundeWriteService,
    ) {
        log.debug('GefundeneKundenComponent.constructor()');
    }

    ngOnInit() {
        log.debug('GefundeneKundenComponent.ngOnInit()');
        this.isAdmin = this.authService.isAdmin;

        this.authService.rollen$
            .pipe(
                first(),
                tap((rollen: string[]) =>
                    this.isAdmin$.next(rollen.includes(ROLLE_ADMIN)),
                ),
            )
            .subscribe();
    }

    /**
     * Den ausgewählten, bzw. angeklickten Kunde in der Detailseite anzeigen
     * @param kunde Der ausgewählte Kunde
     */
    onClick(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onClick: kunde=', kunde);

        const state = { kunde };
        return this.router.navigate([`/kunden/${kunde.id}`], { state });
    }

    /**
     * Den ausgewählten bzw. angeklickten Kunde löschen
     * @param kunde Der ausgewählte Kunde
     */
    onRemove(kunde: Kunde) {
        log.debug('GefundeneKundenComponent.onRemove: kunde=', kunde);

        return this.writeService
            .remove(kunde)
            .pipe(
                first(),
                tap(result => {
                    if (result instanceof RemoveError) {
                        log.debug(
                            'GefundeneKundenComponent.onRemove: statusCode=',
                            result.statuscode,
                        );
                        return;
                    }

                    this.kunden = this.kunden.filter(k => k.id !== kunde.id);
                }),
            )
            .subscribe();
    }

    trackBy(_index: number, kunde: Kunde) {
        return kunde.id;
    }
}

export class AnzahlLocalization extends NgLocalization {
    getPluralCategory(count: number) {
        return count === 1 ? 'single' : 'multi';
    }
}

/* eslint-enable max-classes-per-file */
