import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts';

import { Card } from 'antd';

import { Tabs } from 'antd';
import { useState } from 'react';
const { TabPane } = Tabs;

const incomeData = {
    daily: [
        { name: 'Mon', income: 8400 },
        { name: 'Tue', income: 9200 },
        { name: 'Wed', income: 7800 },
        { name: 'Thu', income: 10500 },
        { name: 'Fri', income: 12450 },
        { name: 'Sat', income: 15200 },
        { name: 'Sun', income: 13800 },
    ],
    weekly: [
        { name: 'Week 1', income: 68400 },
        { name: 'Week 2', income: 72300 },
        { name: 'Week 3', income: 75100 },
        { name: 'Week 4', income: 81200 },
        { name: 'Week 5', income: 84500 },
    ],
    monthly: [
        { name: 'Jan', income: 284000 },
        { name: 'Feb', income: 298000 },
        { name: 'Mar', income: 315000 },
        { name: 'Apr', income: 327000 },
        { name: 'May', income: 341000 },
        { name: 'Jun', income: 356000 },
    ],
};

const busTripsData = [
    { bus: 'Bus 001', trips: 24 },
    { bus: 'Bus 002', trips: 18 },
    { bus: 'Bus 003', trips: 32 },
    { bus: 'Bus 004', trips: 28 },
    { bus: 'Bus 005', trips: 22 },
    { bus: 'Bus 006', trips: 26 },
];

const salaryData = [
    { name: 'Paid', value: 78, color: '#10B981' },
    { name: 'Pending', value: 22, color: '#F59E0B' },
];

const ChartSection = () => {
    const [incomeTab, setIncomeTab] = useState('daily');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Income Trends - Full Width */}
            <Card
                title="Income Trends"
                style={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
            >
                <Tabs activeKey={incomeTab} onChange={setIncomeTab}>
                    <TabPane tab="Daily" key="daily">
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={incomeData.daily}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis dataKey="name" stroke="#888888" />
                                    <YAxis stroke="#888888" />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            `₱${value.toLocaleString()}`
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{
                                            fill: '#3B82F6',
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabPane>
                    <TabPane tab="Weekly" key="weekly">
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={incomeData.weekly}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis dataKey="name" stroke="#888888" />
                                    <YAxis stroke="#888888" />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            `₱${value.toLocaleString()}`
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#16A34A"
                                        strokeWidth={3}
                                        dot={{
                                            fill: '#16A34A',
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabPane>
                    <TabPane tab="Monthly" key="monthly">
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={incomeData.monthly}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis dataKey="name" stroke="#888888" />
                                    <YAxis stroke="#888888" />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            `₱${value.toLocaleString()}`
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#a855f7"
                                        strokeWidth={3}
                                        dot={{
                                            fill: '#a855f7',
                                            strokeWidth: 2,
                                            r: 4,
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {/* Trips per Bus */}
                <Card
                    title="Trips per Bus (Today)"
                    style={{
                        flex: 1,
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                >
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={busTripsData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis dataKey="bus" stroke="#888888" />
                                <YAxis stroke="#888888" />
                                <Tooltip
                                    formatter={(value: number) =>
                                        value.toFixed(0)
                                    }
                                />
                                <Bar
                                    dataKey="trips"
                                    fill="#14B8A6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Salary Distribution */}
                <Card
                    title="Salary Distribution"
                    style={{
                        flex: 1,
                        borderRadius: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                >
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={salaryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {salaryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '24px',
                            marginTop: '16px',
                        }}
                    >
                        {salaryData.map((entry, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        backgroundColor: entry.color,
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: '#4B5563',
                                    }}
                                >
                                    {entry.name}: {entry.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ChartSection;
