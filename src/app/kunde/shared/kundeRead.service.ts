import { type GeschlechtTyp, type Kunde } from './kunde';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpParams,
    type HttpResponse,
} from '@angular/common/http';
import { type KundeServer, toKunde } from './kundeServer';
import { type Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { FindError } from './errors';
import { Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared';

export interface Suchkriterien {
    nachname: string;
    geschlecht: GeschlechtTyp | '';
}

export interface KundenServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        kunden: KundeServer[];
    };
}

/**
 * Die Service Klasse zu Kunden wird zum "Root Application Injector"
 * hinzugefügt und ist in allen Klassen der Webanwendung verfügbar
 */
@Injectable({ providedIn: 'root' })
export class KundeReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param HttpClient injizierter Service HttpClient
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('KundeReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Kunden anhand von Suchkriterien suchen
     * @param suchkriterien Die Suchkriterien
     * @returns gefundene Kunden oder Statuscode
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<FindError | Kunde[]> {
        log.debug('KundeReadService.find: suchkriterien=', suchkriterien);

        const url = this.#baseUrl;
        log.debug('KundeReadService.find url=', url);

        const params = this.#suchkriterienToHttpParams(suchkriterien);

        return this.httpClient
            .get<KundenServer>(url, { params })

            .pipe(
                first(),

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) =>
                    of(this.#buildFindError(err as HttpErrorResponse)),
                ),

                map(restResult => this.#toKundeArrayOrError(restResult)),
            );
    }

    #toKundeArrayOrError(
        restResult: FindError | KundenServer,
    ): FindError | Kunde[] {
        log.debug(
            'KundeReadService.#toKundeArrayOrError: restResult=',
            restResult,
        );
        if (restResult instanceof FindError) {
            return restResult;
        }

        // eslint-disable-next-line no-underscore-dangle
        const kunden = restResult._embedded.kunden.map(kundeServer =>
            toKunde(kundeServer),
        );
        log.debug('KundeReadService.#toKundeArrayOrError: kunden=', kunden);
        return kunden;
    }

    /**
     * Ein Kunde anhad der ID suchen
     * @param id Die Id des Kunden
     */
    findById(id: string | undefined): Observable<FindError | Kunde> {
        log.debug('KundeReadService.findById: id=', id);

        if (id === undefined) {
            log.debug('KundeReadService.findById: Keine Id');
            return of(this.#buildFindError());
        }

        const url = `${this.#baseUrl}/${id}`;
        log.debug('KundeReadService.findById: url=', url);

        return (
            this.httpClient
                /* eslint-disable object-curly-newline */
                .get<KundeServer>(url, {
                    observe: 'response',
                })
                /* eslint-enable object-curly-newline */

                .pipe(
                    first(),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    catchError((err: unknown, _$) => {
                        const errResponse = err as HttpErrorResponse;
                        return of(this.#buildFindError(errResponse));
                    }),

                    map(restResult => this.#toKundeOrError(restResult)),
                )
        );
    }

    #toKundeOrError(
        restResult: FindError | HttpResponse<KundeServer>,
    ): FindError | Kunde {
        if (restResult instanceof FindError) {
            return restResult;
        }

        const { body, headers } = restResult;
        if (body === null) {
            return this.#buildFindError();
        }

        const etag = headers.get('ETag') ?? undefined;
        log.debug('KundeReadService.#toKundeOrError: etag=', etag);

        const kunde = toKunde(body, etag);
        return kunde;
    }

    /**
     * Suchkriterien in Request Parameter konvertieren
     * @param suchkriterien Suchkriterien für den Get Request
     * @return Prameter für den Get Request
     */
    #suchkriterienToHttpParams(
        suchkriterien: Suchkriterien | undefined,
    ): HttpParams {
        log.debug(
            'KundeReadService.#suchkriterienToHttpParams: suchkriterien=',
            suchkriterien,
        );
        let httpParams = new HttpParams();

        if (suchkriterien === undefined) {
            return httpParams;
        }

        const { nachname, geschlecht } = suchkriterien;

        if (nachname !== '') {
            httpParams = httpParams.set('nachname', nachname);
        }
        if (geschlecht !== '') {
            httpParams = httpParams.set('geschlecht', geschlecht);
        }
        return httpParams;
    }

    #buildFindError(err?: HttpErrorResponse) {
        if (err === undefined) {
            return new FindError(-1);
        }

        if (err.error instanceof ProgressEvent) {
            const msg = 'Client-seitiger oder Netzwerkfehler';
            log.error(msg, err.error);
            return new FindError(-1, err);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { status, error } = err;
        log.debug(
            'KundeReadService.#buildFindError: status / Response-Body=',
            status,
            error,
        );
        return new FindError(status, err);
    }
}
