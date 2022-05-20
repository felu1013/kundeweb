import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-modell</code>
 */
@Component({
    selector: 'hs-update-modell',
    templateUrl: './update-modell.component.html',
})
export class UpdateModellComponent implements OnInit {
    private static readonly MIN_LENGTH = 2;

    // <hs-update-modell [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: string;

    modell!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateModellComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.modell = new FormControl(this.currentValue, [
            Validators.required,
            Validators.minLength(UpdateModellComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.updateForm.addControl('modell', this.modell);
    }
}
