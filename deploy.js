const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3') // Contructor function
const { interface, bytecode } = require('./compile')
require('dotenv').config()

const provider = new HDWalletProvider(process.env.WALLET_MNEUMONIC,
    'https://rinkeby.infura.io/v3/' + process.env.INFURA_PROJECT_ID)
const web3 = new Web3(provider)

async function deploy() {


    //Get a list of all account
    let accounts = await web3.eth.getAccounts();
    //Print addresses 
    let address = accounts[0]
    console.log('Address to be used is ' + address)
    let balance = await web3.eth.getBalance(address);
    console.log(`your balance of account [${address}] is [${balance}] wei`)
    //Use one of those accounts to deploy the contract. Inbox object represent the contract in the blockchain
    inbox = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: ['Hi There !'] })
        .send({ from: address, gas: '1000000' })
    console.log(`Contract deployed with address [${inbox.options.address}]`)
}

deploy()