import { Coordinate } from './Coordinate';

export class Matrix {
    coordinates: [Coordinate, number][];

    getCoordinates(): [Coordinate, number][] {
        if (this.coordinates == null) {
            this.coordinates = [];
        }
        return this.coordinates;
    }

    addCoordinate(coor: Coordinate, value: number) {
        if (this.coordinates == null) {
            this.coordinates = [];
        }

        this.coordinates.push([coor, value]);

    }
}