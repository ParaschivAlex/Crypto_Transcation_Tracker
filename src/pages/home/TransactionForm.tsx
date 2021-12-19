import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function TransactionForm( { uid }: any) {
  const [cryptocurrency, setCryptocurrency] = useState('')
  const [buysell, setBuysell] = useState('')
  const [amount, setAmount] = useState('')
  const [data, setData] = useState('')
  const { addDocument, response } = useFirestore('transactions')

  const handleSubmit = (e : any) => {
    e.preventDefault()
    addDocument({
        uid,
        cryptocurrency,
        buysell,
        amount,
        data,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setCryptocurrency('')
      setBuysell('')
      setAmount('')
      setData('')
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Cryptocurrency name:</span>
          <input 
            type="text"
            required
            onChange={(e) => setCryptocurrency(e.target.value)} 
            value={cryptocurrency} 
          />
        </label>

        <form>
          <input type="radio" id="buy" name="buy/sell" onChange={(e) => setBuysell(e.target.value)} value={"Buy"} />
          <label htmlFor="buy">Buy</label><br/>
          <input type="radio" id="sell" name="buy/sell" onChange={(e) => setBuysell(e.target.value)} value={"Sell"} />
          <label htmlFor="sell">Sell</label>
        </form>

        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
          />
        </label>

        <label>
          <span>Date dd-mm-yyyy:</span>
          <input
            type="date"
            required
            onChange={(e) => setData(e.target.value)} 
            value={data} 
          />
        </label>

        <button className="btn btn-success">Add Transaction</button>
      </form>
    </>
  )
}