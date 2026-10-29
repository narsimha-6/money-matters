
import SummaryCard from '../../components/SummaryCard'
import TransactionItem from '../../components/TransactionItem'
import OverviewChart from '../../components/OverviewChart'

const Dashboard = ({transactions}) => {
  const totalCredit = transactions
    .filter(transaction => transaction.type === 'credit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  const totalDebit = transactions
    .filter(transaction => transaction.type === 'debit')
    .reduce((total, transaction) => total + transaction.amount, 0)

  return (
    <>
      <div className="summary-cards">
        <SummaryCard
          title="Credit"
          amount={`₹${totalCredit.toLocaleString('en-IN')}`}
          type="credit"
        />

        <SummaryCard
          title="Debit"
          amount={`₹${totalDebit.toLocaleString('en-IN')}`}
          type="debit"
        />
      </div>

      <section className="recent-transactions">
        <h2 className="section-title">Last Transaction</h2>

        <div className="transaction-list">
          {transactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      </section>

      <OverviewChart />
    </>
  )
}

export default Dashboard
