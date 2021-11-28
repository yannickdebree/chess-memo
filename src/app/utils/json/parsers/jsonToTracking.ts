import { Case, Column, Row, Tracking, TrackingData } from '@_domain';
import { TrackingJSON } from '../types';

export function jsonToTracking(json: TrackingJSON) {
    const tracking = new Tracking();

    const { date, data } = json;

    tracking.setDate(new Date(date));

    const parsedData = data.map((trackingDataJSON) => {
        const { case: { column: { letter }, row: { index } }, success } = trackingDataJSON;
        const column = new Column(letter);
        const row = new Row(index);
        const _case = new Case(column, row);
        return new TrackingData(_case, success);
    });

    tracking.registerData(...parsedData);

    return tracking;
}