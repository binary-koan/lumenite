import isEmpty from 'lodash/isEmpty'
import fs from '../fs'

import { Rejection } from 'src/helpers/error-helpers'

import checkLooksLikeProject from '../queries/looks-like-project'

const TEMPLATES_ROOT = `${process.resourcesPath}/templates`

export default async function createProject(details) {
  if (isEmpty(details.template)) {
    throw new Rejection('No template specified')
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
    throw new Rejection(`Invalid path: ${path || '(empty path)'}`)
  }
}

async function checkValidTemplate(templatePath) {
  try {
    await fs.accessAsync(templatePath)
  } catch (err) {
    throw new Rejection(`Template cannot be accessed. Expected it to be a readable directory in ${templatePath}`)
  }

  await checkLooksLikeProject(templatePath)
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
