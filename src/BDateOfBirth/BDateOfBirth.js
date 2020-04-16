/**
 * Directives
 */
import tabIndex from "@/mixins/directives/tabindex"
import inputPatterns from "@/mixins/directives/input-patterns"

function getInput (self) {
    const listeners = Object.assign({}, self.$listeners)

    function addPrefix(num, length) {
        return (Array(length).join("0") + num).slice(-length)
    }

    function onInput (e) {
        self.birth[e.target.id] = e.target.value
        let dob = `${self.birth['year']}-${self.birth['month']}-${self.birth['day']}`

        if (self.birth['year'] === '' && self.birth['month'] === '' && self.birth['day'] === '') {
            dob = ''
        }

        self.$emit('input', dob)
    }

    function onFocus(e) {
        self.$emit('focus', e)
    }

    function onBlur (e) {
        let id = e.target.id
        let rawVal = parseInt(e.target.value);

        if (!isNaN(rawVal)) {
            if (id !== 'year') {
                e.target.value = addPrefix(rawVal, 2)
                self.birth[id] = addPrefix(rawVal, 2)
            }
        }
        self.$emit('blur', e)
    }

    return Object.assign(listeners, {
        blur: onBlur,
        input: onInput,
        focus: onFocus,
    })
}

export default {
    name: "b-dateofbirth",
    props: {
        placeholder: String,
        label: {
            type: String
        },
        value: {
            type: [Object, Array, Number, String, Boolean]
        }
    },
    data () {
        return {
            birth: {
                day: '',
                month: '',
                year: ''
            }
        }
    },
    methods: {
        split(val) {
            return val.split("/")
        },
        renderInput () {
            const createElement = this.$createElement
            const placeholder = this.split(this.placeholder)

            const dates = [
                {label: 'Day', value: 'day', placeholder: placeholder[0]},
                {label: 'Month', value: 'month', placeholder: placeholder[1]},
                {label: 'Year', value: 'year', placeholder: placeholder[2]}
            ]

            const property = (data, index) => {
                return {
                    attrs: {
                        id: data.value,
                        type: 'tel',
                        placeholder: data.placeholder,
                        tabIndex: index,
                        class: `txt${data.label}`,
                        maxlength: data.value === 'year'?4:2,
                        readonly: this.$attrs.disabled,
                        disabled: this.$attrs.disabled,
                        value: this.birth[data.value]
                    },
                    domProps: {
                        value: this.birth[data.value]
                    },
                    on: getInput(this),
                    directives: [
                        {
                            name: 'tabindex'
                        },
                        {
                            name: 'patterns',
                            value: /[^0-9]/g
                        }
                    ]
                }
            }

            return dates.map((data, index) => {
                if (data.value !== 'year') {
                    return [
                        createElement('input', property(data, (index + 1))),
                        createElement('span', {class: ['splash']}, '/')
                    ]
                } else {
                    return createElement('input', property(data, (index + 1)))
                }

            })

        }
    },
    directives: {
        'tabindex' :tabIndex,
        'patterns': inputPatterns
    },
    render (createdElement) {
        return createdElement('div', {
            class: ['ginput_container']
        }, this.renderInput())
    }
}
