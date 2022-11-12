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
import camouflages from '../data/camouflages'

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
			const camouflageProgress = this.weapons
				.map((weapon) => weapon.progress)
				.flat()
				.reduce((a, b) => ({ ...a, ...b }), {})

			camouflages.forEach((camouflage) => {
				camouflage.isCompleted = camouflageProgress[camouflage.name] || false
			})

			return groupBy(camouflages, (camouflage) => camouflage.category)
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
