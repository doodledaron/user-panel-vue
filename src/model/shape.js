import { formatTimestamp, extractFileName } from '../utils.js';

export default class Shape {
    constructor(timestamp, name, image) {
        this.timestamp = formatTimestamp(timestamp);
        this.name = name;
        this.image = extractFileName(image);
    }

    static create(timestamp, name, image) {
        return new Shape(timestamp, name, image);
    }
}