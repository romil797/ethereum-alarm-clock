// const ClaimLib = artifacts.require('ClaimLib.sol')
// const Dispatcher = artifacts.require('Dispatcher.sol')
// const DispatcherStorage = artifacts.require('DispatcherStorage.sol')
// const RequestLib = artifacts.require('RequestLib.sol')

// contract('Dispatcher', (accounts) => {
//     describe('Should link correctly', () => {
//         it('works', async () => {
//             const claimLib = await ClaimLib.new()
//             const dispatcherStorage = await DispatcherStorage.new()
//             await dispatcherStorage.set("ClaimLib", claimLib.address)
//             Dispatcher.unlinked_binary = Dispatcher.unlinked_binary
//                 .replace('1111222233334444555566667777888899990000',
//                     dispatcherStorage.address.slice(2))
//             const dispatcher = await Dispatcher.new()
//             RequestLib.link('ClaimLibInterface', dispatcher.address)
//             const requestLib = await RequestLib.new()

//         })
//     })
// })