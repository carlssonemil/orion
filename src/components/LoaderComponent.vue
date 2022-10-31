<template>
	<div
		class="loader"
		:class="{ inverted }"
		:style="{
			borderWidth: borderWidth + 'px',
			borderColor: 'rgba(' + color + ', .25)',
			borderLeftColor: color,
			height: size + 'px',
			width: size + 'px',
		}"></div>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			required: false,
			default: 22,
		},
		borderWidth: {
			type: Number,
			required: false,
			default: 2,
		},
		color: {
			type: String,
			required: false,
			default: 'gray',
		},
		inverted: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
}
</script>

<style lang="scss" scoped>
.loader {
	$size: 30px;

	animation: spin 1.2s linear infinite;
	border: 4px solid rgba(black, 0.25);
	border-left-color: black;
	border-radius: 50%;
	display: inline-block;
	height: $size;
	width: $size;

	&.inverted {
		border-color: rgba(white, 0.25);
		border-left-color: white;
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
