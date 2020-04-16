import Input from './BInput.js'

const components = [
    Input
]

const BInput = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BInput
