import Select from '@/BSelect/BSelect'

const components = [
    Select
]

const BSelect = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BSelect
