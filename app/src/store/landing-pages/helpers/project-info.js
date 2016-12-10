import every from 'lodash/every'

import fs from 'src/filesystem/fs'
import { Rejection } from 'src/helpers/error-helpers'

export default async function projectInfo(path) {
  const baseMessage = `The directory ‘${path}’ doesn't appear to be a valid project.`

  let project, generalSettings;

  try {
    project = await fs.readJsonAsync(`${path}/Project.json`)
    generalSettings = await fs.readJsonAsync(`${path}/Settings/General.general-settings.json`)
  } catch (e) {
    console.log(e)
    throw new Rejection(`${baseMessage} Required files not found.`)
  }

  if (!/^\d+\.\d+\.\d+/.test(project.editorVersion)) {
    throw new Rejection(`${baseMessage} Invalid editor version.`)
  }

  if (!Boolean(generalSettings.name)) {
    throw new Rejection(`${baseMessage} No project name specified.`)
  }

  return { project, generalSettings }
}
