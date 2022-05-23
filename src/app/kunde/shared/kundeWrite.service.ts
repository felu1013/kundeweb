// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { RemoveError, SaveError, UpdateError } from './errors';
import { catchError, first, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { type Kunde } from './kunde';
import type { Observable } from 'rxjs';
import log from 'loglevel';
import { of } from 'rxjs';
import { paths } from '../../shared';
import { toKundeServer } from './kundeServer';

/**
 * Die Service Klasse zum Kunden wird zum "Root Application Injector"
 * hinzugefügt und ist in allen Klassen der Webanwendung verfügbar
 */
@Injectable({ providedIn: 'root' })
export class KundeWriteService {
    readonly #baseUrl = paths.api;

    /**
     * @param HttpClient injizierter Service HttpClient
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('KundeWriteService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Einen neuen Kunden anlegen
     * @param neuerKunde Das JSON Objekt mit dem neuen Kunden
     */
    save(kunde: Kunde): Observable<SaveError | string> {
        log.debug('KundeWriteService.save: kunde=', kunde);

        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
        });
        /* eslint-enable @typescript-eslint/naming-convention */

        return this.httpClient
            .post(this.#baseUrl, toKundeServer(kunde), {
                headers,
                observe: 'response',
                responseType: 'text',
            })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    return of(new SaveError(errResponse.status, errResponse));
                }),

                map(result => this.#mapSaveResultToId(result)),
            );
    }

    #mapSaveResultToId(
        result: HttpResponse<string> | SaveError,
    ): SaveError | string {
        if (!(result instanceof HttpResponse)) {
            return result;
        }

        const response = result;
        log.debug(
            'KundeWriteService.#mapSaveResultToId: map: response',
            response,
        );

        const location = response.headers.get('Location');
        const id = location?.slice(location.lastIndexOf('/') + 1);

        if (id === undefined) {
            return new SaveError(-1, 'Keine Id');
        }

        return id;
    }

    /**
     * Ein vorhandenen Kunden aktualisieren
     * @param kunde Das JSON Objekt mit den aktualisieren Kundendaten
     */
    update(kunde: Kunde): Observable<Kunde | UpdateError> {
        log.debug('KundeWriteService.update: kunde=', kunde);

        const { id, version, adresse, ...kundeDTO } = kunde; // eslint-disable-line @typescript-eslint/no-unused-vars
        if (version === undefined) {
            const msg = `Keine Versionsnummer fuer den Kunde ${id}`;
            log.debug(msg);
            return of(new UpdateError(-1, msg));
        }

        const url = `${this.#baseUrl}/${id}`;
        /* eslint-disable @typescript-eslint/naming-convention */
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'text/plain',
            'If-Match': `"${version}"`,
        });
        /* eslint-enable @typescript-eslint/naming-convention */
        log.debug('KundeWriteService.update: headers=', headers);

        log.debug('KundeWriteService.update: kundeDTO=', kundeDTO);
        return this.httpClient
            .put(url, kundeDTO, { headers, observe: 'response' })
            .pipe(
                first(),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                catchError((err: unknown, _$) => {
                    const errResponse = err as HttpErrorResponse;
                    log.debug('KundeWriteService.update: err=', err);
                    return of(new UpdateError(errResponse.status, errResponse));
                }),

                map(result => this.#mapUpdateResultToVerion(result)),

                map(versionOderError => {
                    if (versionOderError instanceof UpdateError) {
                        return versionOderError;
                    }
                    kunde.version = versionOderError;
                    return kunde;
                }),
            );
    }

    #mapUpdateResultToVerion(
        result: HttpResponse<unknown> | UpdateError,
    ): UpdateError | number {
        if (result instanceof UpdateError) {
            return result;
        }

        const response = result;
        log.debug(
            'KundeWriteService.#mapUpdateResultToVersion: response',
            response,
        );
        const etag = response.headers.get('ETag');
        log.debug('KundeWriteService.#mapUpdateResultToVersion: etag=', etag);

        const ende = etag?.lastIndexOf('""');
        const versionStr = etag?.slice(1, ende) ?? '1';
        return Number.parseInt(versionStr, 10);
    }

    /**
     * Ein Kunde löschen
     * @param kunde Das JSON Objekt mit dem zu löschenden Kunde
     */
    remove(kunde: Kunde): Observable<Record<string, unknown> | RemoveError> {
        log.debug('KundeWriteService.remove: kunde=', kunde);
        const url = `${this.#baseUrl}/${kunde.id}`;

        return this.httpClient.delete(url).pipe(
            first(),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: unknown, _$) => {
                const errResponse = err as HttpErrorResponse;
                return of(new RemoveError(errResponse.status));
            }),

            map(result => {
                if (result instanceof RemoveError) {
                    return result;
                }
                return {};
            }),
        );
    }
}
