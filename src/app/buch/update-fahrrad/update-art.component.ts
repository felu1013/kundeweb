import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup, Validators } from '@angular/forms';
import { type FahrradArt } from '../shared/fahrrad';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-art</code>
 */
@Component({
    selector: 'hs-update-art',
    templateUrl: './update-art.component.html',
})
export class UpdateArtComponent implements OnInit {
    // <hs-update-art [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue!: FahrradArt;

    art!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateArtComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.art = new FormControl(this.currentValue, Validators.required);
        this.updateForm.addControl('art', this.art);
    }
}
