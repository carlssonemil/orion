<template>
	<div class="container">
		<div class="filter-container">
			<FiltersComponent :options="filterOptions" />
			<LayoutToggleComponent />
		</div>
		<CamouflagesComponent :camouflages="filteredCamouflages" :favorites="favorites" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'
import camouflages from '../data/camouflages'

import CamouflagesComponent from '@/components/CamouflagesComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'

const store = useStore()

export default {
	components: {
		CamouflagesComponent,
		FiltersComponent,
		LayoutToggleComponent,
		ProgressComponent,
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
			const { camouflageCategory, hideCompletedCamouflages } = this.filters

			let filteredCamouflages = this.camouflages

			if (camouflageCategory) {
				filteredCamouflages = filteredCamouflages.filter(
					(camouflage) => camouflage.category === camouflageCategory
				)
			}

			if (hideCompletedCamouflages) {
				filteredCamouflages = filteredCamouflages.filter((camouflage) => !camouflage.isCompleted)
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
			margin: 0;
			width: 100%;
		}
	}
}

::v-deep .filters-component {
	flex-grow: 1;
	margin-right: 25px;
}
</style>
