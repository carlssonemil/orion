<template>
  <nav class="container">
    <router-link to="/" class="logo">
      <div class="icon"></div>
      <p><span>Orion</span></p>
    </router-link>
    <div>
      <router-link to="/">{{ $tc('general.weapon', 2) }}</router-link>
      <router-link to="/camouflages">{{ $tc('general.camouflage', 2) }}</router-link>
      <router-link to="/calling-cards" class="new">{{
        $tc('general.calling_cards', 2)
      }}</router-link>
      <router-link to="/mastery">{{ $t('general.mastery') }}</router-link>
      <router-link
        to="/settings"
        class="icon settings"
        :content="$tc('general.setting', 2)"
        v-tippy="{ placement: 'bottom' }">
        <IconComponent name="cog" />
      </router-link>
      <a
        href="https://github.com/carlssonemil/orion/issues/new?title=[Bug]%20"
        target="_blank"
        :content="$t('general.report_an_issue')"
        v-tippy="{ placement: 'bottom' }">
        <IconComponent name="bug" />
      </a>
    </div>
    <IconComponent name="bars" class="mobile-nav-toggle" @click="$emit('toggleMobileNavigation')" />
  </nav>
</template>
