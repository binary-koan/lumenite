import ListBox from './list-box'
import ListBoxItem from './list-box-item'

export default function ElementExtras(Vue) {
  [ListBox, ListBoxItem].forEach(c => Vue.component(c.name, c))
}
