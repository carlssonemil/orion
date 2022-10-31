import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import unicons from './utils/unicons'
import Notifications from 'vue-notification'
import VueTippy, { TippyComponent } from 'vue-tippy'
import IconComponent from './components/IconComponent.vue'
import LoaderComponent from './components/LoaderComponent.vue'
import ModalComponent from './components/ModalComponent.vue'

Unicon.add(unicons)

Vue.use(PiniaVuePlugin)
Vue.use(Unicon)
Vue.use(Notifications)
Vue.use(VueTippy, { arrow: true, arrowType: 'round' })

Vue.component('TippyComponent', TippyComponent)
Vue.component('IconComponent', IconComponent)
Vue.component('LoaderComponent', LoaderComponent)
Vue.component('ModalComponent', ModalComponent)

new Vue({
	router,
	pinia: createPinia(),
	render: (h) => h(App),
}).$mount('#app')
