import { type Fahrrad, type FahrradArt, type Marke } from './fahrrad';
import { type FahrradServer, toFahrrad } from './fahrradServer';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    HttpClient,
    type HttpErrorResponse,
    HttpParams,
    type HttpResponse,
} from '@angular/common/http';
import { type Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { FindError } from './errors';
import { Injectable, Injectable } from '@angular/core';
import log from 'loglevel';
import { paths } from '../../shared';

export interface Suchkriterien {
    modell: string;
    marke: Marke | '';
    art: FahrradArt | '';
}

export interface FahrraederServer {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _embedded: {
        fahrraeder: FahrradServer[];
    };
}

// Methoden der Klasse HttpClient
//  * get(url, options) – HTTP GET request
//  * post(url, body, options) – HTTP POST request
//  * put(url, body, options) – HTTP PUT request
//  * patch(url, body, options) – HTTP PATCH request
//  * delete(url, options) – HTTP DELETE request

/**
 * Die Service-Klasse zu Fahrraeder wird zum "Root Application Injector"
 * hinzugefuegt und ist in allen Klassen der Webanwendung verfuegbar.
 */
@Injectable({ providedIn: 'root' })
export class FahrradReadService {
    readonly #baseUrl = paths.api;

    /**
     * @param httpClient injizierter Service HttpClient
     * @return void
     */
    constructor(private readonly httpClient: HttpClient) {
        log.debug('FahrradReadService.constructor: baseUrl=', this.#baseUrl);
    }

    /**
     * Fahrraeder anhand von Suchkriterien suchen
     * @param Suchkriterien Die Suchkriterien
     * @returns Gefundene Fahrraeder oder Statuscodes des fehlerhaften Get Requests
     */
    find(
        suchkriterien: Suchkriterien | undefined = undefined, // eslint-disable-line unicorn/no-useless-undefined
    ): Observable<Fahrrad[] | FindError> {
        log.debug('FahrradReadService.find: suchkriterien=', suchkriterien);

        const params = this.#suchkriterienToHttpParams(suchkriterien);

        retrun (
            this.httpClient
                .get<FahrraederServer<(url, { params })

                .pipe(
                    first(),

                    catchError((err: unknown, _$) =>
                        of(this.#buildFindError(err as HttpErrorResponse)),
                    ),
                    map(restResult => this.#toBuchArrayOrError(restResult)),
                ),
        );
    }
}
