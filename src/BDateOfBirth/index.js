import DateOfBirth from './BDateOfBirth'

const components = [
    DateOfBirth
]

const BDateOfBirth = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BDateOfBirth
