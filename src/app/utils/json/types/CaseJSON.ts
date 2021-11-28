import { ColumnJSON, RowJSON } from ".";

export interface CaseJSON {
    isBlack: boolean;
    column: ColumnJSON;
    row: RowJSON;
}