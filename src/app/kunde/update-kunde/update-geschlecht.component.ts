import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { type GeschlechtTyp } from '../shared';
import log from 'loglevel';

/**
 * Komponente für das Tag hs update geschlecht
 */
@Component({
    selector: 'hs-update-geschlecht',
    templateUrl: './update-geschlecht.component.html',
})
export class UpdateGeschlechtComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: GeschlechtTyp;

    geschlecht!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateGeschlechtComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.geschlecht = new FormControl(
            this.currentValue,
            Validators.required,
        );
        this.updateForm.addControl('geschlecht', this.geschlecht);
    }
}
