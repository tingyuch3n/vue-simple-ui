import inputPatterns from '@/mixins/directives/input-patterns'
import wordcountlimit from '@/mixins/directives/wordcountlimit'

export default {
    props: {
        value: {
            type: [Object, Array, Number, String, Boolean, Event]
        },
        label: {
            type: String
        },
        labelClass: String,
        wordlength: {
            type: Number,
            default: undefined
        },
        show: {
            type: Boolean,
            default: true
        },
        helperText: {
            type: String,
            default: null
        },
        regex: {
            type: RegExp
        }
    },
    methods: {
        updateValue (value) {
            this.$emit('input', value)
        },
        renderLabel (createElement) {
            const labelAttr = {
                attrs: {
                    class: 'gfield_label',
                    for: this.$attrs.id
                }
            }

            if (this.label) {
                return createElement('label', labelAttr, this.label)
            } else {
                return this.$slots.default
            }
        }
    },
    directives: {
        'patterns': inputPatterns,
        'wordcountlimit': wordcountlimit
    }
}
