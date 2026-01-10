import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "M", value: 15 },
  { name: "T", value: 30 },
  { name: "W", value: 25 },
  { name: "T", value: 35 },
  { name: "F", value: 20 },
  { name: "S", value: 28 },
];

export default function BarChart() {
  return (
    <div className="bg-white border border-[var(--border-light)] rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">

      {/* TITLE */}
      <h3 className="text-base font-bold text-gray-900 mb-6">
        Expense Tracking
      </h3>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data}>
            <Tooltip
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar
              dataKey="value"
              fill="#2563EB"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4 font-medium">
        This week
      </p>
    </div>
  );
}
