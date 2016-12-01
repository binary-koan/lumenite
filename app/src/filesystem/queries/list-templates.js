import fs from '../fs'

import { TEMPLATES_PATH } from '../paths'
import projectInfo from './project-info'

export default async function listTemplates() {
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
