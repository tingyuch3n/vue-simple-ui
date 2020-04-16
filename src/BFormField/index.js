import FormField from './BFormField'

const components = [
    FormField
]

const BFormField = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BFormField
