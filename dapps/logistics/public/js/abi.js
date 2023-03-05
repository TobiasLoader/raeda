export function getABI(filename){
	if (filename=='lake')
		return [{ "inputs":[
			  {
				"indexed": true,
				"internalType": "uint16",
				"name": "_postId",
				"type": "uint16"
			  },
			  {
				"indexed": true,
				"internalType": "uint16",
				"name": "_bidId",
				"type": "uint16"
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
				"internalType": "uint16",
				"name": "_postId",
				"type": "uint16"
			  },
			  {
				"indexed": true,
				"internalType": "string",
				"name": "_category",
				"type": "string"
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
				"internalType": "uint16",
				"name": "_postId",
				"type": "uint16"
			  },
			  {
				"indexed": true,
				"internalType": "enum waterSource.post_states",
				"name": "_postState",
				"type": "uint8"
			  }
			],
			"name": "postEvent",
			"type": "event"
		  },
		  {
			"anonymous": false,
			"inputs": [
			  {
				"indexed": true,
				"internalType": "uint16",
				"name": "_postId",
				"type": "uint16"
			  }
			],
			"name": "resetEvent",
			"type": "event"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint16", "name": "_bidId", "type": "uint16" }
			],
			"name": "acceptBid",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "string", "name": "_category", "type": "string" },
			  { "internalType": "string", "name": "_value", "type": "string" }
			],
			"name": "addToBucket",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint16", "name": "_bidderId", "type": "uint16" }
			],
			"name": "bid",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "", "type": "uint16" },
			  { "internalType": "uint16", "name": "", "type": "uint16" }
			],
			"name": "bids",
			"outputs": [
			  { "internalType": "uint16", "name": "bidderId", "type": "uint16" },
			  { "internalType": "address", "name": "bidderEOA", "type": "address" },
			  { "internalType": "uint256", "name": "bidAmount", "type": "uint256" }
			],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "", "type": "uint16" },
			  { "internalType": "uint256", "name": "", "type": "uint256" }
			],
			"name": "bidsArray",
			"outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "string", "name": "_category", "type": "string" }
			],
			"name": "checkBucket",
			"outputs": [{ "internalType": "string", "name": "", "type": "string" }],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint16", "name": "_profileId", "type": "uint16" }
			],
			"name": "closeDeal",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		  },
		  {
			"inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
			"name": "collection",
			"outputs": [
			  { "internalType": "string", "name": "postName", "type": "string" },
			  { "internalType": "string", "name": "description", "type": "string" },
			  { "internalType": "uint16", "name": "profileId", "type": "uint16" },
			  { "internalType": "address", "name": "EOA", "type": "address" },
			  { "internalType": "uint256", "name": "price", "type": "uint256" },
			  {
				"components": [
				  { "internalType": "uint64", "name": "x", "type": "uint64" },
				  { "internalType": "uint64", "name": "y", "type": "uint64" }
				],
				"internalType": "struct waterSource.Location",
				"name": "iX",
				"type": "tuple"
			  },
			  {
				"components": [
				  { "internalType": "uint64", "name": "x", "type": "uint64" },
				  { "internalType": "uint64", "name": "y", "type": "uint64" }
				],
				"internalType": "struct waterSource.Location",
				"name": "fX",
				"type": "tuple"
			  },
			  { "internalType": "uint64", "name": "iT", "type": "uint64" },
			  { "internalType": "uint64", "name": "fT", "type": "uint64" },
			  { "internalType": "uint64", "name": "exp", "type": "uint64" },
			  { "internalType": "uint16", "name": "winningBidId", "type": "uint16" },
			  {
				"internalType": "enum waterSource.post_states",
				"name": "postState",
				"type": "uint8"
			  }
			],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "string", "name": "_description", "type": "string" }
			],
			"name": "editDescription",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_exp", "type": "uint64" }
			],
			"name": "editExpiryTime",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_x", "type": "uint64" },
			  { "internalType": "uint64", "name": "_y", "type": "uint64" }
			],
			"name": "editFinalLocation",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_fT", "type": "uint64" }
			],
			"name": "editFinalTime",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_x", "type": "uint64" },
			  { "internalType": "uint64", "name": "_y", "type": "uint64" }
			],
			"name": "editInitialLocation",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_iT", "type": "uint64" }
			],
			"name": "editInitialTime",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" }
			],
			"name": "getFinalLocation",
			"outputs": [
			  { "internalType": "uint64", "name": "", "type": "uint64" },
			  { "internalType": "uint64", "name": "", "type": "uint64" }
			],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" }
			],
			"name": "getInitialLocation",
			"outputs": [
			  { "internalType": "uint64", "name": "", "type": "uint64" },
			  { "internalType": "uint64", "name": "", "type": "uint64" }
			],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "string", "name": "_postName", "type": "string" },
			  { "internalType": "uint16", "name": "_profileId", "type": "uint16" },
			  { "internalType": "uint64", "name": "_iXx", "type": "uint64" },
			  { "internalType": "uint64", "name": "_iXy", "type": "uint64" },
			  { "internalType": "uint64", "name": "_fXx", "type": "uint64" },
			  { "internalType": "uint64", "name": "_fXy", "type": "uint64" },
			  { "internalType": "uint64", "name": "_exp", "type": "uint64" }
			],
			"name": "initPost",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" }
			],
			"name": "refundExpiredPost",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_postId", "type": "uint16" }
			],
			"name": "takeDownPost",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  }
		];
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
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "indexed": true,
				  "internalType": "uint16",
				  "name": "_bidId",
				  "type": "uint16"
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
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "indexed": true,
				  "internalType": "string",
				  "name": "_category",
				  "type": "string"
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
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "indexed": true,
				  "internalType": "enum waterSource.dealStates",
				  "name": "_dealState",
				  "type": "uint8"
				}
			  ],
			  "name": "pendingEvent",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
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
			  "anonymous": false,
			  "inputs": [
				{
				  "indexed": true,
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "resetEvent",
			  "type": "event"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint16",
				  "name": "_bidId",
				  "type": "uint16"
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
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "string",
				  "name": "_category",
				  "type": "string"
				},
				{
				  "internalType": "string",
				  "name": "_value",
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
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint16",
				  "name": "_bidderId",
				  "type": "uint16"
				}
			  ],
			  "name": "bid",
			  "outputs": [],
			  "stateMutability": "payable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
				},
				{
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
				}
			  ],
			  "name": "bids",
			  "outputs": [
				{
				  "internalType": "uint16",
				  "name": "bidderId",
				  "type": "uint16"
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
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
				},
				{
				  "internalType": "uint256",
				  "name": "",
				  "type": "uint256"
				}
			  ],
			  "name": "bidsArray",
			  "outputs": [
				{
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
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
				  "internalType": "string",
				  "name": "",
				  "type": "string"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint16",
				  "name": "_profileId",
				  "type": "uint16"
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
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
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
				  "internalType": "string",
				  "name": "description",
				  "type": "string"
				},
				{
				  "internalType": "uint16",
				  "name": "profileId",
				  "type": "uint16"
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
					  "internalType": "uint64",
					  "name": "x",
					  "type": "uint64"
					},
					{
					  "internalType": "uint64",
					  "name": "y",
					  "type": "uint64"
					}
				  ],
				  "internalType": "struct waterSource.Location",
				  "name": "iX",
				  "type": "tuple"
				},
				{
				  "components": [
					{
					  "internalType": "uint64",
					  "name": "x",
					  "type": "uint64"
					},
					{
					  "internalType": "uint64",
					  "name": "y",
					  "type": "uint64"
					}
				  ],
				  "internalType": "struct waterSource.Location",
				  "name": "fX",
				  "type": "tuple"
				},
				{
				  "internalType": "uint64",
				  "name": "iT",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "fT",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "exp",
				  "type": "uint64"
				},
				{
				  "internalType": "bool",
				  "name": "live",
				  "type": "bool"
				},
				{
				  "internalType": "uint16",
				  "name": "winningBidId",
				  "type": "uint16"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "string",
				  "name": "_description",
				  "type": "string"
				}
			  ],
			  "name": "editDescription",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_exp",
				  "type": "uint64"
				}
			  ],
			  "name": "editExpiryTime",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_x",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_y",
				  "type": "uint64"
				}
			  ],
			  "name": "editFinalLocation",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_fT",
				  "type": "uint64"
				}
			  ],
			  "name": "editFinalTime",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_x",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_y",
				  "type": "uint64"
				}
			  ],
			  "name": "editInitialLocation",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_iT",
				  "type": "uint64"
				}
			  ],
			  "name": "editInitialTime",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "getFinalLocation",
			  "outputs": [
				{
				  "internalType": "uint64",
				  "name": "",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "",
				  "type": "uint64"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "getInitialLocation",
			  "outputs": [
				{
				  "internalType": "uint64",
				  "name": "",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "",
				  "type": "uint64"
				}
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "string",
				  "name": "_postName",
				  "type": "string"
				},
				{
				  "internalType": "uint16",
				  "name": "_profileId",
				  "type": "uint16"
				},
				{
				  "internalType": "uint64",
				  "name": "_iXx",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_iXy",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_fXx",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_fXy",
				  "type": "uint64"
				},
				{
				  "internalType": "uint64",
				  "name": "_exp",
				  "type": "uint64"
				}
			  ],
			  "name": "initPost",
			  "outputs": [],
			  "stateMutability": "payable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "",
				  "type": "uint16"
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
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "refundExpiredPost",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "address",
				  "name": "_verifyTributaryAddress",
				  "type": "address"
				}
			  ],
			  "name": "setVerifyTributaryAddress",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "takeDownPost",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
				{
				  "internalType": "uint16",
				  "name": "_postId",
				  "type": "uint16"
				}
			  ],
			  "name": "verifyOnRiverPost",
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
				"internalType": "uint16",
				"name": "_userId",
				"type": "uint16"
			  },
			  {
				"indexed": true,
				"internalType": "address",
				"name": "",
				"type": "address"
			  }
			],
			"name": "addressEvent",
			"type": "event"
		  },
		  {
			"anonymous": false,
			"inputs": [
			  {
				"indexed": true,
				"internalType": "uint16",
				"name": "_userId",
				"type": "uint16"
			  }
			],
			"name": "profileEvent",
			"type": "event"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_userId", "type": "uint16" },
			  { "internalType": "address", "name": "_newEOA", "type": "address" }
			],
			"name": "addEOA",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [
			  { "internalType": "uint16", "name": "_userId", "type": "uint16" },
			  { "internalType": "address", "name": "_EOA", "type": "address" }
			],
			"name": "checkEOA",
			"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  {
				"internalType": "enum waterTypes",
				"name": "_waterType",
				"type": "uint8"
			  },
			  { "internalType": "string", "name": "_profileName", "type": "string" },
			  { "internalType": "string", "name": "_description", "type": "string" }
			],
			"name": "createProfile",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"inputs": [{ "internalType": "string", "name": "", "type": "string" }],
			"name": "profileNames",
			"outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
			"name": "profiles",
			"outputs": [
			  {
				"internalType": "enum waterTypes",
				"name": "waterType",
				"type": "uint8"
			  },
			  { "internalType": "string", "name": "profileName", "type": "string" },
			  { "internalType": "string", "name": "description", "type": "string" }
			],
			"stateMutability": "view",
			"type": "function"
		  }
		];
}