import CheckBox from './BCheckbox'

const components = [
    CheckBox
]

const BCheckbox = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BCheckbox
