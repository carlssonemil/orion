<template>
	<div class="weapon">
		<!-- TODO: Add double-click functionality -->
		<div
			:class="[
				'name',
				{
					gold: goldCompleted,
					platinum: platinumCompleted,
					polyatomic: polyatomicCompleted,
				},
			]">
			{{ weapon.name }}
		</div>

		<div
			class="progress"
			:style="{
				'grid-template-columns': `repeat(${Object.keys(baseCamouflages).length}, 1fr)`,
			}">
			<div
				v-for="(completed, camouflage) in baseCamouflages"
				:key="camouflage"
				:class="['camouflage']"
				@click="toggleCamouflageCompleted(weapon, camouflage, completed)"
				:content="requirementTooltip(weapon, camouflage)"
				v-tippy="{ placement: 'bottom' }">
				<div :class="['inner', { completed }]">
					<IconComponent class="complete" name="check" fill="#10ac84" />
					<IconComponent class="remove" name="times" fill="#ee5253" />
					<img
						:src="imageUrl(camouflage)"
						:alt="camouflage"
						onerror="javascript:this.src='/base-gradient.svg'" />
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
import { useStore } from '@/stores/store'
import { convertToKebabCase, filterObject } from '@/utils/utils'
import { mapActions, mapState } from 'pinia'

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
			return this.weapon.progress['Gold']
		},

		platinumCompleted() {
			return this.weapon.progress['Platinum']
		},

		polyatomicCompleted() {
			return this.weapon.progress['Polyatomic']
		},

		baseCamouflages() {
			return filterObject(this.weapon.progress, ['Polyatomic'])
		},
	},

	methods: {
		convertToKebabCase,
		...mapActions(useStore, ['toggleCamouflageCompleted', 'toggleGoldCamouflageCompleted']),

		imageUrl(camouflage) {
			if (camouflage === 'Gold') {
				return new URL('/gold-gradient.svg', import.meta.url)
			} else if (camouflage === 'Platinum') {
				return new URL('/platinum-gradient.svg', import.meta.url)
			} else if (camouflage === 'Polyatomic') {
				return new URL('/polyatomic-gradient.svg', import.meta.url)
			}

			return new URL(`../assets/camouflages/${convertToKebabCase(camouflage)}.png`, import.meta.url)
		},

		requirementTooltip(weapon, camouflage) {
			const requirement = this.requirements[weapon.category][weapon.name][camouflage]
			if (requirement && requirement.Challenge) return `${camouflage} - Level ${requirement.Level} - ${requirement.Challenge}`
				
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

		&.platinum {
			@include platinum-camouflage-background;
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

				img {
					height: 100%;
					object-fit: cover;
					position: relative;
					width: 100%;
					z-index: 1;
				}

				p {
					font-size: 14px;
				}
			}
		}
	}
}
</style>
