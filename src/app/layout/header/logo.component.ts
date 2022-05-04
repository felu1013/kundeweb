import { Component } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Logo mit dem Tag &lt;hs-logo&gt;.
 */
@Component({
    selector: 'hs-logo',
    templateUrl: './logo.component.html',
})
export class LogoComponent {
    constructor() {
        log.debug('LogoComponent.constructor()');
    }
}
