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
import { FiUsers, FiActivity, FiUserPlus, FiCalendar, FiUser } from 'react-icons/fi';

const OverviewDashboard = () => {
  const data = [
    { name: 'Mon', visitors: 4000, pageViews: 2400 },
    { name: 'Tue', visitors: 3000, pageViews: 1398 },
    { name: 'Wed', visitors: 2000, pageViews: 9800 },
    { name: 'Thu', visitors: 2780, pageViews: 3908 },
    { name: 'Fri', visitors: 1890, pageViews: 4800 },
    { name: 'Sat', visitors: 2390, pageViews: 3800 },
    { name: 'Sun', visitors: 3490, pageViews: 4300 },
  ];

  const recentActivities = [
    { date: 'March 18, 2025', user: 'John Doe', activity: 'Logged in' },
    { date: 'March 17, 2025', user: 'Jane Smith', activity: 'Created a post' },
    { date: 'March 16, 2025', user: 'Robert Johnson', activity: 'Updated profile' },
    { date: 'March 15, 2025', user: 'Emily Davis', activity: 'Made a purchase' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold mt-1">1,240</p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <span className="inline-block mr-1">↑</span> 12% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Sessions</p>
              <p className="text-3xl font-bold mt-1">84</p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <span className="inline-block mr-1">↑</span> 8% from yesterday
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <FiActivity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Signups</p>
              <p className="text-3xl font-bold mt-1">52</p>
              <p className="text-sm text-green-500 mt-1 flex items-center">
                <span className="inline-block mr-1">↑</span> 5% from last week
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <FiUserPlus className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Weekly Traffic Analytics
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg">
              Week
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-lg">
              Month
            </button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-lg">
              Year
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="visitors" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#10B981' }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="pageViews" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4, fill: '#3B82F6' }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Recent User Activity
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" /> Date
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FiUser className="mr-2" /> User
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.user}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.activity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button className="text-sm font-medium text-green-500 hover:text-green-700">
            View All Activities →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;