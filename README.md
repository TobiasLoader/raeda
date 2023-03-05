raeda
===========================
##blockchain logistics

raeda is a solution to the fragmentation, inefficiency, and lack of competition in the logistics market. We use crucial features of Web3 technologies, a clean user interface, and incentive alignment to provide a marketplace for logistics providers (***rivers***) and suppliers (***lakes***) to interact. A lake looking to transport goods can log-in to a customized portal, where they can browse available routes posted by rivers, or make a post for rivers to bid on. Enforced by smart contracts, the lake can trust that the flow from initiating an interaction to transferring goods is secured. Moreover, raeda is a minimalistic platform, designed intentionally for developers to build on; we foresee a future where lakes and rivers are able to filter and focus on niche wants with various extensions, each inheriting the reliability of the raeda platform.

At ETHDenver 2023, we have produced an MVP of the raeda platform, with an additional front-end user-interface. Before we illustrate our stack, we will briefly justify the need for raeda.



Logistics Markets Currently: Inefficient, Fragmented, Opaque, yet Growing
-------------------------------------------------------------------------

-        **Inefficiency**: 35% of miles driven by trucks are empty. raeda provides a way for logistics providers to optimise for their backhaul, by posting unfilled cargo space.

-        **Fragmented:** freight brokers account for around 20% of transportation costs, in virtue of difficulties for lakes and rivers in designing their own supply routes, and a lack of standardisation in specification silos. raeda's composable architecture facilitates unifying the fragmented elements without being restrictive. 

-        **Opaque:** estimates indicate that 10% of invoices contain inaccurate data, resulting in costly disputes. Moreover, supply route information is often impossible to gather for the end-consumer. raeda solves this with publicly available supply route information and an automated transfer of funds.

-        **Growing:** the freight brokerage industry is expected to grow to $86 billion in 2026, from $60 billion in 2019. raeda is positioned to facilitate this growth.



A Marketplace
-------------

The essence of raeda is the on-chain marketplace, with two parts:

1\.       Lakes *post* a supplier request. Attached to the post is the necessary minimal information (initial and final location, the maximum price they are willing to pay, etc), any extra information (placed in a 'bucket'), and some crypto (here, MATIC) to pay for any river services. Then, rivers have the option to *bid* on the post, attaching MATIC equal to their bid to act as collateral. Before the post has expired, the lake can *accept bid* -- presumably one of the smaller bids. Then, once the river has successfully transported the lake's goods, both parties can close the deal, upon which involved parties will receive their deserved funds.

2\.       Rivers *post* available logistics space -- for instance, they may want to optimise their backhaul. Attached to the post is the necessary minimal information, any extra information, and some MATIC to act as collateral. Lakes can *bid* on the post. Then, the river can *accept bid* -- presumably, one of the larger bids. Then, upon both parties closing the deal, involved parties will receive their deserved funds.

The logic for this marketplace is implemented in smart contracts, located in:

-        https://github.com/TobiasLoader/raeda/tree/main/core/smart_contracts/contracts

The contracts are deployed on the Polygon Mumbai Testnet, with addresses:

-        PROFILE_ADDRESS="0xacBdBd10791262589B5de030a5990845D714A731"

-        LAKE_ADDRESS="0x21a991cf6c59cdD505bF9Dd6ADB120d2FDFA46BE"

-        RIVER_ADDRESS="0xdFf17343E71eDAb3460c541F52c19C97c8e6EbBe"



Composability
-------------

In addition to the smart contracts, which developers can build into their own appss, we have produced a front-end JavaScript library for transacting with the smart contracts:

-        https://github.com/TobiasLoader/raeda/blob/main/dapps/logistics/public/js/raeda.js

a subgraph for indexing and querying data from the smart contract:

-        https://thegraph.com/hosted-service/subgraph/rishin01/raedasubgraph

a node package for reading from the subgraph:

-        https://github.com/TobiasLoader/raeda/tree/main/core/raeda-node

Using these modular features, a developer could produce the following apps:

a)       an app for rivers and lakes that specialize in producing and transporting fragile goods. This could be implemented by making use of the 'bucket' property of posts.

b)      an app for lakes which optimises costs by dividing up routes into smaller pieces, selecting particular times, and so forth. Here, the availability of data, which can be easily and cheaply queried through the custom-made subgraph, enables effective prediction.

c)       an app which specializes in publishing the ESG (environmental, social, and governance) data of river's routes. This will reward rivers which are sustainable, as end-consumers will be able to access this data.

Using web3-esque technologies here is essential, as it allows extensions to raeda to inherit the trust-worthiness of the raeda platform.



raeda.app
---------

Alongside our platform, we have produced a raeda app, with two portals:

-        https://lake.raeda.app

-        https://river.raeda.app

These two portals provide symmetrical dashboards for lakes and rivers to view their posts and bids, search for available posts, make posts and bids, accept bids, and close deals. The portals are hosted on a node.js server, use the ethers.js library for interacting with the smart contracts, and use the subgraph for querying data.

The front-end writes to the smart contracts through the MetaMask wallet, which also acts as a provider.



Technical Details
-----------------

### L2 Solution

We are currently deployed on the Polygon Mumbai Testnet, with the goal to deploy on the Polygon Mainnet. The reasons for this choice are:

1\.       Low gas costs

2\.       EVM compatible, allowing easier development

3\.       Large ecosystem, which will make it easier to onboard users and developers

4\.       Polygon's goal to become carbon neutral aligns with our incentives at raeda

5\.       PolygonID provides a natural way to verify that the truck driver who turns up at your warehouse is in fact the right one. (N.B. we attempted to implement this into our buidlbox submission, but due to time constraints and unforeseen challenges, we had to roll back our progress)

We faced no particular challenges in interacting with the Polygon Mumbai Testnet, and we believe raeda can provide a useful addition to the Polygon ecosystem.


### Truffle

For smart contract development, we used the Truffle Polygon Box:

-        https://trufflesuite.com/boxes/polygon/

which was unboxed here:

-        https://github.com/TobiasLoader/raeda/tree/main/core/smart_contracts


Benefits:

-        The truffle-config.polygon.js, and its integration with touchenv, was extremely helpful for initialising and debugging, whilst also being securer than alternatives (e.g. hardhat)

-        Writing the deploy contract was simple

-        Helpful VSCode extension


Drawbacks:

-        The command `npm run migrate:polygon --network=(polygon_infura_testnet | polygon_infura_mainnet)` did not work on my system, so I instead had to use `truffle migrate --config truffle-config.polygon.js --network polygon_infura_testnet`

-        Using the in-built testing was not straightforward (we weren't massively familiar with the Mocha framework)

-        Occasionally, the deployed contract address would not be logged in console (inconsistent), and we would have to retrieve it using transaction hash and polygonscan.

-        When we were implementing an on-chain verifier as part of PolygonID, the number of contracts we had to compile reached ~360, due to dependencies. This led to the solidity compiler erroring, due to lack of memory.

-        Had to manually set the latest version of the solc compiler


### Infura

We used the Infura endpoint for the Polygon Mumbai Testnet when deploying contracts (and temporarily at various other points). The only time it led to issues was when using the HDWalletProvider as part of the truffle-config.polygon.js. In this case, it was fixed by passing the parameter `disableConfirmationListener:true` under the polygon_infura_testnet network.


### The Graph

We produced a new subgraph for the raeda platform:

-        https://thegraph.com/hosted-service/subgraph/rishin01/raedasubgraph

The code for producing and deploying this subcontract is located here:

-        https://github.com/TobiasLoader/raeda/tree/main/core/subgraph/raedasubgraph

The subgraph is deployed on the hosted-service, so as to be able to access the contracts on the Polygon testnet. This subgraph is based around profile, post, bid, and bucket entities, with various relationships, and indexes based on events from three deployed contracts.

We implemented the querying of data on the node.js server:

-        https://github.com/TobiasLoader/raeda/blob/main/core/raeda-node/index.js

using a URQL client, and making use of fragments.

In developing the subgraphs, we had to overcome issues with how codegen was producing the codebase (e.g. including '*Zero*' in the subgraph.yaml, treating '_category' parameter as Bytes even though it was a string, problematically dealing with events with the same name from different contracts etc.). We also faced issues when adding more than one contract. Mapping events and contract queries to entities was very elegant and surprisingly straight-forward, and the documentation on good practice was very helpful. It was also quite straight-forward to understand any bugs that did arise in the graph's tooling.

For querying, we did not find it easy to implement the graph-cli client into our node-js server, and in the interest of quicker development, we moved over to URQL, despite it being less ideal. At this point, we only faced a caching issue with URQL when executing queries.                However, the process of being able to easily retrieve data was impressively effective, so we believe it will be an essential part of the raeda ecosystem moving forward. Moreover, one is allowed to write smart contracts that spew data in a messy, but gas-efficient manner.

Finally, the process of initialising a new subgraph deployment environment every time new smart contracts were deployed did become a slow process, although given more time, we would've have looked to automate this process.



Impact
------

We aim for raeda to have a positive impact on the world, whilst being self-sustaining. One way to illustrate raeda's positive impact is through the United Nation Sustainable Development Goals:

**2\.       Zero hunger**.In the USA, it is estimated that 30-40% of the food supply goes to waste. With raeda's improvement to the transparency and efficiency of supply chains, we hope to improve this.

**9\.       Industry, innovation, and infrastructure.** This is direct: through raeda, the logistics infrastructure should become more resilient, more efficient, and encourage market players to innovate more, either on top of raeda, or in the service that they provide

**12\.   Responsible consumption and production.** As a necessary prerequisite of being responsible, consumers need to be aware of the effect of their consumption patterns. Public information about supply chains will allow consumers to make informed decisions of how they spend.

**13\.   Climate action.** Transportation contributes to around 30% of greenhouse gas emission worldwide, with logistics being a substantial contributor to that amount. raeda will help reduce greenhouse gas emission by increasing the efficiency of supply routes. For instance, a truck can minimise the number of 'empty cargo' miles by posting on raeda.

Moving forward, we plan for raeda to become self-sustaining by monetizing the smart contract flow. Our current idea is to allow users to put up less collateral at the cost of paying more later on.

We are also working on plans to motivate and onboard users.



Next Steps
----------

Our next steps for raeda on the technical side, in increasing order of difficulty to implement, are as follows:

1\.       Implement statistics on user's profile page for their rate of completing a deal (an 'accuracy score'). We see this as an essential part of incorporating accountability on raeda.app.

2\.       Implement an advanced search on raeda.app

3\.       Implement a one-to-many mapping from profiles to EOAs (similar to Lens Protocol)

4\.       Optimise mobile appearance

5\.       Allow rivers to make posts with a vague location

6\.       Implement polygonID, so that a logistics company (river) can issue its employees credentials that suppliers (lakes) can verify

7\.       Create an extension for adding ESG data

8\.       Implement an on-chain rating system

9\.       Host an associated messaging and notification service. The messaging service will allow rivers and lakes to send specifications and details to each other seamlessly from the user interface, whilst the notification service is a natural way of managing the delayed nature of blockchain interactions. We are investigating using Push Protocol for this.
