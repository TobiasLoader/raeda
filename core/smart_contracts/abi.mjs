export function getABI(filename){
	if (filename=='lake')
		return [{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "_profileContractAddress",
			  "type": "address"
			}
		  ],
		  "stateMutability": "nonpayable",
		  "type": "constructor"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "indexed": true,
			  "internalType": "uint32",
			  "name": "_bidId",
			  "type": "uint32"
			},
			{
			  "indexed": true,
			  "internalType": "bool",
			  "name": "_accepted",
			  "type": "bool"
			}
		  ],
		  "name": "bidEvent",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "indexed": true,
			  "internalType": "string",
			  "name": "_category",
			  "type": "string"
			},
			{
			  "indexed": true,
			  "internalType": "enum waterSource.whichBucketValue",
			  "name": "_bucketValType",
			  "type": "uint8"
			}
		  ],
		  "name": "bucketEvent",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "indexed": true,
			  "internalType": "bool",
			  "name": "_live",
			  "type": "bool"
			}
		  ],
		  "name": "postEvent",
		  "type": "event"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_bidId",
			  "type": "uint32"
			}
		  ],
		  "name": "acceptBid",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_iT",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_fT",
			  "type": "uint32"
			}
		  ],
		  "name": "addTimes",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "string",
			  "name": "_category",
			  "type": "string"
			},
			{
			  "internalType": "enum waterSource.whichBucketValue",
			  "name": "_valType",
			  "type": "uint8"
			},
			{
			  "internalType": "uint32",
			  "name": "_intVal",
			  "type": "uint32"
			},
			{
			  "internalType": "bool",
			  "name": "_boolVal",
			  "type": "bool"
			},
			{
			  "internalType": "string",
			  "name": "_strVal",
			  "type": "string"
			}
		  ],
		  "name": "addToBucket",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_bidderId",
			  "type": "uint32"
			}
		  ],
		  "name": "bid",
		  "outputs": [],
		  "stateMutability": "payable",
		  "type": "function",
		  "payable": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "",
			  "type": "uint32"
			}
		  ],
		  "name": "bids",
		  "outputs": [
			{
			  "internalType": "uint32",
			  "name": "bidderId",
			  "type": "uint32"
			},
			{
			  "internalType": "address",
			  "name": "bidderEOA",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "bidAmount",
			  "type": "uint256"
			},
			{
			  "internalType": "bool",
			  "name": "accepted",
			  "type": "bool"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "string",
			  "name": "_category",
			  "type": "string"
			}
		  ],
		  "name": "checkBucket",
		  "outputs": [
			{
			  "internalType": "uint32",
			  "name": "",
			  "type": "uint32"
			},
			{
			  "internalType": "bool",
			  "name": "",
			  "type": "bool"
			},
			{
			  "internalType": "string",
			  "name": "",
			  "type": "string"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_userId",
			  "type": "uint32"
			}
		  ],
		  "name": "closeDeal",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "",
			  "type": "uint32"
			}
		  ],
		  "name": "collection",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "postName",
			  "type": "string"
			},
			{
			  "internalType": "uint32",
			  "name": "userId",
			  "type": "uint32"
			},
			{
			  "internalType": "address",
			  "name": "EOA",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "price",
			  "type": "uint256"
			},
			{
			  "components": [
				{
				  "internalType": "uint32",
				  "name": "x",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "y",
				  "type": "uint32"
				}
			  ],
			  "internalType": "struct waterSource.Location",
			  "name": "iX",
			  "type": "tuple"
			},
			{
			  "components": [
				{
				  "internalType": "uint32",
				  "name": "x",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "y",
				  "type": "uint32"
				}
			  ],
			  "internalType": "struct waterSource.Location",
			  "name": "fX",
			  "type": "tuple"
			},
			{
			  "internalType": "uint32",
			  "name": "iT",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "fT",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "exp",
			  "type": "uint32"
			},
			{
			  "internalType": "bool",
			  "name": "live",
			  "type": "bool"
			},
			{
			  "internalType": "uint32",
			  "name": "winningBidId",
			  "type": "uint32"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		},
		{
		  "inputs": [
			{
			  "internalType": "string",
			  "name": "_postName",
			  "type": "string"
			},
			{
			  "internalType": "uint32",
			  "name": "_userId",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_iXx",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_iXy",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_fXx",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_fXy",
			  "type": "uint32"
			},
			{
			  "internalType": "uint32",
			  "name": "_exp",
			  "type": "uint32"
			}
		  ],
		  "name": "initPost",
		  "outputs": [],
		  "stateMutability": "payable",
		  "type": "function",
		  "payable": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "",
			  "type": "uint32"
			}
		  ],
		  "name": "pendingDeals",
		  "outputs": [
			{
			  "internalType": "enum waterSource.dealStates",
			  "name": "",
			  "type": "uint8"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function",
		  "constant": true
		},
		{
		  "inputs": [
			{
			  "internalType": "uint32",
			  "name": "_postId",
			  "type": "uint32"
			}
		  ],
		  "name": "takeDownPost",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		}];
	if (filename=='river')
		return [
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "_profileContractAddress",
				  "type": "address"
				}
			  ],
			  "stateMutability": "nonpayable",
			  "type": "constructor"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "indexed": true,
				  "internalType": "uint32",
				  "name": "_bidId",
				  "type": "uint32"
				},
				{
				  "indexed": true,
				  "internalType": "bool",
				  "name": "_accepted",
				  "type": "bool"
				}
			  ],
			  "name": "bidEvent",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "indexed": true,
				  "internalType": "string",
				  "name": "_category",
				  "type": "string"
				},
				{
				  "indexed": true,
				  "internalType": "enum waterSource.whichBucketValue",
				  "name": "_bucketValType",
				  "type": "uint8"
				}
			  ],
			  "name": "bucketEvent",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "indexed": true,
				  "internalType": "bool",
				  "name": "_live",
				  "type": "bool"
				}
			  ],
			  "name": "postEvent",
			  "type": "event"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_bidId",
				  "type": "uint32"
				}
			  ],
			  "name": "acceptBid",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_iT",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_fT",
				  "type": "uint32"
				}
			  ],
			  "name": "addTimes",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "string",
				  "name": "_category",
				  "type": "string"
				},
				{
				  "internalType": "enum waterSource.whichBucketValue",
				  "name": "_valType",
				  "type": "uint8"
				},
				{
				  "internalType": "uint32",
				  "name": "_intVal",
				  "type": "uint32"
				},
				{
				  "internalType": "bool",
				  "name": "_boolVal",
				  "type": "bool"
				},
				{
				  "internalType": "string",
				  "name": "_strVal",
				  "type": "string"
				}
			  ],
			  "name": "addToBucket",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_bidderId",
				  "type": "uint32"
				}
			  ],
			  "name": "bid",
			  "outputs": [],
			  "stateMutability": "payable",
			  "type": "function",
			  "payable": true
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				}
			  ],
			  "name": "bids",
			  "outputs": [
				{
				  "internalType": "uint32",
				  "name": "bidderId",
				  "type": "uint32"
				},
				{
				  "internalType": "address",
				  "name": "bidderEOA",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "bidAmount",
				  "type": "uint256"
				},
				{
				  "internalType": "bool",
				  "name": "accepted",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "string",
				  "name": "_category",
				  "type": "string"
				}
			  ],
			  "name": "checkBucket",
			  "outputs": [
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				},
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				},
				{
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_userId",
				  "type": "uint32"
				}
			  ],
			  "name": "closeDeal",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				}
			  ],
			  "name": "collection",
			  "outputs": [
				{
				  "internalType": "string",
				  "name": "postName",
				  "type": "string"
				},
				{
				  "internalType": "uint32",
				  "name": "userId",
				  "type": "uint32"
				},
				{
				  "internalType": "address",
				  "name": "EOA",
				  "type": "address"
				},
				{
				  "internalType": "uint256",
				  "name": "price",
				  "type": "uint256"
				},
				{
				  "components": [
					{
					  "internalType": "uint32",
					  "name": "x",
					  "type": "uint32"
					},
					{
					  "internalType": "uint32",
					  "name": "y",
					  "type": "uint32"
					}
				  ],
				  "internalType": "struct waterSource.Location",
				  "name": "iX",
				  "type": "tuple"
				},
				{
				  "components": [
					{
					  "internalType": "uint32",
					  "name": "x",
					  "type": "uint32"
					},
					{
					  "internalType": "uint32",
					  "name": "y",
					  "type": "uint32"
					}
				  ],
				  "internalType": "struct waterSource.Location",
				  "name": "fX",
				  "type": "tuple"
				},
				{
				  "internalType": "uint32",
				  "name": "iT",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "fT",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "exp",
				  "type": "uint32"
				},
				{
				  "internalType": "bool",
				  "name": "live",
				  "type": "bool"
				},
				{
				  "internalType": "uint32",
				  "name": "winningBidId",
				  "type": "uint32"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			},
			{
			  "inputs": [
				{
				  "internalType": "string",
				  "name": "_postName",
				  "type": "string"
				},
				{
				  "internalType": "uint32",
				  "name": "_userId",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_iXx",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_iXy",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_fXx",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_fXy",
				  "type": "uint32"
				},
				{
				  "internalType": "uint32",
				  "name": "_exp",
				  "type": "uint32"
				}
			  ],
			  "name": "initPost",
			  "outputs": [],
			  "stateMutability": "payable",
			  "type": "function",
			  "payable": true
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				}
			  ],
			  "name": "pendingDeals",
			  "outputs": [
				{
				  "internalType": "enum waterSource.dealStates",
				  "name": "",
				  "type": "uint8"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_postId",
				  "type": "uint32"
				}
			  ],
			  "name": "takeDownPost",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			}
		];
	if (filename=='profile')
		return [
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint32",
				  "name": "_userId",
				  "type": "uint32"
				},
				{
				  "indexed": true,
				  "internalType": "enum waterTypes",
				  "name": "_waterType",
				  "type": "uint8"
				},
				{
				  "indexed": false,
				  "internalType": "string",
				  "name": "_userName",
				  "type": "string"
				},
				{
				  "indexed": false,
				  "internalType": "string",
				  "name": "_summary",
				  "type": "string"
				}
			  ],
			  "name": "profileEvent",
			  "type": "event"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "",
				  "type": "uint32"
				}
			  ],
			  "name": "profiles",
			  "outputs": [
				{
				  "internalType": "enum waterTypes",
				  "name": "waterType",
				  "type": "uint8"
				},
				{
				  "internalType": "string",
				  "name": "userName",
				  "type": "string"
				},
				{
				  "internalType": "string",
				  "name": "summary",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			},
			{
			  "inputs": [
				{
				  "internalType": "enum waterTypes",
				  "name": "_waterType",
				  "type": "uint8"
				},
				{
				  "internalType": "string",
				  "name": "_userName",
				  "type": "string"
				},
				{
				  "internalType": "string",
				  "name": "_summary",
				  "type": "string"
				}
			  ],
			  "name": "addProfile",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_userId",
				  "type": "uint32"
				},
				{
				  "internalType": "address",
				  "name": "_newEOA",
				  "type": "address"
				}
			  ],
			  "name": "addEOA",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint32",
				  "name": "_userId",
				  "type": "uint32"
				},
				{
				  "internalType": "address",
				  "name": "_EOA",
				  "type": "address"
				}
			  ],
			  "name": "checkEOA",
			  "outputs": [
				{
				  "internalType": "bool",
				  "name": "",
				  "type": "bool"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function",
			  "constant": true
			}
		];
}