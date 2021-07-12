const MessageBoard = artifacts.require("MessageBoard");

contract("MessageBoard", async accounts => {
    it("Add message to array", async () => {
      const messageBoard = await MessageBoard.deployed();
      await messageBoard.addMessage('test1');
      const msg = await messageBoard.getMessages();
      assert.equal(msg[0], 'test1');
    });
});