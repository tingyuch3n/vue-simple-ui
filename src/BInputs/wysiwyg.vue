<template>
    <li class="gfield col-xs-12" :class="{ 'error': showErrorClass()}" v-if="show">
        <label class="gfield_label col-sm-3">{{ label }}</label>
        <div class="ginput_container">
            <froala :tag="'textarea'"
                    :config="setConfig"
                    v-model="bindingValue"
                    @input="updateValue"
                    @focus="removeError" />

            <span class="form-group__message validation_message" v-if="isRequired">{{ requiredAlertMessage }}</span>

            <p class="help">{{ helperText }}</p>
        </div>
    </li>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import base from '../mixins'

    export default {
        name: 'b-wysiwyg',
        mixins: [base],
        data () {
            return {
                content: '',
                setConfig: {
                    key: '',
                    heightMin: 500,
                    heightMax: 500,
                    toolbarStickyOffset: 50,
                    inlineStyles: {
                        'Big Red': 'font-size: 20px; color: red;',
                        'Medium Green': 'font-size: 16px; color: green;',
                        'Small Blue': 'font-size: 14px; color: blue;'
                    },
                    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
                        'superscript', '|', 'inlineStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL',
                        'outdent', 'indent', '-', 'insertLink', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll',
                        'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'
                    ]
                }
            }
        },
        props: {
            heightMin: {
                type: Number,
                default: 200
            },
            heightMax: {
                type: Number,
                default: 600
            },
            config: {
                type: Object,
                default: null
            }
        },
        computed: {
            bindingValue: {
                get () {
                    if (this.value !== null || this.value !== undefined) {
                        this.content = this.value
                    } else {
                        this.content = ''
                    }
                    return this.content
                },
                set (value) {
                    this.content = value
                }
            }
        },
        watch: {
            setConfig: {
                handler (data) {
                    if (this.config === null) return data

                    Object.keys(this.config).forEach(key => {
                        data[key] = this.config[key]
                    })
                    return data
                },
                immediate: true
            }
        },
        methods: {
            extend (obj, src) {
                for (var key in src) {
                    if (src.hasOwnProperty(key)) obj[key] = src[key]
                }
                return obj
            },
            updateValue (value) {
                if (this.required) {
                    this.$v.value.$touch()
                }
                this.$emit('input', value)
            },
            removeError (event) {
                this.$emit('removeError', event)
            }
        },
        validations () {
            if (this.required) {
                return {
                    value: {
                        required
                    }
                }
            } else {
                return {
                    value: {
                    }
                }
            }
        }
    }
</script>
