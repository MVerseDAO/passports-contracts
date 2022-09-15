// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IPassport {
    function balanceOf(address account, uint256 id) external view returns (uint256);

    function safeTransferFrom(
        address from,
        address to,
        uint256 passportId,
        uint256 amount,
        bytes calldata data
    ) external;
}