import fs from 'src/filesystem/fs'
import { TEMPLATES_PATH } from 'src/filesystem/paths'

import projectInfo from '../helpers/project-info'
import setError from '../helpers/set-error'

import types from '../types'

async function listTemplatesFromDisk() {
  const list = await fs.readdirAsync(TEMPLATES_PATH)

  return Promise.all(
    list.map(async dirname => {
      const info = await projectInfo(`${TEMPLATES_PATH}/${dirname}`)

      return {
        id: dirname,
        name: info.generalSettings.name,
        description: info.generalSettings.description
      }
    })
  )
}

export default async function findTemplates({ commit }) {
  try {
    const templates = await listTemplatesFromDisk()

    commit(types.SET_TEMPLATES, templates)
    commit(types.SET_NEW_PROJECT_TEMPLATE, templates[0].id)
  } catch (err) {
    setError(err, commit)
  }
}
