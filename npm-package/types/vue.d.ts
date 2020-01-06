/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import Router, { Route, RawLocation, NavigationGuard } from './index'

declare module 'vue/types/vue' {
  interface Vue {
    $Router: Router
    $Route: Route
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    router?: Router
    beforeRouteEnter?: NavigationGuard<V>
    beforeRouteLeave?: NavigationGuard<V>
    beforeRouteUpdate?: NavigationGuard<V>
  }
}
