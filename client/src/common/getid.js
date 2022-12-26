export default function* getID() {
    let id = 0
    while (1) {
        id++
        console.log('getID yield id', id)
        yield id
    }
}
