// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Calculator {
    uint256 public x;
    uint256 public y;

    // Setter function to set value of x
    function setX(uint256 _x) public {
        x = _x;
    }

    // Setter function to set value of y
    function setY(uint256 _y) public {
        y = _y;
    }

    // Function to add x and y
    function add() public view returns (uint256) {
        return x + y;
    }

    // Function to subtract y from x
    function subtract() public view returns (uint256) {
        require(y <= x, "Subtraction result must be positive or zero");
        return x - y;
    }

    // Function to multiply x and y
    function multiply() public view returns (uint256) {
        return x * y;
    }

    // Function to divide x by y
    function divide() public view returns (uint256) {
        require(y > 0, "Division by zero is not allowed");
        return x / y;
    }
}
