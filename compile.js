const path = require('path')
const fs = require('fs')
const solc = require('solc')
const { Console } = require('console')
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')


function compile_contract() {
    let complierInput = {
        language: 'Solidity',
        sources:
        {
            'Inbox':
            {
                content: source
            }
        },
        settings:
        {
            optimizer:
            {
                enabled: true
            },
            outputSelection:
            {
                '*': {
                    '*': ['*']
                }
            }
        }
    };
    console.log('Compiling contract: ' + inboxPath);
    let compiledContract = JSON.parse(solc.compile(JSON.stringify(complierInput)));
    if (compiledContract.contracts) {
        for (let key in compiledContract.contracts) {
            let contract = compiledContract.contracts[key]
            for (let contractName in contract) {
                let abi = contract[contractName].abi;
                fs.writeFileSync(__dirname + `/contracts/bin/${contractName}_abi.json`, JSON.stringify(abi));
            }
        }
        let contractResponse = {
            interface: compiledContract.contracts['Inbox'].Inbox.abi,
            bytecode: compiledContract.contracts['Inbox'].Inbox.evm.bytecode.object
        };
        return contractResponse
    } else {
        console.log('Compilation Failed ! Check the errros below');
        console.log(compiledContract)
    }
}
module.exports = compile_contract()