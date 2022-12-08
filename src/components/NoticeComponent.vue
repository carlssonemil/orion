<template>
	<transition name="slidedown">
		<div class="notice" v-if="showNotice">
			<i18n path="general.support_notice" tag="p">
				<template #link>
					<a href="https://www.buymeacoffee.com/emilcarlsson" target="_blank">{{
						$t('general.support_notice_link')
					}}</a>
				</template>
			</i18n>
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
		}, 100)
	},
}
</script>
