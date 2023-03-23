<template>
	<div>
		<transition-group name="fade" tag="div" class="container">
			<div v-if="!haveSearched && showFavorites" :key="'favorites'" class="category">
				<h2>
					<span>{{ $t('general.favorites') }}</span>
					<span v-if="favorites.length > 0" @click="unfavoriteAll('callingCards')" class="action">
						{{ $t('general.remove_all') }}
					</span>
				</h2>

				<transition-group
					v-if="favorites.length > 0"
					name="fade"
					tag="div"
					:class="['calling-cards', `layout-${layout}`]">
					<CallingCardComponent v-for="card in favorites" :key="card.name" :card="card" />
				</transition-group>

				<AlertComponent v-else type="empty-state" style="padding: 42px 15px">
					<i18n path="general.no_favorites_placeholder">
						<template #star>
							<IconComponent name="star" fill="#feca57" icon-style="solid" size="20" />
						</template>
						<template #type>{{ $tc('general.calling_cards', 1) }}</template>
					</i18n>
				</AlertComponent>
			</div>

			<div
				v-for="(category, title, index) in callingCards"
				:key="title"
				:data-index="index"
				class="category">
				<h2>
					<span>
						{{ $t('calling_card_categories.' + title) }}
					</span>
					<span v-tippy :content="$t('pages.calling_cards.completed_in_category')">
						{{ categoryProgress(title) }}
					</span>
				</h2>

				<div
					v-for="(subcategory, subTitle, index) in subcategory(category)"
					:key="index"
					class="subcategory">
					<h4 v-if="subTitle !== 'undefined'">
						<span>
							{{ $t('calling_card_categories.' + subTitle) }}
						</span>
						<span v-tippy :content="$t('pages.calling_cards.completed_in_category')">
							{{ subcategoryProgress(title, subTitle) }}
						</span>
					</h4>

					<transition-group name="fade" tag="div" :class="['calling-cards', `layout-${layout}`]">
						<CallingCardComponent v-for="card in subcategory" :key="card.name" :card="card" />
					</transition-group>
				</div>
			</div>
		</transition-group>

		<div v-if="Object.keys(callingCards).length === 0" class="finished-placeholder">
			<p v-if="haveSearched">{{ $t('pages.calling_cards.empty_search') }}</p>
			<p v-else>{{ $t('pages.calling_cards.finished_placeholder') }}</p>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { groupBy } from '@/utils/utils'

import AlertComponent from '@/components/AlertComponent.vue'
import CallingCardComponent from '@/components/CallingCardComponent.vue'

const store = useStore()

export default {
	components: {
		AlertComponent,
		CallingCardComponent,
	},

	props: {
		callingCards: {
			type: Object,
			required: true,
		},

		favorites: {
			type: Array,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['preferences', 'filters']),

		layout() {
			return this.preferences.layout
		},

		showFavorites() {
			return this.preferences.favorites
		},

		haveSearched() {
			return this.filters.search.length > 0
		},
	},

	methods: {
		...mapActions(useStore, ['unfavoriteAll']),

		categoryProgress(categoryTitle) {
			let completed = 0
			const categoryCallingCards = this.callingCards[categoryTitle].map(
				(catCallingCard) => catCallingCard.name
			)
			const totalCallingCards = categoryCallingCards.length

			categoryCallingCards.forEach((callingCard) => {
				if (store.callingCardCompleted(callingCard)) completed++
			})

			return `${completed}/${totalCallingCards}`
		},

		subcategoryProgress(category, subcategory) {
			let completed = 0
			const subcategoryCallingCards = this.callingCards[category]
				.filter((catCallingCard) => catCallingCard.subcategory === subcategory)
				.map((catCallingCard) => catCallingCard.name)
			const totalCallingCards = subcategoryCallingCards.length

			subcategoryCallingCards.forEach((callingCard) => {
				if (store.callingCardCompleted(callingCard)) completed++
			})

			return `${completed}/${totalCallingCards}`
		},

		subcategory(callingCards) {
			return groupBy(callingCards, (card) => card.subcategory)
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;

	.category {
		cursor: default;

		+ .category {
			margin-top: 75px;

			@media (max-width: $tablet) {
				margin-top: 100px;
			}
		}

		h2 {
			align-items: center;
			display: inline-flex;
			justify-content: space-between;
			font-size: 24px;
			font-weight: 600;
			margin-bottom: 25px;
			width: 100%;

			span:last-child:not(:first-child) {
				color: $elevation-9-color;
				font-size: 18px;
				margin-left: 10px;

				&.action {
					color: $elevation-9-color;
					cursor: pointer;
					font-size: 14px;
					transition: $transition;

					&:hover {
						color: lighten($elevation-9-color, 10%);
					}
				}
			}

			@media (max-width: $tablet) {
				margin-bottom: 35px;
			}
		}

		.subcategory {
			+ .subcategory {
				margin-top: 50px;
			}

			h4 {
				@extend h2;
				font-size: 20px;
				margin-top: 0;

				span:last-child:not(:first-child) {
					font-size: 18px;
				}
			}
		}

		.calling-cards {
			display: grid;
			gap: 30px;
			&.layout-grid {
				grid-template-columns: repeat(3, 1fr);

				@media (max-width: $tablet) {
					grid-template-columns: 1fr;
				}
			}

			&.layout-list {
				grid-template-columns: repeat(2, 1fr);

				@media (max-width: $tablet) {
					grid-template-columns: 1fr;
				}
			}
		}
	}
}

.finished-placeholder {
	color: darken(white, 50%);
	margin-top: 10vh;
	text-align: center;
	width: 100%;

	p {
		font-size: 22px;
		line-height: 1.7;

		@media (max-width: $tablet) {
			font-size: 24px;
		}
	}
}
</style>
