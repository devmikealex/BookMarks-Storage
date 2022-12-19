import { myFetch_new } from './fetch'

export default function getURLinfo(toLog, setLoading, setTitleValue) {
    // console.log('asdasdasdasdakjdhsdkfghsdfghsldkj')
    // const title = document.getElementById('inp-title')
    const url = document.getElementById('inp-url').value
    console.log('🚀 ~ file: geturlinfo.js:7 ~ getURLinfo ~ url', url)
    myFetch_new({ url }, 'geturlinfo', 'POST').then((result) => {
        // console.log('myFetch result', result)
        // title.value = result?.json?.title
        setLoading(false)
        if (result.error) toLog(result.error)
        if (result.json) setTitleValue(result.json.title)
    })
}
