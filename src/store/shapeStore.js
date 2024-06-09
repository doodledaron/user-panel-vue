import { defineStore } from 'pinia'
import { formatTimestamp, extractFileName } from '../utils.js'
import Shape from "../model/shape.js";

export const useShapeStore = defineStore('shapes', {
    state: () => ({
        shapes: [],
        showData: true
    }),
    actions: {
        setShapes(shapes) {
            this.shapes = shapes.map(shape => (Shape.create(shape.timestamp, shape.name, shape.image)))
        },
        addShape(shape) {
            this.shapes.unshift(Shape.create(shape.timestamp, shape.name, shape.image))
        },
        removeShape(shape) {
            this.shapes = this.shapes.filter(
                s => !(s.timestamp === formatTimestamp(shape.timestamp) && s.name === shape.name)
            )
        },
        updateShape(shape) {
            const index = this.shapes.findIndex(
                s => s.timestamp === formatTimestamp(shape.timestamp)
            )
            this.shapes[index] = Shape.create(shape.timestamp, shape.name, shape.image)
        },
        setShowData(value) {
            this.showData = value
        }
    }
})
