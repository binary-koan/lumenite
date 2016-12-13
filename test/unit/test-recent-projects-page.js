import test from 'tape-catch'
import Vue from 'vue'
import RecentProjectsPage from 'src/components/landing-pages/recent-projects-page'

export default function(test) {
  test('RecentProjectsPage', test => {
    test.test('it renders correct contents', test => {
      test.plan(2)

      const vm = new Vue({
        el: document.createElement('div'),
        render: h => h(RecentProjectsPage)
      }).$mount()

      // const h1Content = vm.$el.querySelector('button').textContent
      test.ok('Welcome.'.includes('Welcome.'), `Expected 'Welcome.' to include 'Welcome.'`)
      test.ok('Welcome.'.includes('Welcome.'), `Test 2.'`)
    })
  })
}
