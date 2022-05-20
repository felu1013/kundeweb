import { type Fahrrad, type FahrradShared } from './fahrrad';
import { Temporal } from '@js-temporal/polyfill';
import log from 'loglevel';

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface FahrradServer extends FahrradShared {
    gewicht?: number;
    datum?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Ein Fahrrad-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
 * Service kommen.
 * @param fahrrad JSON-Objekt mit Daten vom RESTful Web Server
 * @return Das initialisierte Fahrrad-Objekt
 */
export const toFahrrad = (fahrradServer: FahrradServer, etag?: string) => {
    let selfLink: string | undefined;
    const { _links } = fahrradServer; // eslint-disable-line @typescript-eslint/naming-convention
    if (_links !== undefined) {
        const { self } = _links;
        selfLink = self.href;
    }
    let id: string | undefined;
    if (selfLink !== undefined) {
        const lastSlash = selfLink.lastIndexOf('/');
        id = selfLink.slice(lastSlash + 1);
    }

    let version: number | undefined;
    if (etag !== undefined) {
        // Anfuehrungszeichen am Anfang und am Ende entfernen
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const { modell, gewicht, art, marke, datum, preis } = fahrradServer;

    let datumTemporal: Temporal.PlainDate | undefined;
    // TODO Parsing, ob der Datum-String valide ist
    if (datum !== undefined) {
        const [yearStr, monthStr, dayStr] = datum
            .replace(/T.*/gu, '')
            .split('-');
        const year = Number(yearStr);
        const month = Number(monthStr);
        const day = Number(dayStr);
        datumTemporal = new Temporal.PlainDate(year, month, day);
    }

    const fahrrad: Fahrrad = {
        id,
        modell: modell ?? 'unbekannt',
        gewicht,
        art,
        marke,
        datum: datumTemporal,
        preis,
        version,
    };
    log.debug('Fahrrad.fromServer: fahrrad=', fahrrad);
    return fahrrad;
};

/**
 * Konvertierung des Fahrradobjektes in ein JSON-Objekt f&uuml;r den RESTful
 * Web Service.
 * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
 */
export const toFahrradServer = (fahrrad: Fahrrad): FahrradServer => {
    const datum =
        fahrrad.datum === undefined ? undefined : fahrrad.datum.toString();
    return {
        modell: fahrrad.modell,
        gewicht: fahrrad.gewicht,
        art: fahrrad.art,
        marke: fahrrad.marke,
        datum,
        preis: fahrrad.preis,
    };
};
