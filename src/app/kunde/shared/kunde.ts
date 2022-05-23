export type GeschlechtTyp = 'D' | 'M' | 'W';

export const EMAIL_REGEX =
    // eslint-disable-next-line require-unicode-regexp
    /[^@]+@[^.]+\..+/g;

export interface Kunde {
    id?: string;
    version?: number;
    nachname: string;
    email: string;
    kategorie: number | undefined;
    newsletter: boolean;
    geschlecht: GeschlechtTyp;
    adresse: string;
    username: string;
}

export interface KundeShared {
    nachname: string;
    email: string;
    newsletter: boolean;
    geschlecht: GeschlechtTyp;
    username: string;
}
