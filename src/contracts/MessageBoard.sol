pragma solidity 0.8.6;

contract MessageBoard {

    string[] internal messages;

    function addMessage(string calldata _message) public {
        messages.push(_message);
    }

    function getMessages() public view returns(string[] memory) {
        return messages;
    }
}