import { CORE_FOLDERS } from '../paths'

import GeneralSettingsEditor from 'src/components/editors/settings/general'

export const GENERAL_SETTINGS_FILE = {
  id: 'general-settings',
  root: CORE_FOLDERS.settings,
  editor: GeneralSettingsEditor
}
