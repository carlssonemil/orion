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
import { i18n } from './i18n/index.js'
import '/node_modules/flag-icons/css/flag-icons.min.css'

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
	i18n,
	pinia: createPinia(),
	render: (h) => h(App),
}).$mount('#app')
