<template>
	<div class="container">
		<div class="filter-container">
			<FiltersComponent :options="filterOptions" />
			<div class="toggles">
				<FavoritesToggleComponent />
				<LayoutToggleComponent />
			</div>
		</div>

		<CamouflagesComponent :camouflages="filteredCamouflages" :favorites="favorites" />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'
import camouflages from '../data/camouflages'

import CamouflagesComponent from '@/components/CamouflagesComponent.vue'
import FavoritesToggleComponent from '@/components/FavoritesToggleComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'

const store = useStore()

export default {
	components: {
		CamouflagesComponent,
		FavoritesToggleComponent,
		FiltersComponent,
		LayoutToggleComponent,
	},

	computed: {
		...mapState(useStore, ['camouflageRequirements', 'weapons', 'filters']),

		filterOptions() {
			return [
				{
					label: 'Category',
					key: 'camouflageCategory',
					type: 'select',
					options: this.camouflageCategories,
				},
				{
					label: 'Hide Completed',
					key: 'hideCompletedCamouflages',
					type: 'checkbox',
				},
				{
					id: 'search',
					placeholder: 'Search...',
					key: 'search',
					type: 'search',
				},
			]
		},

		camouflageCategories() {
			return Array.from(new Set(camouflages.map((camouflage) => camouflage.category)))
		},

		camouflages() {
			const camouflageProgress = this.weapons
				.map((weapon) => weapon.progress)
				.flat()
				.reduce((a, b) => ({ ...a, ...b }), {})

			camouflages.forEach((camouflage) => {
				camouflage.isCompleted = camouflageProgress[camouflage.name] || false
			})

			return camouflages
		},

		filteredCamouflages() {
			const { camouflageCategory, hideCompletedCamouflages, search } = this.filters

			let filteredCamouflages = this.camouflages

			if (camouflageCategory) {
				filteredCamouflages = filteredCamouflages.filter(
					(camouflage) => camouflage.category === camouflageCategory
				)
			}

			if (hideCompletedCamouflages) {
				filteredCamouflages = filteredCamouflages.filter((camouflage) => !camouflage.isCompleted)
			}

			if (search) {
				filteredCamouflages = filteredCamouflages.filter((camouflage) =>
					camouflage.name.toLowerCase().includes(search.toLowerCase())
				)
			}

			return groupBy(filteredCamouflages, (camouflage) => camouflage.category)
		},

		favorites() {
			const favorites = store.getFavorites('camouflages')
			return camouflages.filter((camouflage) => favorites.includes(camouflage.name))
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	text-align: center;
}

h1 {
	margin-top: 75px;
}

h2 {
	margin: 30px auto 0;
	max-width: 450px;
}

.filter-container {
	align-items: center;
	display: flex;
	width: 100%;

	@media (max-width: $tablet) {
		flex-direction: column;

		::v-deep .filters-component {
			margin-bottom: 20px;
			margin-right: 0;
			width: 100%;

			#search {
				margin: 8px 0 0;
			}
		}

		.toggles {
			display: flex;
			justify-content: space-between;
			width: 100%;

			> :first-child {
				margin-right: 20px;
			}
		}
	}
}

::v-deep .filters-component {
	flex-grow: 1;
	margin-right: 15px;

	#search {
		margin: 0 10px 0 auto;
	}
}
</style>
