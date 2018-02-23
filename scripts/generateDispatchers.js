const fs = require('fs')
const template = fs.readFileSync('./templates/Dispatch.solt')

const names = [
    "ClaimLib",
    "ExecutionLib",
    "GroveLib",
    "MathLib",
    "PaymentLib",
    "RequestLib",
    "RequestMetaLib",
    "RequestScheduleLib",
    "SchedulerLib",
]

names.forEach((name) => {
    const CONTRACT_NAME = name
    const res = eval('`' + template + '`')
    fs.writeFileSync(`./contracts/Dispatch/Generated/${CONTRACT_NAME}Dispatch.sol`, res)
})

console.log("Generated dispatch contracts.");