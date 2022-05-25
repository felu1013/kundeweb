import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag create newsletter um das Erfassungsformular
 * für ein neuen Kunden zu realisieren
 */
@Component({
    selector: 'hs-create-newsletter',
    templateUrl: './create-newsletter.component.html',
})
export class CreateNewsletterComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly newsletter = new FormControl(false);

    ngOnInit() {
        log.debug('CreateNewsletterComponent.ngOnInit');
        this.createForm.addControl('newsletter', this.newsletter);
    }
}
