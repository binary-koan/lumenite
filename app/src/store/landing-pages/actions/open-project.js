export default async function openProject({ commit }, dirname) {
  try {
    await projectInfo(dirname)

    commit(projectTypes.LOAD, dirname)
  } catch (err) {
    setError(err, commit)
  }
}
