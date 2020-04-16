import base from '@/mixins'
import textAreaProperties from './textarea'

function getInput (self) {
    const listeners = Object.assign({}, self.$listeners)
    // const regex = RegExp('[a-zA-Z \'-]','g')

    function onInput(e) {
        self.updateValue(e.target.value)
    }

    function onFocus(e) {
        self.$emit('focus', e)
    }

    function onBlur (e) {
        self.$emit('blur', e)
    }

    return Object.assign(listeners, {
        blur: onBlur,
        input: onInput,
        focus: onFocus,
    })
}

export default {
    name: 'b-input',
    mixins: [ base ],
    inheritAttrs: false,
    methods: {
        inputProperty () {
            return {
                attrs: this.$attrs,
                domProps: {
                    value: this.value || null
                },
                on: getInput(this),
                directives: [
                    {
                        name: 'patterns',
                        value: this.regex
                    }
                ]
            }
        },
        renderInput (element) {
            const createElement = this.$createElement

            let label

            if (this.label) {
                label = ''
            } else {
                label = this.$slots.label
            }

            return createElement('div', {
                class: {
                    'field': true
                }
            }, [
                this.renderLabel(createElement),
                createElement('div', {
                        attrs: {
                            class: 'ginput_container'
                        }
                    }, [
                        this.$slots.prefix,
                        element,
                        label
                    ]
                )
            ])

        }
    },

    render (createElement) {
        let textareaField,
            inputField;
        const TYPE = this.$attrs.type;

        /**
         * Input attributes
         */
        inputField = this.renderInput(createElement('input', this.inputProperty()))

        /**
         * Textarea attributes
         */
        textareaField = this.renderInput(
            createElement(
                'div',
                [
                    createElement('textarea', textAreaProperties(this)),
                    this.$slots.count
                ]
            )
        )

        if (this.show) {
            switch (TYPE) {
                case 'textarea':
                    return textareaField
                    break
                default:
                    return inputField
            }
        } else {
            return ''
        }
    }
}
