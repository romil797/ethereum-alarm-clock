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
        [MathLib, DEPLOY_OPTS],
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
        ClaimLibDispatch.bytecode = ClaimLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        ExecutionLibDispatch.bytecode = ExecutionLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        GroveLibDispatch.bytecode = GroveLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        MathLibDispatch.bytecode = MathLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        PaymentLibDispatch.bytecode = PaymentLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestLibDispatch.bytecode = RequestLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestMetaLibDispatch.bytecode = RequestMetaLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        RequestScheduleLibDispatch.bytecode = RequestScheduleLibDispatch.bytecode.replace(
            '1111222233334444555566667777888899990000',
            DispatchHub.address.slice(2)
        )
        SchedulerLibDispatch.bytecode = SchedulerLibDispatch.bytecode.replace(
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
        TransactionRequestCore.link("RequestLib", RequestLib.address) // Why doesn't d_ispatch work here? Is it because of struct?
        TransactionRequestCore.link("RequestScheduleLib", RequestScheduleLibDispatch.address)
        TransactionRequestCore.link("SafeMath", SafeMath.address)
        return deployer.deploy(TransactionRequestCore, DEPLOY_OPTS)
    })
    .then(() => {
        RequestFactory.link("ClaimLib", ClaimLib.address)
        RequestFactory.link("MathLib", ExecutionLib.address)
        RequestFactory.link("RequestScheduleLib", RequestScheduleLib.address)
        RequestFactory.link("IterTools", IterTools.address)
        RequestFactory.link("PaymentLib", PaymentLib.address)
        RequestFactory.link("RequestLib", RequestLib.address)
        RequestFactory.link("RequestTracker", RequestTracker.address)
        RequestFactory.link("SafeMath", SafeMath.address)
        return deployer.deploy(RequestFactory, RequestTracker.address, TransactionRequestCore.address, DEPLOY_OPTS)
    })
    .then(() => {
        BlockScheduler.link("SchedulerLib", SchedulerLib.address)
        BlockScheduler.link("RequestScheduleLib", RequestScheduleLib.address)
        BlockScheduler.link("PaymentLib", PaymentLib.address)
        BlockScheduler.link("RequestLib", RequestLib.address)
        BlockScheduler.link("MathLib", MathLib.address)
        return deployer.deploy(BlockScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8', DEPLOY_OPTS)
    })
    .then(() => {
        TimestampScheduler.link("SchedulerLib", SchedulerLib.address)
        TimestampScheduler.link("RequestScheduleLib", RequestScheduleLib.address)
        TimestampScheduler.link("PaymentLib", PaymentLib.address)
        TimestampScheduler.link("RequestLib", RequestLib.address)
        TimestampScheduler.link("MathLib", MathLib.address)
        return deployer.deploy(TimestampScheduler, RequestFactory.address, '0xecc9c5fff8937578141592e7E62C2D2E364311b8', DEPLOY_OPTS)
    })
    .then(() => {
        console.log('fin')
    })
}