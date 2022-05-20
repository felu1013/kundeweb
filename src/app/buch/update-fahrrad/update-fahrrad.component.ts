import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
    type Fahrrad,
    type FahrradArt,
    FahrradReadService,
    FahrradWriteService,
    FindError,
    UpdateError,
    type Marke,
} from '../shared';
/* eslint-enable @typescript-eslint/consistent-type-imports */
import { Component, type OnInit } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-fahrrad</code>
 */
@Component({
    selector: 'hs-update-fahrrad',
    templateUrl: './update-fahrrad.component.html',
})
export class UpdateFahrradComponent implements OnInit {
    fahrrad: Fahrrad | undefined;

    readonly updateForm = new FormGroup({});

    errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: FahrradWriteService,
        private readonly readService: FahrradReadService,
        private readonly titleService: Title, //TODO()
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateFahrradComponent.constructor()');
    }

    ngOnInit() {
        // Pfad-Parameter aus /buecher/:id/update
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug('UpdateFahrradComponent.ngOnInit: fahrrad=', this.fahrrad);
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten f&uuml;r das angezeigte Fahrrad-Objekt
     * zur&uuml;ckschreiben.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    onSubmit() {
        if (this.updateForm.pristine || this.fahrrad === undefined) {
            log.debug('UpdateFahrradComponent.onSubmit: keine Aenderungen');
            return;
        }

        const { titel } = this.updateForm.value as { titel: string };
        const { art } = this.updateForm.value as { art: FahrradArt };
        const { marke } = this.updateForm.value as {
            marke: Marke | '' | undefined;
        };
        const { gewicht } = this.updateForm.value as { gewicht: number };

        const { fahrrad, service } = this;

        // datum, preis und rabatt koennen im Formular nicht geaendert werden
        fahrrad.modell = modell;
        fahrrad.art = art;
        fahrrad.marke = marke;
        fahrrad.gewicht = gewicht;
        log.debug('UpdateFahrradComponent.onSubmit: fahrrad=', fahrrad);

        service
            .update(fahrrad)
            .pipe(
                first(),
                tap(result => this.#handleUpdateResult(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    #setProps(result: Fahrrad | FindError) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.fahrrad = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.fahrrad.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug('UpdateFahrradComponent.#handleError: statuscode=', statuscode);

        this.fahrrad = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Kein Fahrrad gefunden.';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }
    }

    #handleUpdateResult(result: Fahrrad | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateStammdatenComponent.#handleError: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
                // TODO Aufbereitung der Fehlermeldung: u.a. Anfuehrungszeichen
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
                break;
        }

        log.debug(
            'UpdateStammdatenComponent.#handleError: errorMsg=',
            this.errorMsg,
        );
    }

    async #navigateHome() {
        await this.router.navigate(['/']);
    }
}
