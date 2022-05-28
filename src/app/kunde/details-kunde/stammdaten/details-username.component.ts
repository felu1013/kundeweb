import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-titel</code>
 */
@Component({
    selector: 'hs-details-username',
    templateUrl: './details-username.component.html',
})
export class DetailsUsernameComponent implements OnInit {
    @Input()
    username!: string;

    ngOnInit() {
        log.debug(`DetailsUsernameComponent.username=${this.username}`);
    }
}
