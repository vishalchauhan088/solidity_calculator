import { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xa77c9c6a28b84afcc8a5538fe7ea860f656a7062";
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_x",
        type: "uint256",
      },
    ],
    name: "setX",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_y",
        type: "uint256",
      },
    ],
    name: "setY",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "add",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "divide",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subtract",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "x",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "y",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [result, setResult] = useState("");

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const connectedAddress = await signer.getAddress();
        setAccount(connectedAddress);
        setContract(contract);

        console.log("Connected to MetaMask");
      } catch (error) {
        console.error("User rejected the request:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const handleSetX = async () => {
    try {
      await contract.setX(x);
      setResult(`Set x to ${x}`);
    } catch (error) {
      setResult(`Error setting x: ${error.message}`);
    }
  };

  const handleSetY = async () => {
    try {
      await contract.setY(y);
      setResult(`Set y to ${y}`);
    } catch (error) {
      setResult(`Error setting y: ${error.message}`);
    }
  };
  const handleAdd = async () => {
    try {
      const result = await contract.add();
      setResult(`Add result: ${result.toString()}`);
    } catch (error) {
      setResult(`Error adding: ${error.message}`);
    }
  };

  // Event handler for calling subtract function
  const handleSubtract = async () => {
    try {
      const result = await contract.subtract();
      setResult(`Subtract result: ${result.toString()}`);
    } catch (error) {
      setResult(`Error subtracting: ${error.message}`);
    }
  };
  const handleMultiply = async () => {
    try {
      const result = await contract.multiply();
      setResult(`Multiply result: ${result.toString()}`);
    } catch (error) {
      setResult(`Error multiplying: ${error.message}`);
    }
  };

  // Event handler for calling divide function
  const handleDivide = async () => {
    try {
      const result = await contract.divide();
      setResult(`Divide result: ${result.toString()}`);
    } catch (error) {
      setResult(`Error dividing: ${error.message}`);
    }
  };

  if (!account) {
    return <button className="main" onClick={connectToMetaMask}>Connect MetaMask</button>;
  }

  return (
    <div className=" main">
      <h2>Calculator</h2>
      <p>x : {x}</p>
      <p>y : { y}</p>
      <div>
        <label>
          Set x:
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
          />
        </label>
        <button onClick={handleSetX}>Set X</button>
      </div>
      <div>
        <label>
          Set y:
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
          />
        </label>
        <button onClick={handleSetY}>Set Y</button>
      </div>
      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubtract}>Subtract</button>
        <button onClick={handleMultiply}>Multiply</button>
        <button onClick={handleDivide}>Divide</button>
      </div>
      <div>
        <p>Result: {result}</p>
      </div>
    </div>
  );
}

export default App;
