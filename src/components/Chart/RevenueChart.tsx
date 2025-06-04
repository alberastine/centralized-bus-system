import { Card } from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const revenueData = [
    { date: '2025-01', revenue: 10000 },
    { date: '2025-02', revenue: 15000 },
    { date: '2025-03', revenue: 12000 },
    { date: '2025-04', revenue: 18000 },
    { date: '2025-05', revenue: 17000 },
];

const busRevenueData = [
    { bus: 'Bus 1', revenue: 8000 },
    { bus: 'Bus 2', revenue: 12000 },
    { bus: 'Bus 3', revenue: 9000 },
    { bus: 'Bus 4', revenue: 15000 },
];

const routeRevenueData = [
    { route: '17B', revenue: 11000 },
    { route: '17C', revenue: 16000 },
    { route: '17D', revenue: 9000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RevenueChart = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            {/* Line Chart */}
            <Card
                title="Monthly Revenue"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={revenueData}>
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis
                            tick={{ fontSize: 10 }}
                            tickFormatter={(val) => `₱${val.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value: number) =>
                                `₱${value.toLocaleString()}`
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#1890ff"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* Bar Chart */}
            <Card
                title="Bus Revenue"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={busRevenueData}>
                        <XAxis dataKey="bus" tick={{ fontSize: 10 }} />
                        <YAxis
                            tick={{ fontSize: 10 }}
                            tickFormatter={(val) => `₱${val.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value: number) =>
                                `₱${value.toLocaleString()}`
                            }
                        />
                        <Bar dataKey="revenue" fill="#1890ff" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* Pie Chart */}
            <Card
                title="Route Revenue Share"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={routeRevenueData}
                            dataKey="revenue"
                            nameKey="route"
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            label={({ name, percent }) =>
                                `${name} (${(percent * 100).toFixed(0)}%)`
                            }
                        >
                            {routeRevenueData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip
                            formatter={(value: number) =>
                                `₱${value.toLocaleString()}`
                            }
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default RevenueChart;
