import { ActivatedRoute, Router } from '@angular/router'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import { Component, type OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
    FindError,
    type GeschlechtTyp,
    type Kunde,
    KundeReadService,
    KundeWriteService,
    UpdateError,
} from '../shared';
/* eslint-enable @typescript-eslint/consistent-type-imports */
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

/**
 * Komponente für das Tag hs update kunde
 */
@Component({
    selector: 'hs-update-kunde',
    templateUrl: './update-kunde.component.html',
})
export class UpdateKundeComponent implements OnInit {
    kunde: Kunde | undefined;

    readonly updateForm = new FormGroup({});

    errorMsg: string | undefined;

    // eslint-disable-next-line max-params
    constructor(
        private readonly service: KundeWriteService,
        private readonly readService: KundeReadService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {
        log.debug('UpdateKundeComponent.constructor()');
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') ?? undefined;

        this.readService
            .findById(id)
            .pipe(
                first(),
                tap(result => {
                    this.#setProps(result);
                    log.debug(
                        'UpdateKundeComponent.ngOnInit: kunde=',
                        this.kunde,
                    );
                }),
            )
            .subscribe();
    }

    /**
     * Die aktuellen Stammdaten für das angezeigte Kunde Objekt zurückschreiben
     * @return false, um das durch den Button Klick ausgelöste Ereignis zu konsumieren
     */
    onSubmit() {
        if (this.updateForm.pristine || this.kunde === undefined) {
            log.debug('UpdateKundeComponent.onSubmit: keine Aenderung');
            return;
        }

        const { nachname } = this.updateForm.value as { nachname: string };
        const { geschlecht } = this.updateForm.value as {
            geschlecht: GeschlechtTyp;
        };
        const { kategorie } = this.updateForm.value as { kategorie: number };
        const { email } = this.updateForm.value as { email: string };

        const { kunde, service } = this;

        kunde.nachname = nachname;
        kunde.geschlecht = geschlecht;
        kunde.kategorie = kategorie;
        kunde.email = email;
        log.debug('UpdateKundeComponent.onSubmit: kunde=', kunde);

        service
            .update(kunde)
            .pipe(
                first(),
                tap(result => this.#handleUpdateResult(result)),
            )
            .subscribe({ next: () => this.#navigateHome() });

        return false;
    }

    #setProps(result: FindError | Kunde) {
        if (result instanceof FindError) {
            this.#handleFindError(result);
            return;
        }

        this.kunde = result;
        this.errorMsg = undefined;

        const titel = `Aktualisieren ${this.kunde.id}`;
        this.titleService.setTitle(titel);
    }

    #handleFindError(err: FindError) {
        const { statuscode } = err;
        log.debug(
            'UpdateKundeComponent.#handleFindError: statuscode=',
            statuscode,
        );

        this.kunde = undefined;

        switch (statuscode) {
            case HttpStatusCode.NotFound:
                this.errorMsg = 'Kein Kunde gefunden';
                break;
            case HttpStatusCode.TooManyRequests:
                this.errorMsg =
                    'Zu viele Anfragen, bitte versuchen Sie es später erneut';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Ein interner Fehler ist aufgetreten';
                log.error('Laeuft der Appserver und Port Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten';
                break;
        }
    }

    #handleUpdateResult(result: Kunde | UpdateError) {
        if (!(result instanceof UpdateError)) {
            return;
        }

        const { statuscode } = result;
        log.debug(
            'UpdateKundeComponent.#handleUpdateResult: statuscode=',
            statuscode,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = result;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }
            case HttpStatusCode.TooManyRequests:
                this.errorMsg = 'Zu viele Anfragen, bitte später versuchen';
                break;
            case HttpStatusCode.GatewayTimeout:
                this.errorMsg = 'Interner Fehler';
                log.error('Laeuft Appserver und Port Forwarding?');
                break;
            default:
                this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten';
                break;
        }

        log.debug(
            'UpdateKundeComponent.#handleUpdateResult: errorMsg=',
            this.errorMsg,
        );
    }

    async #navigateHome() {
        await this.router.navigate(['/']);
    }
}
