import { Coordinate } from './Coordinate';

export class Query {
    type: string;
    coordinates: Coordinate[];
    valueToChange: number;

    addCoordinate(coor: Coordinate) {
        if(!this.coordinates)
            this.coordinates = [];
        this.coordinates.push(coor);
    }

    updateValue(value: number) {
        this.valueToChange = value;
    }
}