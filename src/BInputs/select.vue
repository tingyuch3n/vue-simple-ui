<template>
    <div class="ginput_container" :class="{ 'error': showErrorClass() }" v-if="show">
        <label class="gfield_label" :class="labelClass" :for="id" v-if="label">{{ label }}</label>
        <div class="select">
            <select :id="id" :value="value" @input="updateValue($event.target.value)">
                <option v-for="option in options" :value="option[optionValue]" :key="option[optionValue]">
                    {{ option[optionLabel] }}
                </option>
            </select>
        </div>
        <span class="form-group__message validation_message" v-if="isRequired">{{ requiredAlertMessage }}</span>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import base from '../mixins'

    export default {
        name: 'b-select',
        mixins: [base],
        data () {
            return {
            }
        },
        props: {
            options: {
                type: Array
            },
            optionLabel: {
                type: String,
                default: 'label'
            },
            optionValue: {
                type: String,
                default: 'value'
            }
        },
        validations () {
            if (this.$attrs.required) {
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
