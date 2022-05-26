import { Component, Input, type OnInit } from '@angular/core';
import { FormControl, type FormGroup } from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente für das Tag hs update kategorie
 */
@Component({
    selector: 'hs-update-kategorie',
    templateUrl: './update-kategorie.component.html',
})
export class UpdateKategorieComponent implements OnInit {
    @Input()
    updateForm!: FormGroup;

    @Input()
    currentValue: number | undefined;

    kategorie!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateKategorieComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        this.kategorie = new FormControl(this.currentValue);
        this.updateForm.addControl('kategorie', this.kategorie);
    }
}
