/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Overview Dashboard Content with Cards, Charts, and Tables
const OverviewDashboard = () => {
  // Example data for chart and table (could be dynamic)
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  ];

  return (
    <div className="p-6 space-y-8 text-gray-900 dark:text-black">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-black">Overview</h2>

      {/* First Section - Cards */}
      <div className="grid grid-cols-3 gap-4 text-gray-900 dark:text-black">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1200</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-2xl font-bold">80</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">New Signups</h3>
          <p className="text-2xl font-bold">50</p>
        </div>
      </div>

      {/* Second Section - Chart */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Website Traffic (Last Week)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Third Section - Table */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Activity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">March 18, 2025</td>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">Logged in</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">March 17, 2025</td>
              <td className="border px-4 py-2">Jane Smith</td>
              <td className="border px-4 py-2">Created a post</td>
            </tr>
            {/* More rows can be added */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewDashboard;
