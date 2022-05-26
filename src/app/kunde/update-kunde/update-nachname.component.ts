import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente für das Tag hs update nachname
 */
@Component({
    selector: 'hs-update-nachname',
    templateUrl: './update-nachname.component.html',
})
export class UpdateNachnameComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    nachname!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateNachnameComponent.ngOnInit: cuttentValue=',
            this.currentValue,
        );
        this.nachname = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateNachnameComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.updateForm.addControl('nachname', this.nachname);
    }
}
