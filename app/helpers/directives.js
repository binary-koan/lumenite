export default function setupCustomDirectives(Vue) {
  Vue.directive('focus-on-create', {
    inserted(el) {
      el.focus()
    }
  })
}
