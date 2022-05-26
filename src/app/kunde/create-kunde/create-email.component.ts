import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag create email um das Erfassungsformular
 * für ein neuen Kunden zu realisieren
 */
@Component({
    selector: 'hs-create-email',
    templateUrl: './create-email.component.html',
})
export class CreateEmailComponent implements OnInit {
    private static readonly MIN_LENGTH = 7;

    @Input()
    createForm!: FormGroup;

    readonly email = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateEmailComponent.MIN_LENGTH),
        Validators.pattern(/[^@]+@[^.]+\..+/u),
    ]);

    ngOnInit() {
        log.debug('CreateEmailComponent.ngOnInit');
        this.createForm.addControl('email', this.email);
    }
}
