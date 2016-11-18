import every from 'lodash/every'
import fs from '../fs'

export default async function checkLooksLikeProject(path) {
  return await requiredFilesExist(path) && await requiredFilesLookValid(path)
}

async function requiredFilesExist(path) {
  return await fs.existsAsync(`${path}/project.json`) &&
    await fs.existsAsync(`${path}/settings/general.json`)
}

async function requiredFilesLookValid(path) {
  const project = await fs.readJson(`${path}/project.json`)
  const generalSettings = await fs.readJson(`${path}/settings/general.json`)

  return project.editorVersion > 0 && Boolean(generalSettings.name)
}
