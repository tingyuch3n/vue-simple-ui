<template>
    <div>
        <el-dialog id="cropperModal"
                   class="modal-large"
                   width="90%"
                   title="Image Crop"
                   :visible.sync="popup"
                    @opened="opened">
            <div id="cropper"></div>
            <div slot="footer">
                <button class="btn" @click="crop()">Confirm</button>
                <button class="btn btn-default" @click="cancel">Cancel</button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
    @import '../../node_modules/croppie/croppie.css'
</style>

<script>
    import Dialog  from 'element-ui/lib/dialog'
    import croppie from 'croppie'

    export default {
        name: 'Crop',
        data () {
            return {
                cropper: null,
                croppedImage: '',
                uploadedImage: null,
                modalOpen: false
            }
        },
        props: {
            viewport: {
                type: Object
            },
            boundary: {
                type: Object
            },
            to: {
                type: String,
                default: '/../web/uploads/images/'
            },
            autoUpload: {
                type: Boolean,
                default: true
            },
            fileSrc: String,
            file: File,
            popup: Boolean
        },
        components: {
            'el-dialog': Dialog
        },
        methods: {
            opened () {
                this.imageCropper(this.fileSrc)
            },
            imageCropper (fileSrc) {
                // Destroy previous croppie instance and remove it from the DOM
                if (this.cropper !== null) {
                    this.cropper.destroy()
                }

                let vEl = document.getElementById('cropper')
                this.cropper = new Croppie(vEl, {
                    viewport: {
                        width: this.viewport.width,
                        height: this.viewport.height
                    },
                    boundary: {
                        width: this.boundary.width,
                        height: this.boundary.height
                    },
                    showZoomer: true,
                    enableResize: false,
                    enableOrientation: true
                })

                this.cropper.bind({
                    url: fileSrc,
                    zoom: 0
                })
            },
            crop () {
                // Enable spinning loading here
                this.cropper.result({
                    type: 'base64',
                    size: 'viewport',
                    circle: false
                }).then((res) => {
                    this.cropped(res)
                })
            },
            cropped (croppedImage) {
                this.$emit('getCroppedImage', croppedImage, this.file)
            },
            cancel () {
                this.$emit('cancel', true)
            }
        }
    }
</script>
