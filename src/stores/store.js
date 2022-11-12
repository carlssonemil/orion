import Vue from 'vue'
import { defineStore } from 'pinia'
import { filterObject } from '../utils/utils'
import defaultWeapons from '../data/weapons'
import defaultFilters from '../data/defaults/filters'
import weaponRequirements from '../data/weaponRequirements'
import camouflageRequirements from '../data/camouflageRequirements'

const token = import.meta.env.MODE === 'production' ? 'orion' : 'orion-dev'

export const useStore = defineStore({
	id: 'store',

	state: () => ({
		beganGrind: null,
		camouflageRequirements: { ...camouflageRequirements },
		favorites: {
			camouflages: [],
			weapons: [],
		},
		filters: {},
		weaponRequirements: { ...weaponRequirements },
		weapons: [],
	}),

	getters: {
		categories: (state) => Array.from(new Set(state.weapons.map((weapon) => weapon.category))),
		isFavorite: (state) => (type, name) => state.favorites[type].includes(name),
		getFavorites: (state) => (type) => state.favorites[type],
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

		setFavorites({ camouflages, weapons }) {
			this.favorites.camouflages = camouflages || []
			this.favorites.weapons = weapons || []
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

			const { weapons, filters, beganGrind, favorites } = JSON.parse(storage)

			if (weapons) this.setWeapons(weapons)
			if (filters) this.setFilters(filters)
			if (beganGrind) this.beganGrind = beganGrind
			if (favorites) this.setFavorites(favorites)
		},

		storeProgress() {
			localStorage.setItem(
				token,
				JSON.stringify({
					weapons: this.weapons,
					filters: this.filters,
					beganGrind: this.beganGrind || new Date(),
					favorites: this.favorites,
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

		toggleFavorite({ type, name }) {
			const index = this.favorites[type].findIndex((favorite) => favorite === name)

			if (index === -1) {
				this.favorites[type].push(name)
			} else {
				this.favorites[type].splice(index, 1)
			}

			this.storeProgress()
		},

		toggleCamouflageCompleted(weaponName, camouflage, current) {
			this.weapons.find((w) => w.name === weaponName).progress[camouflage] = !current
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
