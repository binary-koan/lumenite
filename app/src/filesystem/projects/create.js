import isEmpty from 'lodash/isEmpty'
import fs from '../fs'

import checkLooksLikeProject from './looks-like-project'

const TEMPLATES_ROOT = `${process.resourcesPath}/templates`

export default async function createProject(details) {
  if (isEmpty(details.template)) {
    throw new Error('No template specified')
  }

  const templatePath = `${TEMPLATES_ROOT}/${details.template}`
  await Promise.all([checkValidPath(details.path), checkValidTemplate(templatePath)])

  await fs.mkdirsAsync(details.path)
  await fs.copyAsync(templatePath, details.path)

  await fs.outputJsonAsync(
    `${details.path}/project.json`,
    generateProjectJson(),
    { spaces: 2 }
  )
  await fs.outputJsonAsync(
    `${details.path}/settings/general.json`,
    generateGeneralSettingsJson(details),
    { spaces: 2 }
  )
}

async function checkValidPath(path) {
  if (isEmpty(path) || !path.includes('/')) {
    throw new Error(`Invalid path: ${path || '(empty path)'}`)
  }
}

async function checkValidTemplate(templatePath) {
  const exists = await fs.existsAsync(templatePath)
  if (!exists) {
    throw new Error(`Template does not exist: ${template}. Expected it to be in ${templatePath}`)
  }

  await checkLooksLikeProject(templatePath)
}

function generateProjectJson() {
  return {
    editorVersion: app.getVersion()
  }
}

function generateGeneralSettingsJson({ name }) {
  return {
    name,
    version: '0.0.1'
  }
}
