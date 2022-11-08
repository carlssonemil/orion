<template>
	<div class="camo">
		<!-- TODO: Add double-click functionality -->
		<div
			:class="[
				'name',
				{
					completed: isComplete,
				},
			]">
			{{ camo.name }}
		</div>

		<!-- <div
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
				<div
					:class="[
						'inner',
						{ completed, base: !['Gold', 'Platinum', 'Polyatomic'].includes(camouflage) },
					]">
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
		</div> -->
	</div>
</template>

<script>
import { useStore } from '@/stores/store'
import { mapActions, mapState } from 'pinia'

export default {
	props: {
		camo: {
			type: Object,
			required: true,
		},
	},

	computed: {
		...mapState(useStore, ['weaponRequirements']),

		// isComplete() {
		// 	return this.camo.progress['Gold']
		// },
	},

	methods: {
		...mapActions(useStore, ['toggleCamouflageCompleted', 'toggleGoldCamouflageCompleted']),

		imageUrl(camouflage) {
			// TODO: Maybe add each camouflage image?
			//return `../assets/camouflages/${convertToKebabCase(camouflage)}.png`

			switch (camouflage) {
				case 'Gold':
					return new URL('/gold-gradient.svg', import.meta.url)
				case 'Platinum':
					return new URL('/platinum-gradient.svg', import.meta.url)
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

		requirementTooltip(weapon, camouflage) {
			const requirement = this.weaponRequirements[weapon.category][weapon.name][camouflage]
			return `${camouflage} - ${requirement || 'TBA'}`
		},
	},
}
</script>

<style lang="scss" scoped>
.camo {
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
	}
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
}
</style>
