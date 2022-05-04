import { Component, Input } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r die Darstellung einer Fehlermeldung durch das Tag
 * &lt;hs-error-message [text]="..."&gt;
 */
@Component({
    selector: 'hs-error-message',
    templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
    // Property Binding: <hs-error-message [text]="...">
    // siehe InputMetadata
    @Input()
    text: string | undefined;

    constructor() {
        log.debug('ErrorMessageComponent.constructor()');
    }
}
