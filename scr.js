//import {detectEthereumProvider} from "./detect-provider.min.js"
import {ethers} from "./ethers.js";
                                                                    
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",

    "event Transfer(address indexed from, address indexed to, uint256 amount)"
];

let accounts = []

const dummy = new ethers.providers.Web3Provider(ethereum);
const dummySigner = dummy.getSigner();
const address = '0x7ca625f5273Ee4Ec8DD072520562CC562338097f';
const contract = new ethers.Contract(address, ERC20_ABI, dummy);

window.onload = function() {

    submit .addEventListener("click", submitClick);
    connect.addEventListener("click", connectClick);

}

function petro(array) {
    for (let i = 0; i < array.length; i++) {
        let a;
        for (const [key, value] of Object.entries(array[i])) {
          a += `${key}: ${value}\n`
        }
    const txs = document.querySelector("#tx");
    const tx = document.createTextNode(a);
    const node = document.createElement("h2");
    const textNode = document.createTextNode(`Trnasaction ${i}`);
    node.appendChild(textNode);
    txs.appendChild(node);
    txs.appendChild(tx);
    }

}

async function submitClick() {
    const transfers = await contract.queryFilter("Transfer");
    petro(transfers);
    console.log(transfers);

}


async function connectClick() {
    const meta = await detectEthereumProvider({
        mustBeMetaMask: true
    });

    if (meta) {
        const provider = new ethers.providers.Web3Provider(meta);
        accounts = await provider.send("eth_requestAccounts", []);
        addr.textContent = String(accounts[0]); 
        bal.textContent = ethers.utils.formatUnits(await contract.balanceOf(accounts[0])) + " IUAB";
        main.hidden = false;
        meta.on("accountsChanged", async function(a) {
            accounts[0] = a;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const balance = await signer.getBalance();
            addr.textContent = String(accounts[0]);
            bal.textContent = ethers.utils.formatUnits(await contract.balanceOf(String(accounts[0]))) + " IUAB";
        }); 
    } else {
        connect.disabled = true;
        alert('Please install MetaMask!');
    }
}

