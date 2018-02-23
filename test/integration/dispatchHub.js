const { expect } = require('chai')

const DispatchHub = artifacts.require('./DispatchHub.sol')

// Contracts to test with
const ClaimLib = artifacts.require('./ClaimLib.sol')
// const ClaimLibDispatch = artifacts.require('./ClaimLibDispatch.sol')
const PaymentLib = artifacts.require('./PaymentLib.sol')
const PaymentLibDispatch = artifacts.require('./PaymentLibDispatch.sol')

const BigNumber = require('bignumber.js')
const config = require('../../config')

contract("DispatchHub", (accounts) => {
    it("can get addresses from the deployed DispatchHub", async () => {
        const dHub = await DispatchHub.deployed()
        expect(dHub.address).to.exist

        const realClaimLibAddr = (await ClaimLib.deployed()).address
        const receivedClaimLibAddr = await dHub.get("ClaimLib")
        expect(realClaimLibAddr).to.equal(receivedClaimLibAddr)
    })
    it("using the dispatcher contract works", async () => {
        const dHub = await DispatchHub.deployed()
        expect(dHub.address).to.exist

        const callGas = new BigNumber(3000000)
        const callValue = new BigNumber(123454321)
        const gasPrice = new BigNumber(config.web3.utils.toWei("55", "gwei"))
        const fee = new BigNumber(config.web3.utils.toWei("120", "finney"))
        const bounty = new BigNumber(config.web3.utils.toWei("250", "finney"))
    
        const paymentLibDispatch = await PaymentLib.at((await PaymentLibDispatch.deployed()).address)
        expect(paymentLibDispatch.address).to.exist

        const res = await paymentLibDispatch.computeEndowment(
            bounty,
            fee,
            callGas,
            callValue,
            gasPrice,
            180000
        )
        console.log(res)

    })
})