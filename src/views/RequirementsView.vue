<template>
	<div class="requirements container">
		<h3>How do I unlock the Orion camouflage?</h3>
		<p>
			The new camouflage system implemented in Modern Warfare II is quite different from the most
			recent Call of Duty games and it can be quite hard to get a grasp and understand it at first,
			at least I thought so. However, it seems to be <b><i>much</i></b> easier to grind through
			compared to the previous games. To unlock the Orion camouflage the following requirements must
			be met:
		</p>
		<ul>
			<li>
				<IconComponent name="check" size="26" color="#10ac84" />
				<span>Base camouflages on 51 weapons</span>
			</li>
			<li>
				<IconComponent name="check" size="26" color="#10ac84" />
				<span>Gold camouflage on 51 weapons</span>
			</li>
			<li>
				<IconComponent name="check" size="26" color="#10ac84" />
				<span>Platinum camouflage on 51 weapons</span>
			</li>
			<li>
				<IconComponent name="check" size="26" color="#10ac84" />
				<span>Polyatomic camouflage on 51 weapons</span>
			</li>
		</ul>

		<p>As you progress through the camouflage stages you will unlock the next stage:</p>
		<div class="stages">
			<div class="stage base">Base</div>
			<IconComponent name="arrow-right" />
			<IconComponent name="arrow-down" class="mobile" />
			<div class="stage gold">Gold</div>
			<IconComponent name="arrow-right" />
			<IconComponent name="arrow-down" class="mobile" />
			<div class="stage platinum">Platinum</div>
			<IconComponent name="arrow-right" />
			<IconComponent name="arrow-down" class="mobile" />
			<div class="stage polyatomic">Polyatomic</div>
			<IconComponent name="arrow-right" />
			<IconComponent name="arrow-down" class="mobile" />
			<div class="stage orion">Orion</div>
		</div>

		<h4>How do I unlock each camouflage stage?</h4>
		<p>To get to the next camouflage stage you need to first unlock the previous stage:</p>
		<table>
			<thead>
				<tr>
					<th>Stage</th>
					<th>Requirement</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div class="inner">
							<div class="icon base"></div>
							<span>Base</span>
						</div>
					</td>
					<td>
						Base camouflages are awarded per their associated weapon base challenge, unlocked by
						leveling the specific weapon.
					</td>
				</tr>
				<tr>
					<td>
						<div class="inner">
							<div class="icon gold"></div>
							<span>Gold</span>
						</div>
					</td>
					<td>
						Once the Base camouflages has been unlocked you unlock the Gold camouflage challenge for
						that specific weapon.
					</td>
				</tr>
				<tr>
					<td>
						<div class="inner">
							<div class="icon platinum"></div>
							<span>Platinum</span>
						</div>
					</td>
					<td>
						After completing all Gold camouflage challenges for a specific category, you unlock the Platinum camouflage challenge for that specific weapon.
					</td>
				</tr>
				<tr>
					<td>
						<div class="inner">
							<div class="icon polyatomic"></div>
							<span>Polyatomic</span>
						</div>
					</td>
					<td>
						Once you've unlocked the Platinum camouflage for all categories and weapons you then
						unlock the Polyatomic camouflage challenge for each weapon.
					</td>
				</tr>
				<tr>
					<td>
						<div class="inner">
							<div class="icon orion"></div>
							<span>Orion</span>
						</div>
					</td>
					<td>
						Orion camouflage will automatically unlock when you have unlocked the Polyatomic
						camouflage on 51 weapons.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss" scoped>
p,
a,
ul {
	@media (min-width: $tablet) {
		font-size: 18px;
	}
}

ul {
	margin-left: 10px;

	li {
		align-items: center;
		display: flex;

		.icon-component {
			margin-right: 6px;
		}
	}
}

.stages {
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 30px 0 60px;

	@media (max-width: $tablet) {
		display: block;
	}

	.stage {
		background: $elevation-3-color;
		border-radius: $border-radius;
		cursor: default;
		font-weight: 600;
		flex-grow: 1;
		padding: 30px;
		text-align: center;
		transition: $transition;

		@media (min-width: $tablet) {
			&:hover {
				transform: translateY(-4%);
			}
		}

		@media (max-width: $tablet) {
			padding: 40px;
		}

		&.base {
			@include base-camouflage-background;
			color: white;
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

		&.orion {
			@include orion-camouflage-background;
			color: white;
		}
	}

	.icon-component {
		opacity: 0.5;
		padding: 0 20px;

		@media (max-width: $tablet) {
			display: flex;
			justify-content: center;
			margin: 5px 0;

			&:not(.mobile) {
				display: none;
			}

			&.mobile {
				display: flex !important;
			}
		}

		&.mobile {
			display: none;
		}
	}
}

table > thead {
	@media (max-width: $tablet) {
		display: none;
	}
}

table > tbody > tr {
	@media (max-width: $tablet) {
		display: flex;
		flex-direction: column;
	}

	td {
		padding: 15px 10px;

		@media (max-width: $tablet) {
			&:first-child {
				padding-bottom: 5px;
			}

			&:last-child {
				padding-top: 0;
			}
		}

		&:first-child {
			.inner {
				align-items: center;
				display: flex;

				.icon {
					$size: 20px;
					background: red;
					border-radius: $border-radius;
					display: block;
					height: $size;
					margin-right: 10px;
					width: $size;

					&.base {
						@include base-camouflage-background;
					}

					&.gold {
						@include gold-camouflage-background;
					}

					&.platinum {
						@include platinum-camouflage-background;
					}

					&.polyatomic {
						@include polyatomic-camouflage-background;
					}

					&.orion {
						@include orion-camouflage-background;
					}
				}
			}
		}
	}
}
</style>
