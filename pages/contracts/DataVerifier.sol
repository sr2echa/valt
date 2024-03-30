// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./OffChainAPICaller.sol";

contract DataVerifier is OffChainAPICaller {
    // Mapping to store verification status of data
    mapping(bytes32 => bool) public verificationStatus;

    // Function to initiate verification of data stored on Arweave
    function verifyDataOnArweave(string memory dataId) public {
        bytes32 requestId = requestData("https://arweave.net/verify", dataId);
        verificationStatus[requestId] = false; // Set initial status as false
    }

    // Override fulfill function to handle verification result
    function fulfill(bytes32 _requestId, uint256 _result) public override {
        super.fulfill(_requestId, _result);
        verificationStatus[_requestId] = _result == 1 ? true : false;
    }
}
