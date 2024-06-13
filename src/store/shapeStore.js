import { defineStore } from 'pinia'
import { formatTimestamp, } from '../utils.js'
import Shape from "../model/shape.js";
import shapeService from "../services.js"

export const useShapeStore = defineStore('shapes', {
    state: () => ({
        shapes: [],
        showData: true,
        pollingId: null,
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
        },
        //start ajax request
        startPolling() {
            if (!this.pollingId) {
                this.pollingId = setInterval(() => {
                    shapeService.getShapes(shapes => {
                        this.setShapes(shapes);
                    }, 3000);
                }, 3000);
            }
        },
        //stop ajax request
        stopPolling() {

            clearInterval(this.pollingId);
            this.pollingId = null;

        },
    }
})
