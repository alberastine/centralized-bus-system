import { Card } from 'antd';
import { Line, Column, Area } from '@ant-design/charts';

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

const RevenueChart = () => {
    const lineConfig = {
        data: revenueData,
        xField: 'date',
        yField: 'revenue',
        smooth: true,
        point: { size: 2, shape: 'circle' },
        lineStyle: { stroke: '#1890ff' },
        tooltip: { showMarkers: false },
        width: 395,
        height: 180,
        padding: 'auto',
        xAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        yAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        legend: false,
    };

    const barConfig = {
        data: busRevenueData,
        xField: 'bus',
        yField: 'revenue',
        color: '#52c41a',
        columnWidthRatio: 0.6,
        width: 395,
        height: 180,
        padding: 'auto',
        xAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        yAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        legend: false,
    };

    const areaConfig = {
        data: revenueData,
        xField: 'date',
        yField: 'revenue',
        smooth: true,
        areaStyle: () => ({
            fill: 'l(270) 0:#1890ff 1:#e6f7ff',
        }),
        width: 395,
        height: 180,
        padding: 'auto',
        xAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        yAxis: { label: { style: { fontSize: 10 } }, tickLine: null },
        legend: false,
    };

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
            <Card
                title="Revenue Chart"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Line {...lineConfig} />
            </Card>

            <Card
                title="Bus Revenue Chart"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Column {...barConfig} />
            </Card>

            <Card
                title="Area Chart"
                size="small"
                style={{
                    width: '26rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Area {...areaConfig} />
            </Card>
        </div>
    );
};

export default RevenueChart;
