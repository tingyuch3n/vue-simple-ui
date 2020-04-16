<template>
    <div id="app">
        <bolt-uplaoder
                label-name="Bolt-Uploader label"
                helper-text="Bolt-Uploader helper text"
                :modal="false"
                type="cropper"
                :dropzone-options="uploaderOptions"/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        margin-top: 60px
    }
    .upload-file {
        position: relative
        z-index: 1
        width: 200px
    }
    .upload-file .dropzone {
        height: 36px
        min-height: 0
        line-height: 50px
        padding: 0 15px
        color: #333333
        border: solid 1px #CCCCCC
        border-radius: 3px
    }
    .dropzone.dz-clickable {
        cursor: pointer
    }
    .help, .help-block {
        font-size: 12px
        margin: 5px 0 0 0
        color: #666666
    }
    @media only screen and (min-width: 768px){
        ul.gform_fields li.gfield > label, ul.gform_fields li.gfield .datePickerWrapper > label {
            width: 200px
            padding-top: 8px
            padding-right: 20px
            text-align: right
        }
    }
    .dz-filename span {
        display: block
        margin-top: -2px
    }
    .upload-file .dropzone .dz-message {
        text-align: left
        padding: 0 15px
        font-weight: normal
    }
    .dropzoneInline .dropzone .dz-message {
        width: 100%
        margin: 0
        top: 50%
        left: 0
        position: absolute
        -webkit-transform: translate(0, -50%)
        transform: translate(0, -50%)
    }
    .dropzone.dz-started .dz-message {
        display: none
    }
    .dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
        cursor: pointer
    }
</style>

<script>
    import uploader from './Uploader'

    export default {
        data() {
            return {
                uploaderOptions: {
                    url: 'https://api.cloudinary.com/v1_1/ting/image/upload',
                    thumbnailWidth: 150,
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    uploadMultiple: true,
                    createImageThumbnails: false,
                    maxFilesize: 10,
                    dictRemoveFile: '',
                    dictDefaultMessage: "Select image",
                    previewTemplate: `<div class="dz-preview dz-file-preview">
                                          <div class="dz-image"><IMG data-dz-thumbnail=""></div>
                                          <div class="dz-details">
                                            <div class="dz-filename"><span data-dz-name></span></div>

                                          </div>
                                          <div class="dz-progress"><span class="dz-upload"></span></div>
                                          <div class="dz-success-mark">
                                              <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                                                <title>Check</title>
                                                <desc>Created with Sketch.</desc>
                                                <defs></defs>
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                                    <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>
                                                </g>
                                              </svg>
                                          </div>
                                          <div class="dz-error-mark">
                                              <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                                                  <title>error</title>
                                                  <desc>Created with Sketch.</desc>
                                                  <defs></defs>
                                                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                                                      <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">
                                                          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>
                                                      </g>
                                                  </g>
                                              </svg>
                                          </div>
                                          <div class="dz-error-message"><span data-dz-errormessage></span></div>
                                        </div>`
                }
            }
        },
        name: 'app',
        components: {
            'bolt-uplaoder': uploader
        }
    }
</script>
