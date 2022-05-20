import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r das Tag <code>hs-update-gewicht</code>
 */
@Component({
    selector: 'hs-update-gewicht',
    templateUrl: './update-gewicht.component.html',
})
export class UpdateGewichtComponent implements OnInit {
    // <hs-update-gewicht [form]="form" [currentValue]="...">
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: number | undefined;

    gewicht!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateGewichtComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.gewicht = new FormControl(this.currentValue);
        this.updateForm.addControl('gewicht', this.gewicht);
    }
}
