export default {
  name: {
    type: String,
    required: true,
    allowEmpty: false
  },
  description: {
    type: String
  },
  version: {
    type: String
  }
}

export const layout = {
  groups: [
    {
      title: 'Info',
      fields: [
        ['name', 'version'],
        ['description']
      ]
    }
  ]
}
