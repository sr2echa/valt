// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract OffChainAPICaller is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    // Define your Chainlink job details and LINK token details
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    // Event to emit results
    event RequestFulfilled(bytes32 requestId, uint256 result);

    constructor() {
        // Initialize the Chainlink Client
        setPublicChainlinkToken();
        oracle = /* Your Chainlink Oracle Address */;
        jobId = /* Your Chainlink Job ID */;
        fee = /* LINK token fee amount */;
    }

    // Function to request data from an off-chain API
    function requestData(string memory url, string memory path) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL and the path to the desired data
        request.add("get", url);
        request.add("path", path);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Callback function for Chainlink nodes
    function fulfill(bytes32 _requestId, uint256 _result) public recordChainlinkFulfillment(_requestId) {
        emit RequestFulfilled(_requestId, _result);
    }
}
