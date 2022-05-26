import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente für das Tag hs update email
 */
@Component({
    selector: 'hs-update-email',
    templateUrl: './update-email.component.html',
})
export class UpdateEmailComponent implements OnInit {
    private static readonly MIN_LENGTH = 5;

    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    email!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateEmailComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.email = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateEmailComponent.MIN_LENGTH),
            Validators.pattern(/[^@]+@[^.]+\..+/u),
        ]);
        this.updateForm.addControl('email', this.email);
    }
}
