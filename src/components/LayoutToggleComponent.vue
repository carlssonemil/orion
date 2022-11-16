<template>
	<div class="layout-toggle" @click="toggleLayout()" v-tippy="{ content: 'Layout' }">
		<IconComponent v-if="layout === 'grid'" name="apps" iconStyle="solid" size="18" />
		<IconComponent v-else name="list-ul" size="18" />
		<span>{{ layoutLabel }}</span>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '@/stores/store'

export default {
	computed: {
		...mapState(useStore, ['preferences']),

		layout() {
			return this.preferences.layout
		},

		layoutLabel() {
			return this.layout === 'grid' ? 'Grid' : 'List'
		},
	},

	methods: {
		...mapActions(useStore, ['setPreferences', 'storeProgress']),

		toggleLayout() {
			const preferences = JSON.parse(JSON.stringify(this.preferences))
			preferences.layout = this.layout === 'grid' ? 'list' : 'grid'
			this.updatePreferences(preferences)
		},

		updatePreferences(preferences) {
			this.setPreferences(preferences)
			this.storeProgress()
		},
	},
}
</script>

<style lang="scss" scoped>
.layout-toggle {
	align-items: center;
	background: $elevation-2-color;
	border: 2px solid $elevation-4-color;
	border-radius: $border-radius;
	color: rgba($text-color, 0.75);
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	padding: 5px 0;
	transition: $transition;
	user-select: none;
	width: 75px;

	&:hover {
		background: $elevation-3-color;
	}

	@media (max-width: $tablet) {
		margin: 20px 0 25px;
		padding: 15px 0;
		width: 100%;

		span {
			font-size: 16px !important;
		}
	}

	.icon-component {
		margin-right: 5px;
		opacity: 0.75;
		width: 18px;
	}

	span {
		font-size: 14px;
	}
}
</style>
