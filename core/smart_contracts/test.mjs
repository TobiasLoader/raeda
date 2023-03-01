import {createRequire} from 'module'
const require=createRequire(import.meta.url)
// const BN = require('bignumber.js')

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3')
import * as abi from "./abi.mjs";

require('dotenv').config();
const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

let provider = new HDWalletProvider(mnemonic,'https://polygon-mumbai.infura.io/v3/'+infuraProjectId);

let web3 = new Web3(provider)

// let profileContract = new web3.eth.Contract(abi.getABI('profile'),"0xE10FE8690E76fC5699eCa1b705cf6b218F3189ba")
let lakeContract = new web3.eth.Contract(abi.getABI('lake'),'0x8af500dEf828b18A3a5D126F97aDf5D13eE69D3b')

// for (var i = 0; i<=5; i+=1){
//     profileContract.methods.addProfile(0,'Thames'+i.toString(),'Supplier of rudders').send({from:'0x0ba725846fac51fe306336203eb4491f052596e4'})
// }
async function bleh(){
    const response = await lakeContract.methods.initPost('12 Rudders',1,12,14,15,16,10).send({from:'0x0ba725846fac51fe306336203eb4491f052596e4',value:15})
    console.log(response)
}

bleh()

