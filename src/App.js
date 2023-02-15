import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Bank from './artifacts/contracts/Bank.sol/Bank.json'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

// Update with the contract address logged out to the CLI when it was deployed const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const bankAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

function App() {
  
  useEffect(() => {
    getBalance()
  }, []);

  const [amount, setAmount] = useState(0)
  const [balance, setBalance] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const depositEther = async () => {
    
     if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(bankAddress, Bank.abi, signer)
      try {
        const options = {value: ethers.utils.parseEther(amount)}
        const data = await contract.recieveMoney(options)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  const getBalance = async () => {
    
    if (typeof window.ethereum !== 'undefined') {
     await requestAccount()
     
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const contract = new ethers.Contract(bankAddress, Bank.abi, provider)
     try {
       const data = await contract.getBalance()
       console.log('data: ', data)
      //  console.log(data._hex)
      const wei = parseInt(data._hex, 16)
      setBalance(ethers.utils.formatEther(wei.toString()))
     } catch (err) {
       console.log("Error: ", err)
     }
   }
 }

  return (
    <div className="App">
      <br/>
      <Typography variant="h2" gutterBottom>
        Banking Contract
      </Typography>
      <br/>
        <Box sx={{ '& button': { m: 1 } }}>
          <div>
            <Button variant="contained" onClick={depositEther}>Deposit Ether</Button>
            <TextField
          id="outlined-number"
          label="Number"
          type="number"
          defaultValue={0}
          onChange={e => setAmount(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
          </div>

          <div>
            <br></br>
            <Button variant="contained" onClick={getBalance}>Get Balance</Button>
            <Typography variant="h3">{balance} Ether</Typography>
          </div>
          
        </Box>
        
      
    </div>
  );
}

export default App;