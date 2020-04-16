<template>
    <div id="app" class="demo">
        <div class="gform_wrapper">
            <form @submit.prevent="onSubmit" enctype="multipart/form-data" novalidate>
                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.firstname.$error"
                              error-messages="Please enter your first name">
                    <b-input type="text"
                                ref="firstName"
                                id="txtFirstName"
                                label="First Name*"
                                placeholder="First Name*"
                                :regex="/[a-zA-Z\s'-]/"
                                v-model="$v.form.firstname.$model">
                    </b-input>
                </b-form-field>

                <b-form-field>
                    <b-input type="text"
                             id="txtLastName"
                             label="Last Name"
                             placeholder="Last Name"
                             v-model="form.lastname">
                    </b-input>
                </b-form-field>

                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.email.$error"
                              error-messages="Please enter your email">
                    <b-input type="email"
                                ref="email"
                                id="txtEmail"
                                label="Email"
                                placeholder="Email"
                                v-model="$v.form.email.$model">
                    </b-input>
                </b-form-field>

                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.birth.$error"
                              error-messages="Please enter your date of birth">
                    <b-dateofbirth placeholder="DD/MM/YYYY"
                                   label="Date of Birth"
                                   v-model="$v.form.birth.$model">

                    </b-dateofbirth>
                </b-form-field>

                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.state.$error"
                              error-messages="Please select your state">
                    <b-select label="State"
                              v-model="form.state">
                        <option value="">Please select a state</option>
                        <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
                    </b-select>
                </b-form-field>

                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.mobile.$error"
                              error-messages="Please enter your mobile number">
                    <b-input type="tel"
                             ref="tel"
                             id="txtTel"
                             label="Phone"
                             placeholder="phone"
                             :regex="/[0-9]/"
                             v-model="$v.form.mobile.$model">
                    </b-input>
                </b-form-field>

                <b-form-field>
                    <b-input type="textarea"
                             id="txtEntry"
                             label="Entry*"
                             :row="10"
                             :col="10"
                             :wordlength="25"
                             v-model="form.message">
                    </b-input>
                </b-form-field>

                <hr/>

<!--                <b-form-field>-->
<!--                    <b-uploader :dropzone-options="uploader.options"-->
<!--                                type="cropper"-->
<!--                                @fileSending="fileSending"-->
<!--                                @getCroppedImage="uploadCroppedImage"-->
<!--                                @remove="remove">-->
<!--                        <div slot="Top">-->
<!--                            <img v-if="fileSrc" :src="fileSrc"/>-->
<!--                        </div>-->
<!--                    </b-uploader>-->
<!--                </b-form-field>-->

                <hr/>

                <b-form-field tag="li"
                              class="gfield col-xs-12"
                              :has-error="$v.form.optIn.$error"
                              error-messages="Opt In must tick">
                    <b-checkbox id="chkOptIn"
                                label-class="test"
                                v-model="$v.form.optIn.$model">
                        <label for="chkOptIn" slot="bottom">I wish to receive offers and information from Crafters Union</label>
                    </b-checkbox>
                </b-form-field>
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
</template>

<script>
    import { required, sameAs } from 'vuelidate/lib/validators';
    import { isOverAge, isValid } from '@/mixins/form-validation';

    export default {
        name: 'App',
        data () {
            return {
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    birth: '',
                    dob: '',
                    state: 'NSW',
                    mobile: 0,
                    message: '',
                    optIn: false
                },
                uploader: {
                  options: {
                      url: `${process.env.VUE_APP_API_ROOT}/file/upload`,
                      header: null,
                      thumbnailWidth: 300,
                      addRemoveLinks: true,
                      createImageThumbnails: false,
                      autoProcessQueue: true,
                      maxFilesize: 5,
                      dictDefaultMessage: 'Upload image',
                      previewTemplate: `<div class="dz-details">
                                        <div class="dz-filename"><span data-dz-name></span></div>
                                      </div>
                                      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                                      <div class="dz-error-message"><span data-dz-errormessage></span></div>`
                  }
                },
                options: [
                    { label: 'NSW', value: 'NSW' },
                    { label: 'VIC', value: 'VIC' },
                    { label: 'QLD', value: 'QLD' }
                ],
                fileSrc: '',
                submitting: false
            }
        },
        methods: {
            onSubmit () {
                this.$v.$touch()
            },
            fileSending (file, xhr, formData) {
                formData.append('competitionId', 'ba7a3109-3b0d-11e9-ad89-080027f0d6cc')
                formData.append('file', file)
            },
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
            },
            async uploadCroppedImage (croppedImage, file) {
                this.fileSrc = croppedImage

                // todo: upload cropped image here
            },
            remove (value) {
                if (value) {
                    this.fileSrc = null
                }
            }
        },
        validations: {
            form: {
                firstname: {
                    required
                },
                email: {
                    required
                },
                mobile: {
                    required
                },
                birth: {
                    required,
                    isOverAge,
                    isValid
                },
                state: {
                    required
                },
                optIn: {
                    sameAs: sameAs( () => true )
                }
            }
        }
    }
</script>

<style lang="less">

    @import "./assets/less/helpers/fonts.less";
    @import './assets/less/helpers/variables.less';
    @import './assets/less/helpers/mixins.less';
    @import "./assets/less/vendor/ionicons.less";

    @import './assets/less/modules/base.less';
    @import './assets/less/modules/forms.less';

    .demo {
        .gform_wrapper {
            width: 50%;
        }
        .ginput_container {
            clear: both;
            margin-bottom: 15px;
        }
        .dob{
            label.gfield_label{
                display: block;
            }
            input.dobField {
                float: left;
                width: 30%;
            }
        }

        .error .validation_message {
            display: block;
        }
        .validation_message {
            display: none;
        }
    }

</style>
