"use strict"

import EXIF from 'exif-js'
let filetype = ''
let orientation = ''

class imageResizer {

    constructor (input, width, height, quality) {
        this.file = input
        this.canvaswidth = width
        this.canvasheight = height
        this.quality = quality
    }

    encode () {
        filetype = this.file.type
        orientation = ''

        let reader = new FileReader()
        EXIF.getData(this.file, function () {
            orientation = EXIF.getTag(this, 'Orientation')
        })

        return new Promise((resolve, reject) => {
            reader.readAsDataURL(this.file)
            reader.onload = function(e) {
                resolve(e.target.result)
            }
        })
    }

    decode (dataUrl) {
        let meta = dataUrl.split('')[0]
        let type = meta.split(':')[1]
        let binary = atob(dataUrl.split(',')[1])
        let unitarr = new Uint8Array(binary.length)
        for (let i = 0 i < binary.length i++) {
            unitarr[i] = binary.charCodeAt(i)
        }

        return new Promise((resolve, reject) => {
            resolve(new Blob([unitarr], {type: type}))
        })
    }

    createImage(source) {
        let image = new Image()

        return new Promise((resolve, reject) => {
            image.onload = function (e) {
                resolve(e.target)
            }
            image.src = source
        })
    }

    generateBase64String(img) {
        let x
        let y
        let widthOrig = img.width
        let heightOrig = img.height
        let width = this.canvaswidth
        let height = this.canvasheight
        let ratio
        let TO_RADIANS = Math.PI/180
        let MAX_WIDTH = widthOrig > width ? width : widthOrig
        let MAX_HEIGHT = height
        let canvas = this.createCanvas({widthOrig: MAX_WIDTH})


        if (widthOrig > heightOrig) {
            if (widthOrig > MAX_WIDTH) {
                height = heightOrig * (MAX_WIDTH / widthOrig )
                width = MAX_WIDTH
            }
        } else {
            if (heightOrig > MAX_HEIGHT) {
                width = widthOrig * (MAX_HEIGHT / heightOrig)
                height = MAX_HEIGHT
            } else {
                width = widthOrig
                height = heightOrig
            }
        }
        canvas.width = width
        canvas.height = height

        let context = canvas.getContext("2d")

        if(typeof orientation !== "undefined"){
            if(orientation === 1){
                if(navigator.userAgent.match(/(iPad|iPhone).*CPU.*OS 7_\d/i)){
                    context.drawImage(img, 0, 0, widthOrig / 2, heightOrig / 2, 0, 0, width, height)
                }else{
                    context.drawImage(img, 0, 0, widthOrig, heightOrig, 0, 0, width, height)
                }

            }else if(orientation === 3){
                context.transform(-1, 0, 0, -1, width, height) // 180 degree

                if(navigator.userAgent.match(/(iPad|iPhone).*CPU.*OS 7_\d/i)){
                    context.drawImage(img, 0, 0, widthOrig, heightOrig, 0, 0, width, height) // 180 degree
                }else {
                    context.drawImage(img, 0, 0, widthOrig, heightOrig, 0, 0, width, height) // 180 degree
                }
            }else if(orientation === 6){

                canvas.width = img.height / 4
                canvas.height = img.width / 4

                x = canvas.width
                y = canvas.height
                width = img.width / 4
                height = img.height / 4

                context.translate(x, y)
                context.rotate(90 * TO_RADIANS)

                if(navigator.userAgent.match(/(iPad|iPhone).*CPU.*OS 7_\d/i)){
                    context.drawImage(img, 0, 0, img.width / 2, img.height / 2, -width, 0, y, x)
                }else{
                    context.drawImage(img, -width, 0, y, x)
                }

                context.translate(-x, -y)
                context.rotate(-90 * TO_RADIANS)

            }else if(orientation === 8){

                canvas.width = img.height / 4
                canvas.height = img.width / 4

                x = canvas.width
                y = canvas.height
                width = img.width / 4
                height = img.height / 4

                context.translate(x, y)
                context.rotate(-90 * TO_RADIANS)
                if(navigator.userAgent.match(/(iPad|iPhone).*CPU.*OS 7_\d/i)){
                    context.drawImage(img, 0, 0, img.width / 2, img.height / 2, 0, -height, y, x)
                }else{
                    context.drawImage(img, 0, -height, y, x)
                }

            }
        }else{
            context.drawImage(img, 0, 0, widthOrig, heightOrig, 0, 0, width, height)
        }

        let dataurl = canvas.toDataURL(filetype, this.quality / 100)
        return dataurl
        this.removeElement(canvas)
    }

    createCanvas (data) {
        let canvas = document.createElement('canvas')
        canvas.width = data.width
        canvas.height = data.height
        canvas.style.display = 'none'
        document.body.appendChild(canvas)
        return canvas
    }

    removeElement (el) {
        el.parentElement.removeChild(el)
    }
}

export default imageResizer