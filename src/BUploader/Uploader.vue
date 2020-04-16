<template>
    <div>
        <label class="gfield_label" :for="id">{{ label }}</label>
        <div class="ginput_container">
            <div class="upload-file">
                <slot name="Top" :fileSrc="fileObj"></slot>
                <vue-dropzone
                        ref="boltUploader"
                        :id="id"
                        :options="options"
                        @vdropzone-file-added="fileAdded"
                        @vdropzone-sending="fileSending"
                        @vdropzone-upload-progress="fileUploadProgress"
                        @vdropzone-success="fileSuccess"
                        @vdropzone-complete="fileComplete"
                        @vdropzone-removed-file="fileRemoved"/>

                <el-progress v-if="uploadingProgress !== 0"
                             :percentage="uploadingProgress"
                             :show-text="false"
                             color="rgba(222, 217, 232, 0.7)" />

                <slot name="Bottom" :fileSrc="fileObj"></slot>
            </div>
            <p class="help" v-if="helperText">{{ helperText }}</p>

            <!-- Cropper -->
            <div id="cropperWrapper" v-if="type === 'cropper'">
                <Crop :boundary="boundary"
                      :viewport="viewport"
                      :popup="OpenCropper"
                      :file-src="fileSrc"
                      :file="originalFile"
                      @getCroppedImage="getCroppedImage"
                      @cancel="cancel"/>
            </div>
        </div>
    </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone'
    import Crop from './Cropper'

    export default {
        name: 'b-uploader',
        props: {
            id: {
                type: String,
                default: 'uploader'
            },
            label: {
                type: String,
                default: ''
            },
            value: {
                type: [Number, String]
            },
            type: {
                type: String,
                default: 'general'
            },
            to: {
                type: String,
                default: '/../web/uploads/images/'
            },
            helperText: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: null
            },
            thumbnailPreview: {
                type: Boolean,
                default: true
            },
            dropzoneOptions: {
                type: Object,
                default: null
            },

            /**
             *  Cropper props
             */
            viewport: {
                type: Object,
                default () {
                    return {
                        width: 280,
                        height: 280
                    }
                }

            },
            boundary: {
                type: Object,
                default () {
                    return {
                        width: 400,
                        height: 400
                    }
                }
            }
        },
        data () {
            return {
                options: {
                    url: 'localhost',
                    header: null,
                    thumbnailWidth: 300,
                    addRemoveLinks: true,
                    createImageThumbnails: false,
                    autoProcessQueue: true,
                    maxFilesize: 5,
                    dictDefaultMessage: 'Drop files here',
                    previewTemplate: `<div class="dz-details">
                                        <div class="dz-filename"><span data-dz-name></span></div>
                                      </div>
                                      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                      <div class="dz-error-message"><span data-dz-errormessage></span></div>`
                },
                uploadError: false,
                file: null,
                fileType: '',
                originalFile: null,
                uploadingProgress: 0,
                OpenCropper: false
            }
        },
        computed: {
            fileSrc: {
                get () {
                    // Detect if file is blob format
                    if (this.file !== null) {
                        return this.file
                    } else {
                        return this.file || this.value
                    }
                },
                set (value) {
                    this.file = value
                }
            },
            fileObj () {
                return {
                    type: this.fileType,
                    file: this.fileSrc
                }
            }
        },
        watch: {
            options: {
                handler (data) {
                    if (this.dropzoneOptions === null) return data
                    Object.keys(this.dropzoneOptions).forEach(key => {
                        data[key] = this.dropzoneOptions[key]
                    })
                    return data
                },
                immediate: true
            }
        },
        components: {
            Crop,
            vueDropzone: vue2Dropzone
        },
        methods: {
            fileAdded (file) {

            },
            fileSending (file, xhr, formData) {
                this.$emit('fileSending', file, xhr, formData)
            },
            fileUploadProgress (file, progress) {
                this.dzProgress(progress)
            },
            fileSuccess (file, response) {
                let uri = response.uri

                this.fileType = this.getFileType(file)
                this.fileSrc = process.env.VUE_APP_HOST + uri
                this.originalFile = file
                // if file is image & cropper is enabled, calling cropper's methods
                if (this.type === 'cropper' && this.fileType === 'image') {
                    this.OpenCropper = true
                } else {
                    this.$emit('input', this.fileSrc)
                }
            },
            fileError (file, message, xhr) {
                if (xhr.status === 400) {
                    this.uploadError = true
                }
            },
            fileComplete (file) {
                this.resetProgressBar(file)
            },
            fileRemoved () {
                // reset temporary stored file src
                this.fileSrc = null
                this.uploadError = false
                this.$emit('remove', true)
            },
            getFileType (file) {
                // return file mime type
                let fileExtension = file.type.split('/')
                return fileExtension[0]
            },
            dzProgress (progress) {
                // display progress bar
                this.uploadingProgress = progress
            },
            resetProgressBar () {
                // remove progress bar when image uploaded success/fail
                this.uploadingProgress = 0
            },
            getCroppedImage (croppedImage, file) {
                this.fileSrc = null
                this.OpenCropper = false
                this.$emit('getCroppedImage', croppedImage, file)
            },
            cancel () {
                this.fileSrc = null
                this.OpenCropper = false
            }
        }
    }
</script>
