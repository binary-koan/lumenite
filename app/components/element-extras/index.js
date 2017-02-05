import Label from './label'
import ListBox from './list-box'
import ListBoxItem from './list-box-item'
import MultiInput from './multi-input'

export default function ElementExtras(Vue) {
  [Label, ListBox, ListBoxItem, MultiInput].forEach(c => Vue.component(c.name, c))
}
