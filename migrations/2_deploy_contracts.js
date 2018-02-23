// Schedulers
const BlockScheduler = artifacts.require('./BlockScheduler.sol')
const TimestampScheduler = artifacts.require('./TimestampScheduler.sol')

// RequestFactory
const RequestFactory = artifacts.require('./RequestFactory.sol')

// TransactionRequestCore
const TransactionRequestCore = artifacts.require('./TransactionRequestCore.sol')

// Dispatch Wrappers
const ClaimLibDispatch = artifacts.require('./ClaimLibDispatch.sol')
const ExecutionLibDispatch = artifacts.require('./ExecutionLibDispatch.sol')
const GroveLibDispatch = artifacts.require('./GroveLibDispatch.sol')
const MathLibDispatch = artifacts.require('./MathLibDispatch.sol')
const PaymentLibDispatch = artifacts.require('./PaymentLibDispatch.sol')
const RequestLibDispatch = artifacts.require('./RequestLibDispatch.sol')
const RequestMetaLibDispatch = artifacts.require('./RequestMetaLibDispatch.sol')
const RequestScheduleLibDispatch = artifacts.require('./RequestScheduleLibDispatch.sol')
const SchedulerLibDispatch = artifacts.require('./SchedulerLibDispatch.sol')

// DispatchHub
const DispatchHub = artifacts.require('./DispatchHub.sol')
const Controlled = artifacts.require('./Controlled.sol')

// RequestTracker
const RequestTracker = artifacts.require('./RequestTracker.sol')

// Libraries
const ClaimLib = artifacts.require('./ClaimLib.sol')
const ExecutionLib = artifacts.require('./ExecutionLib.sol')
const GroveLib = artifacts.require('./GroveLib.sol')
const MathLib = artifacts.require('./MathLib.sol')
const PaymentLib = artifacts.require('./PaymentLib.sol')
const RequestLib = artifacts.require('./RequestLib.sol')
const RequestMetaLib = artifacts.require('./RequestMetaLib.sol')
const RequestScheduleLib = artifacts.require('./RequestScheduleLib.sol')
const SchedulerLib = artifacts.require('./SchedulerLib.sol')

// Misc.
const IterTools = artifacts.require('./IterTools.sol')
const SafeMath = artifacts.require('./SafeMath.sol')
const TransactionRecorder = artifacts.require('./TransactionRecorder.sol')

// Deployment Opts
const DEPLOY_OPTS = {
    gas: 2500000,
    gasPrice: web3.toWei('1', 'gwei'),
}

// Deploy script
module.exports = (deployer) => {
    // First deploy all the libraries we will dispatch to
    deployer.deploy([
        [TransactionRecorder, DEPLOY_OPTS],
        [IterTools, DEPLOY_OPTS],
        [MathLib, DEPLOY_OPTS],        deployer.link(SchedulerLib, BlockScheduler)
        deployer.link(RequestScheduleLib, BlockScheduler)
        deployer.link(PaymentLib, BlockScheduler)
        deployer.link(RequestLib, BlockScheduler)
        deployer.link(MathLib, BlockScheduler)

        return deployer.deploy(BlockScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8')        deployer.link(SchedulerLib, BlockScheduler)
        deployer.link(RequestScheduleLib, BlockScheduler)
        deployer.link(PaymentLib, BlockScheduler)
        deployer.link(RequestLib, BlockScheduler)
        deployer.link(MathLib, BlockScheduler)

        return deployer.deploy(BlockScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8')
        [GroveLib, DEPLOY_OPTS],
        [IterTools, DEPLOY_OPTS],
        [ExecutionLib, DEPLOY_OPTS],
        [RequestMetaLib, DEPLOY_OPTS],
        [SafeMath, DEPLOY_OPTS],
    ])
    .then(() => {
        deployer.link(SafeMath, ClaimLib)
        return deployer.deploy(ClaimLib, DEPLOY_OPTS)
    })
    .then(() => {
        deployer.link(ExecutionLib, PaymentLib)
        deployer.link(MathLib, PaymentLib)
        deployer.link(SafeMath, PaymentLib)
        return deployer.deploy(PaymentLib, DEPLOY_OPTS)
    })
    .then(() => {
        deployer.link(SafeMath, RequestScheduleLib)
        return deployer.deploy(RequestScheduleLib, DEPLOY_OPTS)
    })
    .then(() => {
        deployer.link(ClaimLib, RequestLib)
        deployer.link(ExecutionLib, RequestLib)
        deployer.link(MathLib, RequestLib)
        deployer.link(PaymentLib, RequestLib)
        deployer.link(RequestMetaLib, RequestLib)
        deployer.link(RequestScheduleLib, RequestLib)
        deployer.link(SafeMath, RequestLib)
        return deployer.deploy(RequestLib, DEPLOY_OPTS)
    })
    .then(() => {
        deployer.link(MathLib, SchedulerLib)
        deployer.link(PaymentLib, SchedulerLib)
        deployer.link(RequestLib, SchedulerLib)
        deployer.link(SafeMath, SchedulerLib)
        return deployer.deploy(SchedulerLib, DEPLOY_OPTS)
    })
    .then(() => {
        // Now we can deploy the DispatchHub
        return deployer.deploy(DispatchHub, DEPLOY_OPTS)
    })
    .then(() => {
        // And we can set the initial libraries
        const dispatchHub = DispatchHub.at(DispatchHub.address)
        return Promise.all([
            dispatchHub.set("ClaimLib", ClaimLib.address),
            dispatchHub.set("ExecutionLib", ExecutionLib.address),
            dispatchHub.set("GroveLib", GroveLib.address),
            dispatchHub.set("MathLib", MathLib.address),
            dispatchHub.set("PaymentLib", PaymentLib.address),
            dispatchHub.set("RequestLib", RequestLib.address),
            dispatchHub.set("RequestMetaLib", RequestMetaLib.address),
            dispatchHub.set("RequestScheduleLib", RequestScheduleLib.address),
            dispatchHub.set("SchedulerLib", SchedulerLib.address),
        ])
    })
    .then(() => {
        // We link each of the Dispatch contracts
        ClaimLibDispatch.unlinked_binary = ClaimLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        ExecutionLibDispatch.unlinked_binary = ExecutionLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        GroveLibDispatch.unlinked_binary = GroveLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        MathLibDispatch.unlinked_binary = MathLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        PaymentLibDispatch.unlinked_binary = PaymentLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestLibDispatch.unlinked_binary = RequestLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestMetaLibDispatch.unlinked_binary = RequestMetaLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestScheduleLibDispatch.unlinked_binary = RequestScheduleLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        SchedulerLibDispatch.unlinked_binary = SchedulerLibDispatch.unlinked_binary.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        return Promise.resolve('keep the promise chain going')
    })
    .then(() => {
        // Deploy the Dispatch contracts
        return deployer.deploy([
            [ClaimLibDispatch, DEPLOY_OPTS],
            [ExecutionLibDispatch, DEPLOY_OPTS],
            [GroveLibDispatch, DEPLOY_OPTS],
            [MathLibDispatch, DEPLOY_OPTS],
            [PaymentLibDispatch, DEPLOY_OPTS],
            [RequestLibDispatch, DEPLOY_OPTS],
            [RequestMetaLibDispatch, DEPLOY_OPTS],
            [RequestScheduleLibDispatch, DEPLOY_OPTS],
            [SchedulerLibDispatch, DEPLOY_OPTS],
        ])
    })
    .then(() => {
        // Now deploy the top level contracts using Dispatchers
        RequestTracker.link("GroveLib", GroveLibDispatch.address)
        RequestTracker.link("MathLib", MathLibDispatch.address)
        return deployer.deploy(RequestTracker, DEPLOY_OPTS)
    })
    .then(() => {
        TransactionRequestCore.link("ClaimLib", ClaimLibDispatch.address)
        TransactionRequestCore.link("ExecutionLib", ExecutionLibDispatch.address)
        TransactionRequestCore.link("MathLib", MathLibDispatch.address)
        TransactionRequestCore.link("PaymentLib", PaymentLibDispatch.address)
        TransactionRequestCore.link("RequestMetaLib", RequestMetaLibDispatch.address)
        TransactionRequestCore.link("RequestLib", RequestLibDispatch.address)
        TransactionRequestCore.link("RequestScheduleLib", RequestScheduleLibDispatch.address)
        TransactionRequestCore.link("SafeMath", SafeMath.address)
        return deployer.deploy(TransactionRequestCore, DEPLOY_OPTS)
    })
    .then(() => {
        RequestFactory.link("ClaimLib", ClaimLibDispatch.address)
        RequestFactory.link("MathLib", ExecutionLibDispatch.address)
        RequestFactory.link("RequestScheduleLib", RequestScheduleLibDispatch.address)
        RequestFactory.link("IterTools", IterTools.address)
        RequestFactory.link("PaymentLib", PaymentLibDispatch.address)
        RequestFactory.link("RequestLib", RequestLibDispatch.address)
        RequestFactory.link("RequestTracker", RequestTracker.address)
        RequestFactory.link("SafeMath", SafeMath.address)
        return deployer.deploy(RequestFactory, RequestTracker.address, TransactionRequestCore.address, DEPLOY_OPTS)
    })
    .then(() => {
        BlockScheduler.link("SchedulerLib", SchedulerLibDispatch.address)
        BlockScheduler.link("RequestScheduleLib", RequestScheduleLibDispatch.address)
        BlockScheduler.link("PaymentLib", PaymentLibDispatch.address)
        BlockScheduler.link("RequestLib", RequestLibDispatch.address)
        BlockScheduler.link("MathLib", MathLibDispatch.address)
        return deployer.deploy(BlockScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8', DEPLOY_OPTS)
    })
    .then(() => {
        TimestampScheduler.link("SchedulerLib", SchedulerLibDispatch.address)
        TimestampScheduler.link("RequestScheduleLib", RequestScheduleLibDispatch.address)
        TimestampScheduler.link("PaymentLib", PaymentLibDispatch.address)
        TimestampScheduler.link("RequestLib", RequestLibDispatch.address)
        TimestampScheduler.link("MathLib", MathLibDispatch.address)
        return deployer.deploy(TimestampScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8', DEPLOY_OPTS)
    })
    .then(() => {
        console.log('fin')
    })
}