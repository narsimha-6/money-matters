
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import './index.css'

const OverviewChart = ({ transactions }) => {
  const chartData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - index))

    const month = date.toLocaleString('en-US', {
      month: 'short',
    })

    const year = date.getFullYear()

    const monthlyTransactions = transactions.filter(transaction => {
      const [day, monthName, transactionYear] = transaction.date.split(' ')

      const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3,
        May: 4, Jun: 5, Jul: 6, Aug: 7,
        Sep: 8, Oct: 9, Nov: 10, Dec: 11,
      }

      return (
        months[monthName] === date.getMonth() &&
        Number(transactionYear) === year
      )
    })

    const debit = monthlyTransactions
      .filter(transaction => transaction.type === 'debit')
      .reduce((total, transaction) => total + transaction.amount, 0)

    const credit = monthlyTransactions
      .filter(transaction => transaction.type === 'credit')
      .reduce((total, transaction) => total + transaction.amount, 0)

    return { month, debit, credit }
  })

  return (
    <section className="overview-chart">
      <h2 className="section-title">Debit &amp; Credit Overview</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} width={45} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="debit"
              name="Debit"
              fill="#4778e8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="credit"
              name="Credit"
              fill="#f4a340"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default OverviewChart
