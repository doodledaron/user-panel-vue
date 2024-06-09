import { defineStore } from 'pinia'
import { formatTimestamp, extractFileName } from '../utils.js'

export const useShapeStore = defineStore('shapes', {
    state: () => ({
        shapes: [],
        showData: true
    }),
    actions: {
        setShapes(shapes) {
            this.shapes = shapes.map(shape => ({
                timestamp: formatTimestamp(shape.timestamp),
                name: shape.name,
                image: extractFileName(shape.image)
            }))
        },
        addShape(shape) {
            const mappedShape = {
                timestamp: formatTimestamp(shape.timestamp),
                name: shape.name,
                image: shape.image
            }
            this.shapes.unshift(mappedShape)
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
            const mappedShape = {
                timestamp: formatTimestamp(shape.timestamp),
                name: shape.name,
                image: shape.image
            }
            this.shapes[index] = mappedShape
        },
        setShowData(value) {
            this.showData = value
        }
    }
})
