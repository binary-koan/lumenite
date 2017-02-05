export default function CustomDirectives(Vue) {
  Vue.directive('focus-on-create', {
    inserted(el) {
      el.focus()
    }
  })
}
