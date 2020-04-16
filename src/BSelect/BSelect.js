import base from '@/mixins'

function getInputs (self) {
    const listeners = Object.assign({}, self.$listeners)

    function onInput(e) {
        self.updateValue(e.target.value)
    }

    function onChange(e) {
        self.updateValue(e.target.value)
    }

    return Object.assign(listeners, {
        input: onInput,
        change: onChange
    })
}

export default {
    name: 'b-select',
    props: {
        options: {
            type: Array
        }
    },
    mixins: [ base ],
    methods: {
        renderSelect(createElement) {
            return createElement('div', {
                    attrs: {
                        class: 'ginput_container'
                    }
                },
                [
                    this.renderLabel(createElement),
                    createElement('select', {
                        attrs: {
                            id: this.$attrs.id
                        },
                        domProps: {
                            value: this.value
                        },
                        on: getInputs(this)
                    }, this.$slots.default)
                ]
            )
        }
    },
    render(createElement) {
        return createElement('div', {
            class: ['field']
        }, [
            this.renderSelect(createElement)
        ])
    }
}
