import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag create adresse um das Erfassungsformular
 * für ein neuen Kunden zu realisieren
 */
@Component({
    selector: 'hs-create-adresse',
    templateUrl: './create-adresse.component.html',
})
export class CreateAdresseComponent implements OnInit {
    private static readonly MIN_LENGTH = 12;

    @Input()
    createForm!: FormGroup;

    readonly adresse = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateAdresseComponent.MIN_LENGTH),
        Validators.pattern(/^\w/u),
    ]);

    ngOnInit() {
        log.debug('CreateAdresseComponent.ngOnInit');
        this.createForm.addControl('adresse', this.adresse);
    }
}
