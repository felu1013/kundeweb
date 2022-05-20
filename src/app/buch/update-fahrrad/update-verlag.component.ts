import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import { type Marke } from '../shared/fahrrad';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-marke</code>
 */
@Component({
    selector: 'hs-update-marke',
    templateUrl: './update-marke.component.html',
})
export class UpdateMarkeComponent implements OnInit {
    // <hs-update-marke [updateStammdatenform]="updateStammdatenform" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: Marke | '' | undefined;

    marke!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateMarkeComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.marke = new FormControl(this.currentValue);
        this.updateForm.addControl('marke', this.marke);
    }
}
