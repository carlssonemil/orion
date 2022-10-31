<template>
	<transition name="slidedown">
		<div class="notice" v-if="showNotice">
			<p>
				If you like this tracker, show your appreciation by
				<a href="https://www.buymeacoffee.com/emilcarlsson" target="_blank">buying me a beer</a> 🍺
			</p>
			<IconComponent name="times" width="16" height="16" @click="showNotice = false" />
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			showNotice: false,
		}
	},

	mounted() {
		setTimeout(() => {
			this.showNotice = true
		}, 15000)
	},
}
</script>
