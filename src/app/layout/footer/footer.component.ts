import { Component } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den Footer.
 */
@Component({
    selector: 'hs-footer',
    // <footer>
    //     <div class="sticky font-small text-center">&copy; J&uuml;rgen Zimmermann</div>
    // </footer>
    template: '',
    // styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    constructor() {
        log.debug('FooterComponent.constructor()');
    }
}
