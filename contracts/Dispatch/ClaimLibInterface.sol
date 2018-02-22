pragma solidity ^0.4.18;

import 'contracts/zeppelin/SafeMath.sol';

library ClaimLibInterface {
  using SafeMath for uint;

  struct ClaimData {
    address claimedBy;
    uint claimDeposit;
    uint requiredDeposit;
    uint8 paymentModifier;
  } 

  function claim(
    ClaimData storage self,
    uint8 _paymentMod
  ) public returns (bool);

  function isClaimed(
    ClaimData storage self
  ) public view returns (bool);

  function refundDeposit(
    ClaimData storage self
  ) public returns (bool);
}
