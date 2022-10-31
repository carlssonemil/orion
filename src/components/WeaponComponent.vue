<template>
	<div class="weapon">
		<div
			:class="['name', { gold: goldCompleted, polyatomic: polyatomicCompleted }]"
			@dblclick="toggleGoldCamouflageCompleted(weapon, goldCompleted)"
			v-tippy="{ content: `Double-click to ${polyatomicCompleted ? 'reset' : 'complete'} weapon` }">
			{{ weapon.name }}
		</div>

		<div
			class="progress"
			:style="{
				'grid-template-columns': `repeat(${Object.keys(baseCamouflages).length}, 1fr)`,
			}">
			<div
				v-for="(completed, camouflage, index) in baseCamouflages"
				:key="camouflage"
				:class="['camouflage', { gold: camouflage === 'Gold' }]"
				@click="handleCamouflageCompletedToggle(weapon, camouflage, completed)"
				:content="requirementTooltip(weapon, camouflage, index + 1)"
				v-tippy="{ placement: 'bottom' }">
				<div :class="['inner', { completed, base: !['Gold', 'Polyatomic'].includes(camouflage) }]">
					<IconComponent class="complete" name="check" fill="#10ac84" />
					<IconComponent class="remove" name="times" fill="#ee5253" />
					<img :src="imageUrl(camouflage)" :alt="camouflage" />
				</div>
			</div>
			<div
				v-if="polyatomicUnlocked"
				class="camouflage polyatomic"
				@click="toggleCamouflageCompleted(weapon, 'Polyatomic', weapon.progress['Polyatomic'])"
				:content="requirementTooltip(weapon, 'Polyatomic')"
				v-tippy="{ placement: 'bottom' }"
				:style="{ 'grid-column': `span ${Object.keys(baseCamouflages).length}` }">
				<div :class="['inner', { completed: weapon.progress['Polyatomic'] }]">
					<IconComponent class="complete" name="check" fill="#10ac84" />
					<IconComponent class="remove" name="times" fill="#ee5253" />
					<img :src="imageUrl('Polyatomic')" :alt="'Polyatomic'" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { filterObject } from '@/utils/utils'

export default {
	props: {
		weapon: {
			type: Object,
			required: true,
		},

		polyatomicUnlocked: {
			type: Boolean,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['requirements']),

		goldCompleted() {
			return Object.values(this.baseCamouflages).every(Boolean)
		},

		polyatomicCompleted() {
			return this.weapon.progress['Polyatomic']
		},

		baseCamouflages() {
			return filterObject(this.weapon.progress, ['Polyatomic'])
		},
	},

	methods: {
		...mapActions(useStore, ['toggleCamouflageCompleted', 'toggleGoldCamouflageCompleted']),

		handleCamouflageCompletedToggle(weapon, camouflage, completed) {
			if (camouflage === 'Gold') {
				this.toggleGoldCamouflageCompleted(weapon, completed)
			} else {
				this.toggleCamouflageCompleted(weapon, camouflage, completed)
			}
		},

		imageUrl(camouflage) {
			// TODO: Maybe add each camouflage image?
			//return `../assets/camouflages/${convertToKebabCase(camouflage)}.png`

			switch (camouflage) {
				case 'Gold':
					return new URL('/gold-gradient.svg', import.meta.url)
				case 'Polyatomic':
					return new URL('/polyatomic-gradient.svg', import.meta.url)
				default:
					return new URL('/base-gradient.svg', import.meta.url)
			}
		},

		imageExists(camouflage) {
			const url = this.imageUrl(camouflage)
			const img = new Image()
			img.src = url
			return img.height !== 0
		},

		requirementTooltip(weapon, camouflage, index) {
			const requirement = this.requirements[weapon.category][index || camouflage]
			return `${camouflage} - ${requirement || 'TBA'}`
		},
	},
}
</script>

<style lang="scss" scoped>
.weapon {
	position: relative;

	.name {
		$padding: 25px;
		align-items: center;
		background: $elevation-3-color;
		border-radius: $border-radius;
		cursor: pointer;
		display: flex;
		font-weight: 600;
		justify-content: center;
		padding: $padding 0;
		position: relative;
		transition: $transition;
		user-select: none;

		@media (max-width: $tablet) {
			font-size: 18px;
			padding: #{$padding * 2} $padding;
		}

		&.gold {
			@include gold-camouflage-background;
			color: black;
		}

		&.polyatomic {
			@include polyatomic-camouflage-background;
			color: white;
		}
	}

	.progress {
		display: grid;
		gap: 5px;
		//grid-template-columns: repeat(5, 1fr);
		margin-top: 5px;

		.camouflage {
			user-select: none;

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

				&.base {
					&::before {
						content: 'TBA';
						color: white;
						display: block;
						font-size: 11px;
						font-weight: 500;
						left: 50%;
						opacity: 0.75;
						position: absolute;
						top: 50%;
						transform: translate(-50%, -50%);
						z-index: 2;
					}

					&:hover {
						&::before {
							opacity: 0;
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

					&::before {
						display: none;
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

				img {
					height: auto;
					max-height: 80px;
					object-fit: cover;
					position: relative;
					width: 100%;
					z-index: 1;

					@media (min-width: $tablet) {
						max-height: 35px;
					}
				}

				p {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
