import AddressFinderInput from './AddressFinderInput.vue'

const components = [
    AddressFinderInput
]

const boltAddressFinder = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default boltAddressFinder
