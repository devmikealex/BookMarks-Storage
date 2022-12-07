import './Tag.css'

export default function Tag(props) {
    // const {} = props
    function test(e) {
        e.preventDefault()
        console.log('aaaa', e)
        const a = document.getElementById('tags')
        if (a.value === '') a.value = e.target.textContent
        else a.value += ', ' + e.target.textContent
    }

    return <button onClick={test}>{props.item.title}</button>
}
