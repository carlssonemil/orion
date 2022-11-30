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
				<router-link to="/">Weapons</router-link>
				<router-link to="/camouflages">Camouflages</router-link>
				<router-link to="/requirements">Requirements</router-link>
			</div>
			<div class="footer">
				<router-link to="/settings">Settings</router-link>
				<a
					href="https://github.com/carlssonemil/orion/issues/new?title=Bug%20Report%20-%20"
					target="_blank">
					Report An Issue
				</a>
				<router-link to="/about">About</router-link>
				<a href="https://github.com/carlssonemil/orion">GitHub</a>

				<a href="https://www.buymeacoffee.com/emilcarlsson" class="button"
					>Support me by buying me a beer 🍺</a
				>
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
