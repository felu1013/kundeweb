// "Reverse Proxy": eingehende Requests werden an einen anderen HTTP-Server
// weitergeleitet ("forward") und analog wird der Response an den aufrufenden
// Client weitergeleitet.
// Dabei werden ggf. Header-Daten umgeschrieben, Transformationen zwischen
// HTTP und HTTPS koennen noetig sein und GZip-Komprimierung kann erfolgen.
// Vorteile fuer ein abgeschirmtes Backend:
// + HTTPS
// + (De-) Komprimierung mit GZip
// + API-Gateway mit Routing

/**
 * Basis-Pfad fuer den REST-Server wahlweise via:
 * 1) Reverse Proxy oder
 * 2) CORS bei Kubernetes, wozu Port-Forwarding fuer den Web Service
 *    erforderlich ist, der auch in K8s mit TLS läuft.
 */

// webpack dev server und nginx als "Reverse Proxy", d.h. eingehende Requests
const PATH_REST = '/rest';
// CORS mit dem Appserver "kunde" (in Kubernetes):
// const PATH_REST = 'https://localhost:3000';

export const paths = {
    api: `${PATH_REST}/api`,
    login: `${PATH_REST}/auth/login`,
};
