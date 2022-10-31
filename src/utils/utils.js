// TODO: Might not be needed if camouflage pictures are never implemented.
const convertToKebabCase = (string) => {
	return string.replace(/\s+/g, '-').toLowerCase()
}

const copyToClipboard = (string, callback) => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(string).then(callback)
	} else {
		// Fallback if browser doesn't support clipboard API
		const el = document.createElement('textarea')
		el.value = string
		el.setAttribute('readonly', '')
		el.style.position = 'absolute'
		el.style.left = '-9999px'
		document.body.appendChild(el)
		el.select()
		document.execCommand('copy')
		document.body.removeChild(el)
		callback()
	}
}

const daysBetweenDates = (date1, date2) => {
	const oneDay = 24 * 60 * 60 * 1000
	return Math.round(Math.abs((date1 - date2) / oneDay))
}

const downloadJsonFile = (json, token) => {
	if (!token) token = 'orion'
	const dataStr = json
	const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
	const date = new Date().toLocaleDateString('sv-SE')
	const time = new Date().toLocaleTimeString('sv-SE').replace(/:/g, '-')
	const fileName = `${token}_${date}_${time}.json`
	const linkElement = document.createElement('a')
	linkElement.setAttribute('href', dataUri)
	linkElement.setAttribute('download', fileName)
	linkElement.click()
}

const filterObject = (obj, keys) => {
	return Object.keys(obj)
		.filter((key) => !keys.includes(key))
		.reduce((o, key) => {
			o[key] = obj[key]
			return o
		}, {})
}

const groupBy = (list, keyGetter) => {
	const map = {}
	list.forEach((item) => {
		const key = keyGetter(item)

		if (!map[key]) {
			map[key] = [item]
		} else {
			map[key].push(item)
		}
	})
	return map
}

const roundToTwoDecimals = (num) => {
	return Math.round((num + Number.EPSILON) * 100) / 100
}

export {
	convertToKebabCase,
	copyToClipboard,
	daysBetweenDates,
	downloadJsonFile,
	filterObject,
	groupBy,
	roundToTwoDecimals,
}
