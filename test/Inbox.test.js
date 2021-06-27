const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') // Contructor function
const web3 = new Web3(ganache.provider())//Instance  using the local provider for ganche
const { interface, bytecode } = require('../compile')
/*
* Mocha Start
* Deploy  a new contract 
* Manipulae the contract
* Make an assertion about the contract
*/

let accounts
let inbox;
beforeEach(async () => {
    //Get a list of all account
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to depliy the contract. Inbox object represent the contract in the blockchain
    inbox = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: ['Hi There !'] })
        .send({ from: accounts[0], gas: '1000000' })


})

describe('Inbox', () => {
    it('deploy a contract', () => {
        assert.ok(inbox.options)
        assert.ok(inbox.options.address)
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'Hi There !')
    })
    it('send a message', async () => {
        await inbox.methods.setMessage("Hello Guys!").send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, 'Hello Guys!')
    })
})




