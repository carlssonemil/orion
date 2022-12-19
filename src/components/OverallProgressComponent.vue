<template>
	<div class="overall-progress-component">
		<div class="counter" v-for="(counter, name) in options" :key="name">
			<img
				:src="`https://emilcarlsson.se/orion/camouflages/${name.toLowerCase()}.png`"
				:alt="name"
				onerror="javascript:this.src='/base-gradient.svg'" />
			<span>{{ name }} {{ $t("general.unlocked") }} {{ counter }}/{{ totalWeapons }}</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Object,
			required: true,
		},

		totalWeapons: {
			type: Number,
			required: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.overall-progress-component {
	align-items: center;
	display: flex;
	margin: 0 0 25px;
	border: 2px solid $elevation-4-color;
	background: $elevation-2-color;
	padding: 10px;
	justify-content: center;
	border-radius: $border-radius;

	.counter {
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			height: 100%;
			object-fit: cover;
			position: relative;
			width: 25px;
			z-index: 1;
			border-radius: $border-radius;
			margin: 0 5px 0 15px;
		}
	}

	@media (max-width: $tablet) {
		flex-direction: column;
		margin-top: 0;
		gap: 5px;
	}
}
</style>
