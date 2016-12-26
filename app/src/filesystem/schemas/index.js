export const BASIC_SCHEMAS = Object.freeze({
  project: { ext: '.json', schema: require('./global/project') }
})

export const SETTINGS_SCHEMAS = Object.freeze({
  general: { ext: '.general-settings.json', schema: require('./settings/general') }
})

export const ASSETS_SCHEMAS = Object.freeze({
})

export const BEHAVIOURS_SCHEMAS = Object.freeze({
})

export const SCENES_SCHEMAS = Object.freeze({
})

export const ASSET_FILE_TYPES = [
  '.png', '.jpg', '.jpeg', '.gif', // Images
  '.wav', '.mp3', '.ogg', // Audio
  '.ttf', '.otf', '.woff', // Fonts
  '.webm', '.ogv', // Video
  '.sprite.json', '.image.json', '.font.json', '.tilemap.json', '.video.json'
]

export const BEHAVIOUR_FILE_TYPES = ['.ts', '.script.json']

export const SCENES_FILE_TYPES = ['.scene.json']
