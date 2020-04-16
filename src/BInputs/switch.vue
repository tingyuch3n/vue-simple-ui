<template>
    <div v-if="show">
        <label class="gfield_label">{{ label }}</label>
        <div class="ginput_container">
            <div class="checkboxSwitch">
                <div class="ginput_container">
                    <input type="checkbox"
                           :id="id"
                           :value="value"
                           :checked="value"
                           @change="updateValue($event.target.checked)" />
                    <div class="slider"></div>
                    <label class="gfield_label" :for="id"></label>

                    <span class="form-group__message validation_message" v-if="isRequired">{{ requiredAlertMessage }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import base from '../mixins';

    export default {
        name: 'b-switch',
        mixins: [base],
        data() {
            return {
            }
        },
        props: {
            id: String
        },
        methods: {
            updateValue(value) {
                this.$emit('input', value);
            }
        },
        validations() {
            if (this.$attrs.required) {
                return {
                    value: {
                        required
                    }
                }
            }
        }
    }
</script>
