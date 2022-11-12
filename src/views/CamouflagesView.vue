<template>
	<div class="container">
		<CamouflagesComponent :camouflages="camouflages" />
		<ProgressComponent />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'
import allCamos from '../data/camouflages'

import CamouflagesComponent from '@/components/CamouflagesComponent.vue'
import ProgressComponent from '@/components/ProgressComponent.vue'

export default {
	components: {
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
				(camouflage) =>
					allCamoCategories.some((s) => s == camouflage.category) &&
					Object.keys(allCamoProgress).some((s) => s == camouflage.name)
			)
			filteredCamos = filteredCamos.map((camouflage) => {
				camouflage.isCompleted = allCamoProgress[camouflage.name] ?? false
				return camouflage
			})

			return groupBy(filteredCamos, (camouflage) => camouflage.category)
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
