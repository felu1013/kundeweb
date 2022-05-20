import { type Temporal } from '@js-temporal/polyfill';

export const MAX_GEWICHT = 30;

export type Marke = 'BAR_MARKE' | 'FOO_MARKE';

export type FahrradArt = 'MOUNTAINBIKE' | 'RENNRAD' | 'TREKKINGRAD';

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export interface Fahrrad {
    id?: string;
    version?: number;
    modell: string;
    gewicht: number | undefined;
    art: FahrradArt;
    marke: Marke | '' | undefined;
    datum: Temporal.PlainDate | undefined;
    preis: number;
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Fahrraddaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 * Verwendung in den Interfaces:
 * - FahrradServer für FahrradReadService
 * - FahrradForm für CreateFahrradComponent
 */
export interface FahrradShared {
    modell: string | undefined;
    marke?: Marke | '';
    art: FahrradArt;
    preis: number;
}
