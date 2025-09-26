import { Card, Skeleton } from 'antd';
import { FaBusAlt, FaUsers } from 'react-icons/fa';
import { FaArrowDown, FaArrowTrendUp, FaArrowUp } from 'react-icons/fa6';

import { LuPhilippinePeso } from 'react-icons/lu';

import { useBusStore } from '../../store/useBusStore';
import { useDriverStore } from '../../store/useDriverStore';
import { useConductorStore } from '../../store/useConductorStore';
import { useEffect } from 'react';

const SummaryCards = () => {
    const { busDetails, loading: busLoading, fetchBusData } = useBusStore();
  const { conductors, loading: conductorsLoading, fetchConductorData } = useConductorStore();
  const { drivers, loading: driversLoading, fetchDriverData } = useDriverStore();

    useEffect(() => {
        fetchConductorData();
        fetchDriverData();
        fetchBusData();
    }, [fetchConductorData, fetchDriverData, fetchBusData]);

    const totalEmployees = drivers.length + conductors.length;

    const isLoading = busLoading || conductorsLoading || driversLoading;

    const summaryData = [
        {
            title: 'Total Buses',
            value: isLoading ? (
                <Skeleton.Input style={{ width: 50, height: 20 }} active />
            ) : (
                busDetails.length
            ),
            icon: (
                <FaBusAlt
                    style={{ width: '20px', height: '20px', color: '#2563eb' }}
                />
            ),
            trend: '+2 this month',
            trendUp: true,
            bgColor: '#eff6ff',
        },
        {
            title: 'Total Employees',
            value: isLoading ? (
                <Skeleton.Input style={{ width: 50, height: 20 }} active />
            ) : (
                totalEmployees
            ),
            subtitle: isLoading ? (
                <Skeleton.Input style={{ width: 80, height: 20 }} active />
            ) : (
                `${drivers.length} Drivers, ${conductors.length} Conductors`
            ),
            icon: (
                <FaUsers
                    style={{ width: '20px', height: '20px', color: '#0d9488' }}
                />
            ),
            trend: '+8 this week',
            trendUp: true,
            bgColor: '#f0fdfa',
        },
        {
            title: 'Daily Income',
            value: '₱12,450',
            icon: (
                <FaArrowTrendUp
                    style={{ width: '20px', height: '20px', color: '#16a34a' }}
                />
            ),
            trend: '+15% from yesterday',
            trendUp: true,
            bgColor: '#f0fdf4',
        },
        {
            title: 'Pending Salaries',
            value: '₱8,200',
            icon: (
                <LuPhilippinePeso
                    style={{ width: '20px', height: '20px', color: '#ea580c' }}
                />
            ),
            trend: '12 employees',
            trendUp: false,
            bgColor: '#fff7ed',
        },
    ];
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
                marginBottom: '32px',
            }}
        >
            {summaryData.map((item, index) => (
                <Card
                    key={index}
                    hoverable
                    style={{
                        transition: 'box-shadow 0.2s',
                    }}
                    bodyStyle={{ padding: '16px' }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '8px',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#4b5563',
                            }}
                        >
                            {item.title}
                        </div>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '9999px',
                                backgroundColor: item.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {item.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <div
                            style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: '#111827',
                                marginBottom: '4px',
                            }}
                        >
                            {item.value}
                        </div>
                        {item.subtitle && (
                            <div
                                style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    marginBottom: '8px',
                                }}
                            >
                                {item.subtitle}
                            </div>
                        )}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '12px',
                            }}
                        >
                            {item.trendUp ? (
                                <FaArrowUp
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        marginRight: '4px',
                                        color: '#22c55e',
                                    }}
                                />
                            ) : (
                                <FaArrowDown
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        marginRight: '4px',
                                        color: '#ef4444',
                                    }}
                                />
                            )}
                            <span
                                style={{
                                    color: item.trendUp ? '#16a34a' : '#dc2626',
                                }}
                            >
                                {item.trend}
                            </span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCards;
