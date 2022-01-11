require('dotenv').config();
const AWSUtil = require('./util')

const source = "files/60112d2e84e5a40022304f21/1641014056489.pdf"
const destination = "60112d2e84e5a40022304f21/61adc38218b6c90015828ea7/1641014056489.pdf"
AWSUtil.moveFile(source, destination)
.then(() => {
    AWSUtil.deleteFile(source)
})