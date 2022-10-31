<template>
	<div class="about container">
		<h3>Simple, lightweight &amp; intuitive</h3>
		<p>Keep track of your progress to the Orion camouflage with this easy-to-use tracker.</p>

		<div class="features">
			<div class="feature" v-for="feature in features" :key="feature.title">
				<div class="icon">
					<IconComponent :name="feature.icon" size="25" />
				</div>
				<div class="content">
					<h5>{{ feature.title }}</h5>
					<p>{{ feature.description }}</p>
				</div>
			</div>
		</div>

		<h4>Open source</h4>
		<p>
			Built with <a href="https://vuejs.org/">Vue</a>, hosted on
			<a href="https://vercel.com/">Vercel</a> and analytics by
			<a href="https://plausible.io/">Plausible</a>. The code to this site is available on
			<a href="https://github.com/carlssonemil/orion">GitHub</a>.
		</p>

		<h4>Previous trackers</h4>
		<p>Looking for camouflage trackers for the previous Call of Duty games going back to 2019?</p>
		<div class="trackers">
			<a
				class="tracker"
				v-for="tracker in trackers"
				:key="tracker.title"
				:href="tracker.url"
				target="_blank">
				<IconComponent name="external-link-alt" />
				<img :src="tracker.icon" />
				<h5>{{ tracker.title }}</h5>
			</a>
		</div>

		<h4>Support me</h4>
		<p>
			You can support me by
			<a href="https://www.buymeacoffee.com/emilcarlsson">buying me a beer</a> 🍺, it'd be greatly
			appreciated!
		</p>
	</div>
</template>

<script>
import vanguardIcon from '@/assets/vanguard.png'
import coldWarIcon from '@/assets/coldwar.png'
import damascusIcon from '@/assets/damascus.png'

export default {
	data() {
		return {
			features: [
				{
					title: 'Autosaving',
					description: 'Your progress is automatically saved and stored. No account needed.',
					icon: 'save',
				},
				{
					title: 'Responsive',
					description: 'Use it on your smartphone while gaming.',
					icon: 'mobile-android',
				},
				{
					title: 'Export/Import',
					description: 'Export your progress to another device or browser.',
					icon: 'file-export',
				},
				{
					title: 'Filterable',
					description: 'Easily switch between weapon categories and toggle completed off.',
					icon: 'filter',
				},
				{
					title: 'Ad-free',
					description: 'No annoying ads cluttering the site. Not now, not ever.',
					icon: 'image-slash',
				},
			],

			trackers: [
				{
					title: 'Vanguard',
					icon: vanguardIcon,
					url: 'https://vanguard.emca.app',
				},
				{
					title: 'Cold War',
					icon: coldWarIcon,
					url: 'https://coldwar.vercel.app',
				},
				{
					title: 'Modern Warfare',
					icon: damascusIcon,
					url: 'https://damascus.vercel.app',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
p {
	font-size: 18px;

	@media (max-width: $tablet) {
		font-size: 16px;
	}
}

a {
	@media (max-width: $tablet) {
		font-size: 16px;
	}
}

.features {
	display: grid;
	gap: 25px;
	grid-template-columns: repeat(3, 1fr);
	margin: 30px 0;

	@media (max-width: $tablet) {
		grid-template-columns: 1fr;
	}

	.feature {
		background: $elevation-1-color;
		border: 2px solid $elevation-3-color;
		border-radius: $border-radius;
		cursor: default;
		overflow: hidden;
		padding: 20px;
		position: relative;
		transition: $transition;

		&:hover {
			background: $elevation-3-color;
		}

		.icon {
			background: $purple;
			border-radius: $border-radius * 2;
			display: inline-flex;
			margin-bottom: 15px;
			padding: 10px;
		}

		h5 {
			font-weight: 600;
			margin-bottom: 10px;
			position: relative;
			z-index: 2;
		}

		p {
			font-size: 16px;
			line-height: 1.4;
			position: relative;
			z-index: 2;
		}
	}
}

.trackers {
	display: grid;
	gap: 25px;
	grid-template-columns: repeat(3, 1fr);
	margin: 30px 0;

	@media (max-width: $tablet) {
		grid-template-columns: 1fr;
	}

	.tracker {
		align-items: center;
		background: $elevation-2-color;
		border-radius: $border-radius;
		cursor: pointer;
		display: flex;
		justify-content: center;
		padding: 20px;
		position: relative;
		transition: $transition;

		&:hover {
			background: $elevation-3-color;
			text-decoration: none;

			.icon-component {
				transform: translate(50%, -50%);
			}
		}

		.icon-component {
			opacity: 0.5;
			padding: 5px;
			position: absolute;
			right: 0;
			top: 0;
			transform: translate(40%, -40%);
			transition: $transition;
		}

		img {
			$size: 30px;
			height: $size;
			margin-right: 15px;
			width: $size;
		}

		h5 {
			color: white;
			font-size: 20px;
			font-weight: 400;
			position: relative;
			z-index: 2;
		}
	}
}
</style>
