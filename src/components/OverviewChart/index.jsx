
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

const chartData = [
  {month: 'May', debit: 3200, credit: 5200},
  {month: 'Jun', debit: 4500, credit: 6800},
  {month: 'Jul', debit: 2800, credit: 4800},
  {month: 'Aug', debit: 5000, credit: 7200},
  {month: 'Sep', debit: 3900, credit: 6100},
  {month: 'Oct', debit: 5600, credit: 8500},
]

const OverviewChart = () => (
  <section className="overview-chart">
    <h2 className="section-title">Debit &amp; Credit Overview</h2>

    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{top: 10, right: 10, left: 0, bottom: 0}}
          barGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={45}
          />
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

export default OverviewChart
