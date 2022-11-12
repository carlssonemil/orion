<template>
	<div class="container">
		<FiltersComponent :options="filterOptions" />
		<CamouflagesComponent :camouflages="filteredCamouflages" />
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
import ProgressComponent from '@/components/ProgressComponent.vue'

export default {
	components: {
		CamouflagesComponent,
		FiltersComponent,
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
</style>
