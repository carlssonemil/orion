<template>
	<div class="settings container">
		<div class="setting">
			<h3>{{ $t('pages.settings.export.title') }}</h3>
			<p class="subtitle">{{ $t('pages.settings.export.description') }}</p>
			<textarea v-model="weaponsJson" />
			<div class="actions">
				<button @click="copyCodeToClipboard($event)">
					<IconComponent name="clipboard" color="black" size="18" />
					<span>{{ $t('pages.settings.export.copy_to_clipboard') }}</span>
				</button>
				<button @click="exportProgressAsFile()">
					<IconComponent name="file-download" color="black" size="18" />
					<span>{{ $t('pages.settings.export.download_as_file') }}</span>
				</button>
			</div>
		</div>

		<div class="setting">
			<h3>{{ $t('pages.settings.import.title') }}</h3>
			<p class="subtitle">{{ $t('pages.settings.import.description') }}</p>
			<div class="textarea-wrapper">
				<textarea v-model="importJsonCode" />
			</div>
			<div class="actions">
				<span
					style="display: inline-block"
					v-tippy="{
						content: $t('pages.settings.import.import_disabled_tooltip'),
						onShow: () => !importJsonCode,
					}">
					<button @click="importProgressFromCode()" :disabled="!importJsonCode">
						<IconComponent name="file-import" color="black" size="18" />
						<span>{{ $t('pages.settings.import.import_code') }}</span>
					</button>
				</span>
				<label for="import" class="button" :disabled="uploading">
					<IconComponent name="file-upload" color="black" size="18" />
					<span>{{ $t('pages.settings.import.import_from_file') }}</span>
					<LoaderComponent v-if="uploading" :size="18" />
				</label>
			</div>
			<input type="file" id="import" accept=".json" @change="importProgressFromFile($event)" />
		</div>

		<div class="setting danger">
			<h3>{{ $t('pages.settings.reset.title') }}</h3>
			<p class="subtitle">{{ $t('pages.settings.reset.description') }}</p>
			<button @click="confirmProgressReset()" class="danger">
				<IconComponent name="trash" size="18" />
				<span>{{ $t('pages.settings.reset.reset_my_progress') }}</span>
			</button>
			<p class="danger">
				<IconComponent name="exclamation-triangle" color="#ee5253" size="18" />
				<span>{{ $t('pages.settings.reset.warning') }}</span>
			</p>
		</div>

		<ModalComponent ref="modal" :maxWidth="500">
			<template #header>
				<IconComponent
					name="exclamation-triangle"
					size="22"
					color="#ee5253"
					style="margin-right: 8px" />
				<span>{{ $t('pages.settings.reset.confirm.title') }}</span>
			</template>
			<p>{{ $t('pages.settings.reset.confirm.body') }}</p>
			<template #footer>
				<button
					@click="
						resetProgress()
						$refs.modal.close()
					"
					class="danger">
					{{ $t('pages.settings.reset.confirm.reset') }}
				</button>
				<button @click="$refs.modal.close()" class="secondary">
					{{ $t('pages.settings.reset.confirm.cancel') }}
				</button>
			</template>
		</ModalComponent>
	</div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '@/stores/store'
import { copyToClipboard, downloadJsonFile } from '@/utils/utils'

export default {
	data() {
		return {
			importJsonCode: null,
			uploading: false,
		}
	},

	computed: {
		...mapState(useStore, ['weapons']),

		weaponsJson() {
			return JSON.stringify([...this.weapons])
		},
	},

	methods: {
		...mapActions(useStore, ['setWeapons', 'storeProgress', 'resetProgress']),

		copyCodeToClipboard(e) {
			const button = e.target
			const buttonText = button.childNodes[1]

			copyToClipboard(this.weaponsJson, () => {
				button.style.backgroundColor = '#10ac84'
				button.style.width = `${button.scrollWidth}px`
				buttonText.innerHTML = 'Code Copied!'

				setTimeout(() => {
					button.style.backgroundColor = null
					button.style.width = null
					buttonText.innerHTML = 'Copy to clipboard'
				}, 2000)
			})
		},

		exportProgressAsFile() {
			downloadJsonFile(this.weaponsJson)
		},

		async importProgressFromCode() {
			if (this.importJsonCode) {
				try {
					const parsedJson = JSON.parse(this.importJsonCode)
					await this.setWeapons(parsedJson)
					await this.storeProgress()
					this.$notify({
						type: 'success',
						title: 'Successfully imported progress!',
					})
				} catch (error) {
					if (error.stack.includes('SyntaxError')) {
						this.$notify({
							type: 'warning',
							title: "The JSON code you tried to import is not valid and can't be parsed.",
						})
					} else {
						this.$notify({
							type: 'warning',
							title: error.message,
						})
					}
				}
			}
		},

		importProgressFromFile(event) {
			this.$notify({ clean: true })
			this.uploading = true
			const file = event.target.files[0]
			const regex = /.json$/i

			if (regex.test(file.name)) {
				if (typeof FileReader !== 'undefined') {
					const reader = new FileReader()
					reader.onload = (e) => {
						setTimeout(async () => {
							const store = useStore()
							try {
								await store.setWeapons(JSON.parse(e.target.result))
								await store.storeProgress()
								this.uploading = false
								event.target.value = null
								this.$notify({
									type: 'success',
									title: 'Successfully imported progress!',
								})
							} catch (error) {
								this.handleImportError(error.message, event)
							}
						}, 500)
					}
					reader.readAsText(file)
				} else {
					this.handleImportError(
						'Your browser does not support the required APIs to handle file uploads.',
						event
					)
				}
			} else {
				this.handleImportError(
					'The file type of the uploaded file is incorrect, it needs to be ".json".',
					event
				)
			}
		},

		handleImportError(errorMessage, event) {
			this.uploading = false
			event.target.value = null

			this.$notify({
				type: 'warning',
				title: errorMessage,
				duration: 20000,
			})
		},

		confirmProgressReset() {
			this.$refs.modal.open()
		},

		cancelReset() {
			this.$refs.modal.close()
		},
	},
}
</script>

<style lang="scss" scoped>
.setting {
	$setting-background-color: $elevation-2-color;
	$setting-border-color: $elevation-4-color;

	background-color: $setting-background-color;
	border: 2px solid $setting-border-color;
	border-radius: $border-radius;
	padding: 25px;

	+ .setting {
		margin-top: 30px;
	}

	&.danger {
		background-color: rgba($red, 0.15);
		border-color: rgba($red, 0.3);
	}

	h3 {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 10px;

		@media (max-width: $tablet) {
			margin-top: 0;
		}
	}

	p {
		&.subtitle {
			font-size: 14px;
			margin-bottom: 15px;
		}

		&.danger {
			align-items: center;
			color: $red;
			display: flex;
			font-size: 13px;
			font-weight: 500;
			margin-top: 15px;

			.icon-component {
				margin-right: 10px;
			}
		}
	}

	textarea {
		margin-bottom: 20px;
	}

	.button {
		margin-left: 15px;

		.loader {
			margin-left: 8px;
		}
	}

	button {
		+ button {
			margin-left: 15px;
		}

		span,
		.icon-component {
			pointer-events: none;
		}
	}
}

.textarea-wrapper {
	position: relative;

	&::before {
		content: 'Paste code here, or import from file below.';
		font-size: 14px;
		left: 50%;
		opacity: 0.5;
		position: absolute;
		pointer-events: none;
		top: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
	}
}

input#import {
	display: none;
}
</style>
