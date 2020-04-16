<template>
    <li class="gfield col-xs-12" v-if="show">
        <label class="gfield_label col-sm-3">{{ labelName }}</label>
        <div class="ginput_container">
            <ul class="gfield_radio">
                <li v-for="(list, index) in radioGroup" :key="index">
                    <div class="ginput_container">
                        <input type="radio" :id="'radio'+(index+1)"
                               name="radioGroup"
                               :value="list.value"
                               @change="updateValue($event.target.value)" />
                        <label class="gfield_label" :for="'radio'+(index+1)">{{ list.label }}</label>
                    </div>
                </li>
            </ul>
        </div>
        <span class="form-group__message validation_message" v-if="requiredMessage()">{{ errorMessage }}</span>
    </li>

</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import base from '../mixins'

    export default {
        name: 'b-radio-group',
        mixins: [base],
        data () {
            return {
            }
        },
        props: {
            radioGroup: {
                type: Array
            }
        },
        methods: {
            updateValue (value) {
                this.$emit('input', value)
            }
        },
        validations () {
            return {
                value: {
                    required
                }
            }
        }
    }
</script>
