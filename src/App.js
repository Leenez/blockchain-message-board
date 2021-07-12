import React, { useState, useEffect } from 'react';
import MessageBoard from './build\\contracts/MessageBoard.json';
import MessageForm from './components/MessageForm.js';
import MessageList from './components/MessageList.js';
import Web3 from 'web3';

function App() {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState('');
  const [account, setAccount] = useState('');
  const [messageBoard, setMessageBoard] = useState('');

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = MessageBoard.networks[networkId];
    if(networkData) {
      const messageboard = new web3.eth.Contract(MessageBoard.abi, networkData.address);
      setMessageBoard(messageboard);
      const messages = await messageboard.methods.getMessages().call();
      setMessages(messages);
      setLoading(false);
    } else {
      window.alert('MessageBoard contract not detected');
    }
  }

  const sendMessage = (message) => {
    setLoading(true);
    messageBoard.methods.addMessage(message).send( {from: account}, async (error, result) => {
      if(error) {console.log("ERROR", error);}
      if(result) { 
        const messages = await messageBoard.methods.getMessages().call();
        setMessages(messages);
        window.location.reload(false);
      }
    });
    setLoading(false);
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  if(!loading) {

    return (
      <React.Fragment>
        <MessageForm sendMessage = {sendMessage}/>
        <MessageList messages = {messages}/>
      </React.Fragment>
    );

  } else {

    return(
      <div>loading</div>
    );
  }
}

export default App;
