export default {
    name: 'b-form-field',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        hasError: Boolean,
        errorMessages: [String, Array]
    },
    methods: {
        renderErrorMessage(createElement) {
            const messages = this.errorMessages
            if (!messages) return []

            const errorProperties = {
                attrs: {
                    class: 'form-group__message validation_message'
                }
            }

            if (typeof messages === 'string') {
                return createElement('span', errorProperties, messages)
            } else {
                return this.errorMessages.map(message => {
                    return createElement('span', errorProperties, message)
                })
            }
        }
    },
    render(createElement) {
        const wrapperProperties = {
            class: {
                'error': this.hasError
            }
        }
        return createElement(
            this.tag,
            wrapperProperties,
            [
                this.$slots.default,
                this.renderErrorMessage(createElement)
            ]
        )
    }
}
