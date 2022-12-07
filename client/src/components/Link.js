import WebLogger from 'mylogger/web-version'
import myFetch from '../common/fetch'

import './Link.css'

const PATH_TO_PREVIEW = process.env.REACT_APP_SERVER + '/static/images/'

const log = new WebLogger(null, 'LINK', 'red')

export default function Link(props) {
    // const {} = props

    async function incrementCounter(id) {
        log.verbs('--- Start function -incrementCounter-')
        log.debug('id:', id)
        const res = await myFetch(null, 'links/countinc/' + id, 'GET')
        // log.debug('---------myFetch result', res)
        const { resultJSON } = res
        log.silly('New clicks', resultJSON.clicks)
    }

    // function incrementCounter_old(id) {
    //     log.verbs('--- Start function -incrementCounter-')
    //     log.debug('id:', id)
    //     fetch(process.env.REACT_APP_SERVER + '/links/countinc/' + id)
    //         .then((response) => response.json())
    //         .then((result) => log.debug('incrementCounter fetch return:', result.clicks))
    // }

    return (
        <div>
            {props.item.title}
            <br />
            <a
                href={props.item.url}
                onClick={() => incrementCounter(props.item._id)}
                onAuxClick={() => incrementCounter(props.item._id)}
                target='_blank'
                rel='noopener noreferrer'
            >
                {props.item.url}
            </a>
            <br />
            {props.item.description}
            <br />
            {props.item.tags.map((item) => {
                return <div className='tgsss'>{item.title}</div>
            })}
            <br />
            {props.item.images.map((item) => {
                return <img src={PATH_TO_PREVIEW + item} width='200' alt='' key={item} />
            })}
            <br />
            {props.item.clicks}
            <br />
            {props.item.crt_date} - {props.item.mod_date}
            <hr />
        </div>
    )
}
