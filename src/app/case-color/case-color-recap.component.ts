import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Tracking } from "../domain";

@Component({
    templateUrl: './case-color-recap.component.html'
})
export class CaseColorRecapComponent {
    success: number;
    fails: number;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        data: { tracking: Tracking }
    ) {
        this.success = data.tracking.getData().filter(d => d.success).length;
        this.fails = data.tracking.getData().filter(d => !d.success).length;
    }
}