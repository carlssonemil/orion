import Vue from 'vue'
import { defineStore } from 'pinia'
import { filterObject } from '../utils/utils'
import defaultWeapons from '../data/weapons'
import defaultFilters from '../data/defaults/filters'
import weaponRequirements from '../data/weaponRequirements'
import camoRequirements from '../data/camoRequirements'

const token = import.meta.env.MODE === 'production' ? 'orion' : 'orion-dev'

export const useStore = defineStore({
	id: 'store',

	state: () => ({
		weaponRequirements: { ...weaponRequirements },
		camoRequirements: { ...camoRequirements },
		filters: {},
		weapons: [],
		beganGrind: null,
	}),

	getters: {
		categories: (state) => Array.from(new Set(state.weapons.map((weapon) => weapon.category))),
	},

	actions: {
		setWeapons(weapons) {
			this.weapons = JSON.parse(JSON.stringify(defaultWeapons))

			if (weapons) {
				weapons.forEach((weapon) => {
					const index = this.weapons.findIndex((w) => w.name === weapon.name)

					if (index !== -1) {
						Object.keys(weapon.progress).forEach((camouflage) => {
							if (camouflage in this.weapons[index].progress) {
								this.weapons[index].progress[camouflage] = weapon.progress[camouflage]
							}
						})
					}
				})
			}
		},

		setFilters(filters) {
			this.filters = JSON.parse(JSON.stringify(defaultFilters))

			if (filters) {
				Object.keys(filters).forEach((key) => {
					if (key in defaultFilters) {
						this.filters[key] = filters[key]
					}
				})
			}
		},

		getStoredProgress() {
			const storage = localStorage.getItem(token)

			if (!storage) {
				this.setWeapons()
				this.setFilters()
				return
			}

			const { weapons, filters, beganGrind } = JSON.parse(storage)

			if (weapons) this.setWeapons(weapons)
			if (filters) this.setFilters(filters)
			if (beganGrind) this.beganGrind = beganGrind
		},

		storeProgress() {
			localStorage.setItem(
				token,
				JSON.stringify({
					weapons: this.weapons,
					filters: this.filters,
					beganGrind: this.beganGrind || new Date(),
				})
			)
		},

		resetProgress() {
			localStorage.removeItem(token)
			this.setWeapons()
			this.beganGrind = null

			Vue.notify({
				type: 'success',
				title: 'Progress successfully reset!',
			})
		},

		toggleCamouflageCompleted(weapon, camouflage, current) {
			this.weapons.find((w) => w.name === weapon.name).progress[camouflage] = !current
			this.storeProgress()
		},

		toggleGoldCamouflageCompleted(weapon, current) {
			const selectedWeapon = this.weapons.find((w) => w.name === weapon.name)

			Object.keys(selectedWeapon.progress).forEach((camouflage) => {
				if (!current && !['Gold', 'Polyatomic'].includes(camouflage)) {
					selectedWeapon.progress[camouflage] = true
				}

				selectedWeapon.progress['Gold'] = !current
			})

			this.storeProgress()
		},

		toggleWeaponCompleted(weapon, current) {
			const selectedWeapon = this.weapons.find((w) => w.name === weapon.name)
			Object.keys(selectedWeapon.progress).forEach(
				(camouflage) => (selectedWeapon.progress[camouflage] = !current)
			)

			this.storeProgress()
		},

		toggleCategoryCompleted(category, current) {
			category.forEach((weapon) => {
				let camouflages

				if (current) {
					camouflages = Object.keys(weapon.progress)
				} else {
					camouflages = Object.keys(filterObject(weapon.progress, ['Polyatomic']))
				}

				camouflages.forEach((camouflage) => (weapon.progress[camouflage] = !current))
			})

			this.storeProgress()
		},
	},
})
