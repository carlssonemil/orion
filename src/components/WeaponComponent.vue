<template>
	<div :class="['weapon-wrapper', { favorite: isFavorite }]">
		<div :class="['weapon', { 'coming-soon': weapon.comingSoon }]">
			<div
				:class="[
					'name',
					layout,
					{
						gold: goldCompleted,
						platinum: platinumCompleted,
						polyatomic: polyatomicCompleted,
					},
				]"
				@dblclick="toggleWeaponCompleted(weapon, completed, mastery)"
				v-tippy="{ content: `Double-click to ${completed ? 'reset' : 'complete'} weapon` }">
				{{ weapon.name }}
			</div>

			<div
				v-if="!weapon.comingSoon"
				class="progress"
				:style="{
					'grid-template-rows': `${
						layout === 'list' ? 'repeat(' + Object.keys(camouflages).length + ', 1fr)' : ''
					}`,
					'grid-template-columns': `${
						layout === 'grid' ? 'repeat(' + Object.keys(camouflages).length + ', 1fr)' : ''
					}`,
				}">
				<div
					v-for="camouflage in camouflages"
					:key="camouflage.name"
					:class="['camouflage', `weapon-layout-${layout}`]"
					@click="
						toggleCamouflageCompleted(weapon.name, camouflage.name, camouflage.completed, mastery)
					"
					:content="requirementTooltip(weapon, camouflage.name)"
					v-tippy="{ placement: 'bottom' }">
					<div :class="['inner', { completed: camouflage.completed }]">
						<img
							:src="`/assets/camouflages/${convertToKebabCase(camouflage.name)}.png`"
							:alt="camouflage.name"
							onerror="javascript:this.src='/base-gradient.svg'" />
						<IconComponent class="complete" name="check" fill="#10ac84" />
						<IconComponent class="remove" name="times" fill="#ee5253" />
						<div v-if="layout === 'list'" class="info">
							<span class="requirement">{{ requirementListText(weapon, camouflage.name) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<IconComponent
			class="favorite-icon"
			name="star"
			:fill="isFavorite ? '#feca57' : 'gray'"
			icon-style="solid"
			size="25"
			@click="toggleFavorite({ type: mastery ? 'mastery' : 'weapons', name: weapon.name })"
			v-tippy="{ content: `${isFavorite ? 'Remove from' : 'Add to'} favorites` }" />
	</div>
</template>

<script>
import { useStore } from '@/stores/store'
import { convertToKebabCase } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

export default {
	props: {
		weapon: {
			type: Object,
			required: true,
		},

		camouflages: {
			type: Array,
			required: true,
		},

		mastery: {
			type: Boolean,
			required: false,
			default: false,
		},

		polyatomicUnlocked: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

	data() {
		return {
			store: useStore(),
		}
	},

	computed: {
		...mapState(useStore, ['weaponRequirements', 'masteryRequirements', 'preferences']),

		layout() {
			return this.preferences.layout
		},

		progress() {
			return this.mastery ? this.weapon.masteryProgress : this.weapon.progress
		},

		completed() {
			return Object.values(this.progress).every(Boolean)
		},

		goldCompleted() {
			return this.progress['Gold']
		},

		platinumCompleted() {
			return this.progress['Platinum']
		},

		polyatomicCompleted() {
			return this.progress['Polyatomic']
		},

		isFavorite() {
			if (!this.store) return false
			let type = this.mastery ? 'mastery' : 'weapons'
			return this.store.isFavorite(type, this.weapon.name)
		},
	},

	methods: {
		convertToKebabCase,
		...mapActions(useStore, [
			'toggleCamouflageCompleted',
			'toggleWeaponCompleted',
			'toggleFavorite',
		]),

		requirementTooltip(weapon, camouflage) {
			let requirement = 'TBA'

			if (this.mastery) {
				requirement = this.masteryRequirements[camouflage]
			} else {
				requirement = this.weaponRequirements[weapon.category][weapon.name][camouflage]

				if (requirement && requirement.challenge) {
					return `${camouflage} - Level ${requirement.level} - ${requirement.challenge}`
				}
			}

			return `${camouflage} - ${requirement}`
		},

		requirementListText(weapon, camouflage) {
			let requirement = 'TBA'

			if (this.mastery) {
				requirement = this.masteryRequirements[camouflage]
			} else {
				requirement = this.weaponRequirements[weapon.category][weapon.name][camouflage]

				if (requirement && requirement.challenge) {
					return requirement.challenge
				}
			}

			return requirement
		},
	},
}
</script>

<style lang="scss" scoped>
.weapon-wrapper {
	position: relative;

	&.favorite .favorite-icon {
		opacity: 1 !important;
	}

	&:hover {
		.favorite-icon {
			opacity: 1;
		}
	}

	.favorite-icon {
		cursor: pointer;
		opacity: 0;
		position: absolute;
		right: 0;
		top: 0;
		transition: $transition;
		transform: translate(50%, -50%);
		z-index: 2;

		@media (max-width: $tablet) {
			opacity: 1 !important;
			transform: translate(50%, -50%) scale(1.25);
		}
	}

	.weapon {
		position: relative;

		&.coming-soon {
			.name {
				background: $elevation-1-color;
				color: rgba($text-color, 0.25);
				pointer-events: none;

				&::after {
					background: $blue;
					border: 3px solid $background-color;
					border-radius: 100px;
					bottom: 0;
					color: $text-color;
					content: 'Coming Soon';
					font-size: 10px;
					font-weight: 500;
					left: 50%;
					padding: 4px 6px;
					position: absolute;
					transform: translate(-50%, 50%);
					z-index: 2;
				}
			}
		}

		.name {
			$padding: 25px;
			$list-padding: 20px 10px;
			align-items: center;
			background: $elevation-3-color;
			border-radius: $border-radius;
			cursor: pointer;
			display: flex;
			font-weight: 600;
			justify-content: center;
			position: relative;
			transition: $transition;
			user-select: none;

			@media (max-width: $tablet) {
				font-size: 18px;
				padding: $list-padding;
			}

			&.gold {
				@include gold-camouflage-background;
				color: black;
			}

			&.platinum {
				@include platinum-camouflage-background;
				color: black;
			}

			&.polyatomic {
				@include polyatomic-camouflage-background;
				color: white;
			}

			&.grid {
				padding: $padding 0;
			}

			&.list {
				padding: $list-padding;
				&::after {
					bottom: -4px;
				}
			}
		}

		.progress {
			display: grid;
			gap: 5px;
			//grid-template-columns: repeat(5, 1fr);
			margin-top: 5px;

			.camouflage {
				user-select: none;

				&.weapon-layout-grid > .inner {
					flex-direction: column;
					justify-content: center;

					&.completed > .info {
						opacity: 0.5;
					}

					img {
						height: 100%;
						object-fit: cover;
						position: relative;
						width: 100%;
						z-index: 1;
					}

					.icon-component {
						left: 50%;
						opacity: 0;
						position: absolute;
						transform: translate(-50%, -50%);
						transition: $transition;
						top: 50%;
						z-index: 2;
					}

					.info {
						padding: 8px;

						.name {
							font-size: 14px;
						}
					}
				}

				&.weapon-layout-list > .inner {
					$image-size: 25px;
					background: $elevation-1-color;
					flex-direction: row;
					justify-content: flex-start;

					&.completed > .info {
						opacity: 0.5;
					}

					img {
						height: 100%;
						object-fit: cover;
						position: relative;
						width: $image-size;
						z-index: 1;
					}

					.icon-component {
						left: calc($image-size / 2);
						opacity: 0;
						position: absolute;
						transform: translate(-50%, -50%);
						transition: $transition;
						top: 50%;
						z-index: 2;
					}

					.info {
						padding: 4px 8px;
						text-align: left;

						.requirement {
							display: block;
							font-size: 11px;
							line-height: 1.2;

							@media (max-width: $tablet) {
								font-size: 15px;
							}
						}
					}
				}

				.inner {
					align-items: center;
					background: $elevation-2-color;
					border-radius: $border-radius;
					cursor: pointer;
					display: flex;
					height: 100%;
					justify-content: center;
					overflow: hidden;
					position: relative;
					transition: $transition;
					width: 100%;

					&:hover {
						@media (min-width: $tablet) {
							img,
							p {
								opacity: 0.25;
							}

							.icon-component.complete {
								opacity: 1;
							}
						}
					}

					&.completed {
						&:hover {
							@media (min-width: $tablet) {
								.icon-component.complete {
									opacity: 0;
								}
								.icon-component.remove {
									opacity: 1;
								}
							}
						}

						img,
						p {
							opacity: 0.25;
						}

						.icon-component {
							&.complete {
								opacity: 1;
							}

							&.remove {
								opacity: 0;
							}
						}
					}

					&.disabled {
						cursor: not-allowed;

						&:hover {
							img,
							p {
								opacity: 1;
							}

							.icon-component {
								opacity: 0;
							}
						}
					}

					.icon-component {
						left: 50%;
						opacity: 0;
						position: absolute;
						transform: translate(-50%, -50%);
						transition: $transition;
						top: 50%;
						z-index: 2;
					}
				}
			}
		}
	}
}
</style>
