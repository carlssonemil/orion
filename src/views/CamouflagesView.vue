<template>
	<div class="container">
		<FiltersComponent />
		<CamouflagesComponent :camouflages="camouflages" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'
import allCamos from '../data/camos'

import FiltersComponent from '@/components/FiltersComponent.vue'
import CamouflagesComponent from '@/components/CamouflagesComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'

export default {
	components: {
		FiltersComponent,
		CamouflagesComponent,
		ProgressComponent,
	},

	computed: {
		...mapState(useStore, ['camouflageRequirements', 'weapons', 'filters']),

		camouflages() {
			let allCamoProgress = this.weapons.map((item) => item.progress)
			//Can filter by % mastery here

			// Flattens the object array
			allCamoProgress = allCamoProgress.reduce(function (acc, x) {
				for (var key in x) acc[key] = x[key]
				return acc
			}, {})

			var allCamoCategories = Object.keys(this.camouflageRequirements)
			var filteredCamos = allCamos.filter(
				(camo) =>
					allCamoCategories.some((s) => s == camo.category) &&
					Object.keys(allCamoProgress).some((s) => s == camo.name)
			)
			filteredCamos = filteredCamos.map((camo) => {
				camo.isCompleted = allCamoProgress[camo.name] ?? false
				return camo
			})

			return groupBy(filteredCamos, (camo) => camo.category)
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
