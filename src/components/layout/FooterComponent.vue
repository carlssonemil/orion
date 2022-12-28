<template>
	<footer class="container">
		<div>
			<i18n path="general.made_by">
				<a href="https://emilcarlsson.se/">Emil Carlsson</a>
			</i18n>
			<i18n v-if="translatedBy" path="general.translated_by">
				<a :href="translatedBy.url">{{ translatedBy.username }}</a>
			</i18n>
		</div>

		<div>
			<router-link to="/about">{{ $t('general.about') }}</router-link>
			<router-link to="/requirements">{{ $tc('general.requirement') }}</router-link>
			<a href="https://github.com/carlssonemil/orion">GitHub</a>
			<LocaleSwitcherComponent />
		</div>
	</footer>
</template>

<script>
import { translatedBy } from '@/i18n/locales.js'
import LocaleSwitcherComponent from '@/components/LocaleSwitcherComponent.vue'

export default {
	components: {
		LocaleSwitcherComponent,
	},

	computed: {
		translatedBy() {
			const currentLocale = this.$root.$i18n.locale
			const translator = translatedBy[currentLocale]

			if (!translator) return null

			return {
				url: translator,
				username: translator.split('/').pop(),
			}
		},
	},
}
</script>
