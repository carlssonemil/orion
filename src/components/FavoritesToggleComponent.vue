<template>
	<button
		class="favorites-toggle"
		@click="toggleFavorites()"
		v-tippy="{ content: $t('filters.toggle_favorites') }">
		<IconComponent v-if="visible" name="star" icon-style="solid" size="18" />
		<IconComponent v-else name="star" size="18" />
		<span>
			{{ visible ? $t('general.hide') : $t('general.show') }}
			{{ $t('general.favorites').toLowerCase() }}
		</span>
	</button>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useStore } from '@/stores/store'

export default {
	computed: {
		...mapState(useStore, ['preferences']),

		visible() {
			return this.preferences.favorites
		},
	},

	methods: {
		...mapActions(useStore, ['setPreferences', 'storeProgress']),

		toggleFavorites() {
			const preferences = JSON.parse(JSON.stringify(this.preferences))
			preferences.favorites = !preferences.favorites
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
.favorites-toggle {
	align-items: center;
	background: $elevation-2-color;
	border: 2px solid $elevation-4-color;
	border-radius: $border-radius;
	color: rgba($text-color, 0.75);
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	margin-right: 15px;
	padding: 6px 6px;
	transition: $transition;
	user-select: none;

	&:hover {
		background: $elevation-3-color;
	}

	@media (max-width: $tablet) {
		margin: 0 0 25px;
		padding: 15px 0;
		width: 100%;

		span {
			font-size: 16px !important;
		}
	}

	.icon-component {
		margin-right: 0px;
		opacity: 0.75;
		width: 18px;

		@media (max-width: $tablet) {
			margin-right: 5px;
		}
	}

	span {
		display: none;
		font-size: 14px;

		@media (max-width: $tablet) {
			display: block;
		}
	}
}
</style>
