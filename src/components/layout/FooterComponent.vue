<template>
	<footer class="container">
		<div>
			<i18n path="general.made_by">
				<a href="https://emilcarlsson.se/">Emil Carlsson</a>
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
import LocaleSwitcherComponent from '@/components/LocaleSwitcherComponent.vue'

export default {
	components: {
		LocaleSwitcherComponent,
	},
}
</script>
