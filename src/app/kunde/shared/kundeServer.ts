import { type Kunde, type KundeShared } from './kunde';
import log from 'loglevel';

interface Link {
    href: string;
}

export interface KundeServer extends KundeShared {
    kategorie?: number;
    adresse?: string;
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
 * Ein Kunde Objekt erzeugen
 * @param kunde Json Objekt mit Daten vom RESTful WebServer
 * @returns Das initialisierte Kunde Objekt
 */
export const toKunde = (kundeServer: KundeServer, etag?: string) => {
    let selfLink: string | undefined;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _links } = kundeServer;
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
        const versionStr = etag.slice(1, -1);
        version = Number.parseInt(versionStr, 10);
    }

    const {
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        adresse,
        username,
    } = kundeServer;

    const kunde: Kunde = {
        id,
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        adresse: adresse ?? 'unbekannt',
        username,
        version,
    };
    log.debug('Kunde.fromServer: kunde=', kunde);
    return kunde;
};

/**
 * Konvertierung des KundeObjekts in ein JSON Objekt
 * @returns Das JSON Objekt für den RESTful Web Service
 */
export const toKundeServer = (kunde: Kunde): KundeServer => ({
    nachname: kunde.nachname,
    email: kunde.email,
    kategorie: kunde.kategorie,
    newsletter: kunde.newsletter,
    geschlecht: kunde.geschlecht,
    adresse: kunde.adresse,
    username: kunde.username,
});
