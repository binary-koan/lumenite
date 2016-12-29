import { CORE_FOLDERS } from '../paths'

import SpriteAssetEditor from 'src/components/editors/assets/sprite'
import FontAssetEditor from 'src/components/editors/assets/font'
import TilemapAssetEditor from 'src/components/editors/assets/tilemap'
import VideoAssetEditor from 'src/components/editors/assets/video'

const IMAGE_MATCHERS = ['*.png', '*.jpg', '*.jpeg', '*.gif']

export const SPRITE_FILE = {
  id: 'sprite',
  root: CORE_FOLDERS.assets,
  extension: '.sprite.json',
  editor: SpriteAssetEditor,

  import: {
    matchers: IMAGE_MATCHERS,
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

export const FONT_FILE = {
  id: 'font',
  root: CORE_FOLDERS.assets,
  extension: '.font.json',
  editor: FontAssetEditor,

  import: {
    matchers: ['*.ttf', '*.otf'],
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

export const TILEMAP_FILE = {
  id: 'tilemap',
  root: CORE_FOLDERS.assets,
  extension: '.tilemap.json',
  editor: TilemapAssetEditor,

  import: {
    matchers: IMAGE_MATCHERS,
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}

export const VIDEO_FILE = {
  id: 'video',
  root: CORE_FOLDERS.assets,
  extension: '.video.json',
  editor: VideoAssetEditor,

  import: {
    matchers: ['*.webm', '*.mp4'],
    buildWrapper({ filename }) {
      return {
        source: filename
      }
    }
  }
}
