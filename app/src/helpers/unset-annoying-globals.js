export default function unsetAnnoyingGlobals() {
  // These just cause confusing error messages way more often than they're actually useful ...
  ['find', 'scrollTo'].forEach(method => {
    window['_' + method] = window[method]
    window[method] = () => { throw `Calling '${method}' on 'window'. Did you forget to require something?` }
  })
}
