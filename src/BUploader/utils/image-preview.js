export default {
    name: 'image-preview',
    props: {
        thumbPreview: Boolean,
        classNames: {
            type: String,
            default: 'fileUploadPreview'
        },
        fileSrc: String
    },
    methods: {
        validImage (file) {
            if (file !== null && file !== undefined) {
                return this.fileType(file)
            }
        },
        fileType (file) {
            if (file.indexOf('base64') === -1) {
                let fileExtension = (/[.]/.exec(file)) ? /[^.]+$/.exec(file)[0] : undefined
                if (fileExtension !== undefined) {
                    return fileExtension.toLowerCase() === 'jpeg' ||
                        fileExtension.toLowerCase() === 'jpg' ||
                        fileExtension.toLowerCase() === 'png' ||
                        fileExtension.toLowerCase() === 'gif'
                } else {
                    return false
                }
            } else {
                let meta = file.split('')[0]
                let mimiType = meta.split(':')[1]
                return mimiType.split('/')[0]
            }
        }
    },
    render (h) {
        if (this.thumbPreview && this.validImage(this.fileSrc)) {
            return (
                <div class={this.classNames}>
                    <img src={this.fileSrc}/>
                </div>
            )
        } else {
            return null
        }
    }
}
