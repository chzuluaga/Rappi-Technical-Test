export class Coordinate {
    x: number;
    y: number;
    z: number;

    isEqual(coor: Coordinate): boolean {
        return this.x == coor.x && this.y == coor.y && this.z == coor.z
    }
}