<template>
    <div v-if="show">
        <label class="gfield_label" v-if="label !== undefined">{{ label }}</label>
        <div class="ginput_container">
            <ul class="gfield_checkbox">
                <li v-for="(list, index) in checkboxGroup" :key="index">
                    <div class="ginput_container">
                        <input type="checkbox"
                               :id="checkBoxId(index)"
                               :value="list.value"
                               v-model='selectedItems'
                               @change="updateValue"/>
                        <label class="gfield_label" :for="checkBoxId(index)">{{ list.label }}</label>
                    </div>

                    <p class="help" v-if="list.helpText">{{list.helpText}}</p>

                    <!-- slots are rendered based on different names -->
                    <slot :name="list.value.name" :fieldName="list.value.name" :fieldValue="list.value"></slot>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import base from '../mixins';

    export default {
        name: 'b-checkbox-group',
        mixins: [base],
        data() {
            return {
                selectedItems: this.value || []
            }
        },
        props: {
            index: Number,
            checkboxGroup: {
                type: Array
            },
            requiredAlertMessage: {
                type: String,
                default: 'The field is required'
            }
        },
        methods: {
            checkBoxId (index) {
                return `checkbox_${this._uid}_${index + 1}`
            },
            updateValue() {
                this.$emit('input', this.selectedItems);
            }
        },
        validations() {
            return {
                value: {
                    required
                }
            }
        }
    }
</script>
