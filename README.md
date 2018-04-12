# Ethereum Alarm Clock

[![Join the chat at https://gitter.im/ethereum-alarm-clock/ethereum-alarm-clock](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum-alarm-clock/ethereum-alarm-clock?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/ethereum-alarm-clock/ethereum-alarm-clock.svg?branch=master)](https://travis-ci.org/chronologic/ethereum-alarm-clock)
[![Documentation Status](https://readthedocs.org/projects/ethereum-alarm-clock/badge/?version=latest)](http://ethereum-alarm-clock.readthedocs.io/en/latest/?badge=latest)


Source code for the [Ethereum Alarm Clock service](http://www.ethereum-alarm-clock.com/)

## What is the EAC (Ethereum Alarm Clock)

The Ethereum Alarm Clock is a smart contract protocol for scheduling Ethereum transactions 
to be executed in the future. It allows any address to set the parameters of a transaction and 
allow clients to call these transactions during the desired window. The EAC is agnostic to callers
so can be used by both human users and other smart contracts. Since all of the scheduling logic is 
contained in smart contracts, transactions can be scheduled from solidity.

Additionally the EAC faciliates the execution of this pool of scheduled transactions through a client. 
The EAC client continuously runs and searches for transactions which are scheduled to be executed soon 
then claims and executes them. For the EAC to be successful it depends on users who run execution clients. 
There are a few ways incentives for running these execution clients are baked in to the protocol itself, 
notably the claiming mechanism and the reward payment. 

## Running the tests

_Tests have been ported to Javascript and can now be run using the Truffle Suite_

Originally the test suite was written in Python using the Populus framework, these still exist for reference 
under the populus-tests/ directory. However, we have ported over the suite to use the Truffle framework since 
this may be more familiar to developers who know the Ethereum tooling in Javascript. These tests can be found in 
the [test/](test) directory.

If you would like to run the test please set up your environment to use node v8.0.0, truffle v4.1.5 and the latest
ganache-cli.

```
nvm use 8.0.0
npm i
npm i -g truffle@4.1.5 
npm i -g ganache-cli
```

Start ganache-cli in a terminal screen by running `ganache-cli`.

In another terminal screen run `npm test` at the root of the directory. This will run the npm test script that 
splits up the tests into different runtimes. The tests are split because the EAC is a moderately sized project and 
running all the tests with one command has a tendency to break down the ganache tester chain.

Each time you run the tests it is advised to rebuild your build/ folder, as this may lead to bugs if not done. You 
can do this by running the command `rm -rf build/`.

## Documentation

Documentation can be found on [Read the Docs](https://ethereum-alarm-clock.readthedocs.io/en/latest/).

## Using the CLI

Please see the [`eac.js-cli`](https://github.com/ethereum-alarm-clock/eac.js-cli) repository for the commandline client.

## Deployment

The EAC contracts are deployed on both the Kovan testnet at the addresses below.

```
Kovan

blockScheduler, 0x301740b7a856670fc8546909171ee56f242caf96
timestampScheduler, 0x3fa0f6bde081872162b253bb91887c2c0ccab518

baseScheduler, 0x5cd32de45015e78242586f41829cafac2e324aef
claimLib, 0x2d354d837cdfdfa00e606dcf7fe6e5edc78de8dd
executionLib, 0x93f9859305ceee293014f9c33c47c99243853fed
iterTools, 0xb96f0f9f4f64ceeeef0069c912afcae817680bab
mathLib, 0x7299245aad6feba0ed6e4f72119c193211d28f60
paymentLib, 0x5725c0b1601ef3704a20ed3792486c5afd0a8d33
requestFactory, 0x8efd30c71194087158e0e59c3a18c6da3361ab54
requestLib, 0xbcb433108e7673e8b3debbec9fc7d71c654648dc
requestMetaLib, 0xd423afccfe4cccf72a8de9126ed5ccf2c651a300
requestScheduleLib, 0x885608b733bb3541b443b50509d13edd6083e5ae
safeMath, 0xdae0f0169880c99907989743dcbb5abc87dcb755
transactionRequestCore, 0xae3c5e6271d703ae11606ceb611ab3e03e196ee3
transactionRecorder, 0xcf2ce51dcf022c1e63ae28be1af7634f53e3af57

```

## Thanks and support
[<img src="https://s3.amazonaws.com/chronologic.network/ChronoLogic_logo.svg" width="128px">](https://github.com/chronologic)
