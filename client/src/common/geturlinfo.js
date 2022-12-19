import { myFetch_new } from './fetch'

export default async function getURLinfo(
    toLog
    // setLoading,
    // setTitleValue,
    // setDecriptionValue
) {
    // console.log('asdasdasdasdakjdhsdkfghsdfghsldkj')
    // const title = document.getElementById('inp-title')
    const url = document.getElementById('inp-url').value
    const result = await myFetch_new({ url }, 'geturlinfo', 'POST')
    // console.log('myFetch result', result)
    // title.value = result?.json?.title
    // setLoading(false)
    if (result.error) toLog(result.error)
    if (result.json) {
        // setTitleValue(result.json.title)
        // setDecriptionValue(result.json.description)
        return result.json
    }
}
