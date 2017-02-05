import Label from './label'
import ListBox from './list-box'
import ListBoxItem from './list-box-item'

export default function ElementExtras(Vue) {
  [Label, ListBox, ListBoxItem].forEach(c => Vue.component(c.name, c))
}
