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
		</div>
		<IconComponent name="bars" class="mobile-nav-toggle" @click="$emit('toggleMobileNavigation')" />
	</nav>
</template>
