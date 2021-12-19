import { useFirestore } from '../../hooks/useFirestore'
import styles from './Home.module.css'

export default function TransactionList({ transactions }: any) {
    const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction: any) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.cryptocurrency}</p>
          &nbsp;
          <p className={styles.name}>{transaction.buysell}</p>
          &nbsp;
          <p className={styles.amount}>${transaction.amount}</p>
          &nbsp;
          <p className={styles.name}>{transaction.data}</p>
          &nbsp;
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}