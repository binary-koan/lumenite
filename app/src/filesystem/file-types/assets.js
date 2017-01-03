import { CORE_FOLDERS } from '../paths'

const IMAGE_MATCHERS = ['*.png', '*.jpg', '*.jpeg', '*.gif']

const SPRITE_FILE = {
  id: 'sprite',
  root: CORE_FOLDERS.assets,

  import: {
    matchers: IMAGE_MATCHERS,
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

const FONT_FILE = {
  id: 'font',
  root: CORE_FOLDERS.assets,

  import: {
    matchers: ['*.ttf', '*.otf'],
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

const TILESET_FILE = {
  id: 'tileset',
  root: CORE_FOLDERS.assets,

  import: {
    matchers: IMAGE_MATCHERS,
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

const VIDEO_FILE = {
  id: 'video',
  root: CORE_FOLDERS.assets,

  import: {
    matchers: ['*.webm', '*.mp4'],
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

export default [SPRITE_FILE, FONT_FILE, TILESET_FILE, VIDEO_FILE]
