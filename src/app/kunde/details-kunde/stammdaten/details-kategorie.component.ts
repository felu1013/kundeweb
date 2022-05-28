import { Component, Input, type OnInit } from '@angular/core';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-details-kategorie</code>
 */
@Component({
    selector: 'hs-details-kategorie',
    templateUrl: './details-kategorie.component.html',
    styleUrls: ['./details-kategorie.component.scss'],
})
export class DetailsKategorieComponent implements OnInit {
    @Input()
    kategorie: number | undefined;

    counter: boolean[] = [];

    ngOnInit() {
        if (this.kategorie !== undefined) {
            for (let i = 0; i < this.kategorie; i++) {
                this.counter.push(true);
            }
        }
        log.debug('DetailsKategorieComponent.kategorie=', this.kategorie);
    }
}
