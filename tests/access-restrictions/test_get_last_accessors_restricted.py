def test_last_call_data_restrictions(deployed_contracts, eth_coinbase):
    assert False, "This needs to actually be fleshed out"
    alarm = deployed_contracts.Alarm
    client_contract = deployed_contracts.PassesUInt

    alarm.client.defaults['from'] = eth_coinbase
    client_contract.client.defaults['from'] = eth_coinbase

    client_contract.scheduleIt.sendTransaction(alarm.address, 3)

    import ipdb; ipdb.set_trace()

    assert client_contract.value.call() == 0

    callKey = alarm.getLastCallKey.call()
    assert callKey is not None
    alarm.doCall.sendTransaction(callKey)

    assert client_contract.value.call() == 3
    call_data = alarm.getCallData.call(callKey)
    assert call_data == '\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03'
