<template>
	<transition name="fade">
		<nav class="mobile" v-if="show">
			<div class="header">
				<router-link to="/" class="logo">
					<div class="icon"></div>
					<p><span>Orion</span></p>
				</router-link>
				<IconComponent name="times" @click="$emit('toggleMobileNavigation')" />
			</div>
			<div>
				<router-link to="/">{{ $tc('general.weapon', 2) }}</router-link>
				<router-link to="/camouflages">{{ $tc('general.camouflage', 2) }}</router-link>
				<router-link to="/mastery">{{ $t('general.mastery') }}</router-link>
				<router-link to="/requirements">{{ $tc('general.requirement', 2) }}</router-link>
			</div>
			<div class="footer">
				<router-link to="/settings">{{ $tc('general.setting', 2) }}</router-link>
				<a href="https://github.com/carlssonemil/orion/issues/new?title=[Bug]%20" target="_blank">
					{{ $t('general.report_an_issue') }}
				</a>
				<router-link to="/about">{{ $t('general.about') }}</router-link>
				<a href="https://github.com/carlssonemil/orion">GitHub</a>

				<a href="https://www.buymeacoffee.com/emilcarlsson" class="button">
					{{ $t('general.mobile_nav_support_link') }}
				</a>
			</div>
		</nav>
	</transition>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
