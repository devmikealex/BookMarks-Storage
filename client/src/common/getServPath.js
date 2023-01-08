const PROD_PATH = ''
const DEV_PATH = process.env.REACT_APP_SERVER

console.log('NODE_ENV mode = ' + process.env.NODE_ENV)
let path
if (process.env.NODE_ENV === 'production') {
    path = PROD_PATH
} else {
    path = DEV_PATH
}

window.PathToBMServer = path

export default function getServPath() {
    return path
}
