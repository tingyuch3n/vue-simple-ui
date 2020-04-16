import CheckBox from '../BCheckbox/BCheckbox'
import CheckBoxGroup from './checkbox-group'
import Radio from './radio-group'
import Select from './select'
import RichEditor from './wysiwyg'

const components = [
    CheckBox,
    CheckBoxGroup,
    Radio,
    Select,
    RichEditor
]

const BComponents = {
    install: function (Vue) {
        components.map(component => {
            Vue.component(component.name, component)
        })
    }
}

export default BComponents
