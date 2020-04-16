import base from '@/mixins'

function getInputs (self) {
    const listeners = Object.assign({}, self.$listeners)

    function onChange(e) {
        self.updateValue(e.target.checked)
    }

    return Object.assign(listeners, {
        change: onChange
    })
}

export default {
    name: 'b-checkbox',
    mixins: [ base ],
    inheritAttrs: false,
    methods: {
        renderCheckbox(createElement) {
            return createElement('div', {
                    attrs: {
                        class: ['ginput_container']
                    }
                },
                [
                    this.renderLabel(createElement),
                    createElement('input', {
                        attrs: {
                            type: 'checkbox',
                            id: this.$attrs.id,
                            value: this.value
                        },
                        domProps: {
                          value: this.value
                        },
                        on: getInputs(this)
                    }),
                    this.$slots.bottom
                ]
            )
        }
    },
    render (createElement) {
        return createElement('div', {
            attrs: {
                class: ['field']
            }
        }, [
            this.renderCheckbox(createElement)
        ])
    }
}
