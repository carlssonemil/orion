import Vue from 'vue'
import { defineStore } from 'pinia'
import { filterObject } from '../utils/utils'
import defaultWeapons from '../data/weapons'
import defaultFilters from '../data/defaults/filters'
import defaultPreferences from '../data/defaults/preferences'
import weaponRequirements from '../data/weaponRequirements'
import masteryRequirements from '../data/masteryRequirements'
import camouflageRequirements from '../data/camouflageRequirements'
import camouflageNameChanges from '../data/camouflageNameChanges'

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
		masteryRequirements: { ...masteryRequirements },
		weapons: [],
		preferences: {
			layout: 'grid',
		},
	}),

	getters: {
		isFavorite: (state) => (type, name) => state.favorites[type].includes(name),
		getFavorites: (state) => (type) => state.favorites[type],
		weaponCategories: (state) =>
			Array.from(new Set(state.weapons.map((weapon) => weapon.category))),
	},

	actions: {
		setWeapons(weapons) {
			this.weapons = JSON.parse(JSON.stringify(defaultWeapons))

			if (weapons) {
				weapons.forEach((weapon) => {
					const index = this.weapons.findIndex((w) => w.name === weapon.name)

					if (index !== -1) {
						Object.keys(weapon.progress).forEach((camouflage) => {
							// Handle changes to camouflage names
							if (camouflage in camouflageNameChanges && weapon.progress[camouflage]) {
								this.weapons[index].progress[camouflageNameChanges[camouflage]] = true
							} else if (camouflage in this.weapons[index].progress) {
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

		setPreferences(preferences) {
			this.preferences = JSON.parse(JSON.stringify(defaultPreferences))

			if (preferences) {
				Object.keys(preferences).forEach((key) => {
					if (key in defaultPreferences) {
						this.preferences[key] = preferences[key]
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

			const { weapons, filters, beganGrind, favorites, preferences } = JSON.parse(storage)

			if (weapons) this.setWeapons(weapons)
			if (filters) this.setFilters(filters)
			if (beganGrind) this.beganGrind = beganGrind
			if (favorites) this.setFavorites(favorites)
			if (preferences) this.setPreferences(preferences)
		},

		storeProgress() {
			localStorage.setItem(
				token,
				JSON.stringify({
					weapons: this.weapons,
					filters: this.filters,
					beganGrind: this.beganGrind || new Date(),
					favorites: this.favorites,
					preferences: this.preferences,
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

		toggleCamouflageCompleted(weaponName, camouflage, current, mastery) {
			const progress = mastery ? 'masteryProgress' : 'progress'
			this.weapons.find((w) => w.name === weaponName)[progress][camouflage] = !current
			this.storeProgress()
		},

		toggleWeaponCompleted(weapon, current, mastery) {
			const progress = mastery ? 'masteryProgress' : 'progress'
			const selectedWeapon = this.weapons.find((w) => w.name === weapon.name)
			Object.keys(selectedWeapon[progress]).forEach(
				(camouflage) => (selectedWeapon[progress][camouflage] = !current)
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
