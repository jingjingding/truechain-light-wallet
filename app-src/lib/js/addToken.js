function addToken(contractAddr, callback) {
	let symbol, contract, name, decimals, balances;
	mui.plusReady(function() {
		let fromAddr = plus.storage.getItem('walletAddress');

		var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));

		var abi = [{
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [{
				"name": "supply",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_from",
				"type": "address"
			}, {
				"name": "_to",
				"type": "address"
			}, {
				"name": "_value",
				"type": "uint256"
			}],
			"name": "transferFrom",
			"outputs": [{
				"name": "success",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "decimals",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_owner",
				"type": "address"
			}],
			"name": "balanceOf",
			"outputs": [{
				"name": "balance",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_to",
				"type": "address"
			}, {
				"name": "_value",
				"type": "uint256"
			}],
			"name": "transfer",
			"outputs": [{
				"name": "success",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_owner",
				"type": "address"
			}, {
				"name": "_spender",
				"type": "address"
			}],
			"name": "allowance",
			"outputs": [{
				"name": "remaining",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": true,
				"name": "_from",
				"type": "address"
			}, {
				"indexed": true,
				"name": "_to",
				"type": "address"
			}, {
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}],
			"name": "Transfer",
			"type": "event"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			}, {
				"indexed": true,
				"name": "_spender",
				"type": "address"
			}, {
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}],
			"name": "Approval",
			"type": "event"
		}]

		var myContract = new web3.eth.Contract(abi, contractAddr);

		myContract.methods.balanceOf(fromAddr).call().then(function(res) {
			balances = show(web3.utils.fromWei(res, 'ether'));
			callback(balances);
		}).catch(console.log);

		function show(num) {
			num += '';
			num = num.replace(/[^0-9|\.]/g, '');
			if(/^0+/) {
				num = num.replace(/^0+/, '');
			};
			if(!/\./.test(num)) {
				num += '.00000';
			};
			if(/^\./.test(num)) {
				num = '0' + num;
			};
			num += '00000';
			num = num.match(/\d+\.\d{5}/)[0];
			return num
		};
	})
}