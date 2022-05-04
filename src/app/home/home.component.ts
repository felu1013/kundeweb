import { Component, type OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // eslint-disable-line @typescript-eslint/consistent-type-imports
import log from 'loglevel';

@Component({
    selector: 'hs-home',
    // https://next.angular.io/guide/i18n
    // https://angular.io/guide/i18n
    // https://github.com/angular/angular/tree/master/packages/common/locales
    // http://cldr.unicode.org
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {
        log.debug('HomeComponent.constructor()');
    }

    ngOnInit() {
        this.title.setTitle('Beispiel');
    }
}
