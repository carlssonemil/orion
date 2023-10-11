<template>
  <div id="app">
    <NoticeComponent />
    <NavigationComponent @toggleMobileNavigation="toggleMobileNavigation" />
    <MobileNavigationComponent
      :show="showMobileNavigation"
      @toggleMobileNavigation="toggleMobileNavigation" />

    <main>
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <notifications position="top center">
      <template slot="body" slot-scope="props">
        <div class="notification" :class="props.item.type" @click="props.close">
          <p class="title">{{ props.item.title }}</p>
          <IconComponent class="remove" name="times" width="18" height="18" />
        </div>
      </template>
    </notifications>

    <FooterComponent />
  </div>
</template>

<script>
import { useStore } from '@/stores/store'

import FooterComponent from '@/components/layout/FooterComponent.vue'
import MobileNavigationComponent from '@/components/layout/MobileNavigationComponent.vue'
import NavigationComponent from '@/components/layout/NavigationComponent.vue'
import NoticeComponent from './components/NoticeComponent.vue'

export default {
  components: {
    FooterComponent,
    MobileNavigationComponent,
    NavigationComponent,
    NoticeComponent,
  },

  data() {
    return {
      showMobileNavigation: false,
    }
  },

  async beforeCreate() {
    const store = useStore()
    await store.getStoredProgress()
  },

  watch: {
    $route() {
      this.showMobileNavigation = false
    },
  },

  methods: {
    toggleMobileNavigation() {
      this.showMobileNavigation = !this.showMobileNavigation
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import '@/scss/main';

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
