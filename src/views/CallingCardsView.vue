<template>
	<div class="container">
		<div class="filter-container">
			<FiltersComponent :options="filterOptions" />
			<div class="toggles">
				<FavoritesToggleComponent />
				<LayoutToggleComponent />
			</div>
		</div>

		<CallingCardsComponent :callingCards="filteredCallingCards" :favorites="favorites" />
	</div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'
import callingCards from '../data/callingCards'

import CallingCardsComponent from '@/components/CallingCardsComponent.vue'
import FavoritesToggleComponent from '@/components/FavoritesToggleComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import LayoutToggleComponent from '@/components/LayoutToggleComponent.vue'

const store = useStore()

export default {
	components: {
		CallingCardsComponent,
		FavoritesToggleComponent,
		FiltersComponent,
		LayoutToggleComponent,
	},

	computed: {
		...mapState(useStore, ['weapons', 'filters']),

		filterOptions() {
			return [
				{
					label: this.$tc('general.category'),
					key: 'callingCardCategory',
					type: 'select',
					options: this.callingCardsCategories,
				},
				{
					label: this.$t('filters.hide_completed'),
					key: 'hideCompletedCallingCards',
					type: 'checkbox',
				},
				{
					id: 'search',
					placeholder: `${this.$t('general.search')}...`,
					key: 'search',
					type: 'search',
				},
			]
		},

		callingCardsCategories() {
			return Array.from(new Set(callingCards.map((card) => card.category)))
		},

		callingCards() {
			return callingCards
		},

		filteredCallingCards() {
			const { callingCardCategory, hideCompletedCallingCards, search } = this.filters

			let filteredCallingCards = this.callingCards

			if (callingCardCategory) {
				filteredCallingCards = filteredCallingCards.filter(
					(card) => card.category === callingCardCategory
				)
			}

			if (hideCompletedCallingCards) {
				filteredCallingCards = filteredCallingCards.filter(
					(card) => !store.callingCardCompleted(card.name)
				)
			}

			if (search) {
				filteredCallingCards = filteredCallingCards.filter((card) =>
					card.name.toLowerCase().includes(search.toLowerCase())
				)
			}

			return groupBy(filteredCallingCards, (card) => card.category)
		},

		favorites() {
			const favorites = store.getFavorites('callingCards')
			return this.callingCards.filter((card) => favorites.includes(card.name))
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
