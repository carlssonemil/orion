<template>
	<nav class="container">
		<router-link to="/" class="logo">
			<div class="icon"></div>
			<p><span>Orion</span></p>
		</router-link>
		<div>
			<router-link to="/">Weapons</router-link>
			<router-link to="/camouflages">Camouflages</router-link>
			<router-link
				to="/settings"
				class="icon settings"
				content="Settings"
				v-tippy="{ placement: 'bottom' }">
				<IconComponent name="cog" />
			</router-link>
			<a
				href="https://github.com/carlssonemil/orion/issues/new?title=Bug%20Report%20-%20"
				target="_blank"
				content="Report An Issue"
				v-tippy="{ placement: 'bottom' }">
				<IconComponent name="bug" />
			</a>
		</div>
		<IconComponent name="bars" class="mobile-nav-toggle" @click="$emit('toggleMobileNavigation')" />
	</nav>
</template>
