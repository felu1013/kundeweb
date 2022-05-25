import { type Kunde, type KundeShared } from '../shared';
import log from 'loglevel';

/**
 * Daten aus einem Formular
 */
export interface KundeForm extends KundeShared {
    kategorie: number;
    adresse: string;
}

/**
 * Ein Kunde Objekt mit JSON Daten erzeugen, die von einem Formular kommen
 * @param kunde JSON Objekt mit Daten vom Formulad
 * @return Das initialisierte kunde Objekt
 */
export const toKunde = (kundeForm: KundeForm) => {
    log.debug('toKunde: kundeForm=', kundeForm);

    const {
        nachname,
        email,
        kategorie,
        newsletter,
        geschlecht,
        adresse,
        username,
    } = kundeForm;

    const kategorieNumber = Number(kategorie);

    const kunde: Kunde = {
        nachname,
        email,
        kategorie: kategorieNumber,
        newsletter,
        geschlecht,
        adresse,
        username,
        version: 0,
    };
    log.debug('toKunde: kunde=', kunde);
    return kunde;
};
