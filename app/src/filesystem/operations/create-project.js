import isEmpty from 'lodash/isEmpty'
import path from 'path'
import fs from '../fs'

import { Rejection } from 'src/helpers/error-helpers'

import { TEMPLATES_PATH } from '../paths'
import projectInfo from '../queries/project-info'

export default async function createProject(details) {
  if (isEmpty(details.template)) {
    throw new Rejection('No template specified')
  }

  const templatePath = `${TEMPLATES_PATH}/${details.template}`
  await Promise.all([checkValidPath(details.path), checkValidTemplate(templatePath)])

  await fs.mkdirsAsync(details.path)
  await fs.copyAsync(templatePath, details.path)

  await fs.outputJsonAsync(
    `${details.path}/Project.json`,
    generateProjectJson(),
    { spaces: 2 }
  )
  await fs.outputJsonAsync(
    `${details.path}/Settings/General.general-settings.json`,
    generateGeneralSettingsJson(details),
    { spaces: 2 }
  )
}

async function checkValidPath(pathName) {
  if (isEmpty(pathName) || !pathName.includes(path.sep)) {
    throw new Rejection(`Invalid path: ${pathName || '(empty path)'}`)
  }
}

async function checkValidTemplate(templatePath) {
  try {
    await fs.accessAsync(templatePath)
  } catch (err) {
    throw new Rejection(`Template cannot be accessed. Expected it to be a readable directory in ${templatePath}`)
  }

  await projectInfo(templatePath)
}

function generateProjectJson() {
  return {
    editorVersion: process.env.npm_package_version
  }
}

function generateGeneralSettingsJson({ name }) {
  return {
    name,
    version: '0.0.1'
  }
}
