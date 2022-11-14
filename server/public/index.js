const buttons = document.getElementsByTagName('button')
buttons[0].addEventListener('click', async () => {
    console.log('click')

    const linkInputTitle = document.getElementById('link-input-title')
    const linkInputUrl = document.getElementById('link-input-url')
    const linkInputDescription = document.getElementById('link-input-description')

    const rawResponse = await fetch('http://127.0.0.1:3000/links', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: linkInputTitle.value,
            url: linkInputUrl.value,
            description: linkInputDescription.value
        }),
    })
    const status = await rawResponse.status
    console.log("🚀 status", status)
    // const content = await rawResponse.text()
    const content = await rawResponse.json()
    console.log("🚀 content", content)
})
buttons[1].addEventListener('click', async () => {
    const linkInputUrl = document.getElementById('link-input-url')
    const rawResponse = await fetch('http://127.0.0.1:3018/tags/filter/', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: linkInputUrl.value
    })
    
    console.log("🚀 ~ file: index.js ~ line 36 ~ buttons[1].addEventListener ~ linkInputUrl.value", linkInputUrl.value)
    const status = await rawResponse.status
    console.log("🚀 status", status)
    // const content = await rawResponse.text()
    const content = await rawResponse.json()
    console.log("🚀 content", content)
})