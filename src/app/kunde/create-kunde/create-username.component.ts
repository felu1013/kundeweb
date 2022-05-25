import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente mit dem Tag create Username um das Erfassungsformular
 * für ein neuen Kunden zu realisieren
 */
@Component({
    selector: 'hs-create-username',
    templateUrl: './create-username.component.html',
})
export class CreateUsernameComponent implements OnInit {
    private static readonly MIN_LENGTH = 7;

    @Input()
    createForm!: FormGroup;

    readonly username = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(CreateUsernameComponent.MIN_LENGTH),
        Validators.pattern(/^\w/u),
    ]);

    ngOnInit() {
        log.debug('CreateUsernameComponent.ngOnInit');
        this.createForm.addControl('username', this.username);
    }
}
