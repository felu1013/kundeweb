import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag create geschlecht um das Erfassungsformular
 * für ein neuen Kunden zu realisieren
 */
@Component({
    selector: 'hs-create-geschlecht',
    templateUrl: './create-geschlecht.component.html',
})
export class CreateGeschlechtComponent implements OnInit {
    @Input()
    createForm!: FormGroup;

    readonly geschlecht = new FormControl('W');

    ngOnInit() {
        log.debug('CreateGeschlechtComponent.ngOnInit');
        this.createForm.addControl('geschlecht', this.geschlecht);
    }
}
