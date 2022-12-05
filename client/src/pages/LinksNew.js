import myFetch from '../common/fetch'
import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'LinksNEW', 'magenta')

export default function LinksNew() {
    log.verbs('--- Start function -LinksNew-')

    function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()
        const newLink = {
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
        }
        myFetch([newLink], 'links', 'POST').then((result) => {
            log.debug('result', result)
        })
        log.verbs('--- Exit function -Send-')
    }
    log.verbs('--- Start Render -LinksNew-')
    return (
        <>
            <h1>Links NEW</h1>
            <form onSubmit={Send}>
                <input type='text' name='url' placeholder='url' />
                <input type='text' name='title' placeholder='title' />
                <input type='text' name='description' placeholder='description' />
                <button>Send</button>
            </form>
        </>
    )
}
