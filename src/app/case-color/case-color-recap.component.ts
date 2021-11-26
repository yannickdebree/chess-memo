import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Score } from "../domain";

@Component({
    templateUrl: './case-color-recap.component.html'
})
export class CaseColorRecapComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: { score: Score }
    ) { }
}