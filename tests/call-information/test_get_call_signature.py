from populus.utils import wait_for_transaction


deploy_contracts = [
    "Alarm",
    "NoArgs",
]


def test_get_call_signature(deploy_client, deployed_contracts):
    alarm = deployed_contracts.Alarm
    client_contract = deployed_contracts.NoArgs

    txn_hash = client_contract.scheduleIt.sendTransaction(alarm._meta.address)
    wait_for_transaction(deploy_client, txn_hash)

    call_key = alarm.getLastCallKey.call()
    assert call_key

    alarm.getCallABISignature.call(call_key) == '\xb2\x9f\x085'
    alarm.getCallABISignature.call(call_key) == client_contract.doIt.encoded_abi_signature
