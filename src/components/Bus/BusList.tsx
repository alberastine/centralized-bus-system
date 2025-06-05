import { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Buses } from '../../types';

const BusList = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const [buses, setBuses] = useState<Buses[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: busData } = await supabase.from('buses').select('*');
            setBuses(busData || []);

            setLoading(false);
        };

        fetchData();
    }, []);

    const busColumns = [
        {
            title: 'Route Number',
            dataIndex: 'route_number',
            key: 'route_number',
        },
        {
            title: 'Bus Number',
            dataIndex: 'bus_number',
            key: 'bus_number',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <Table
                    dataSource={buses}
                    columns={busColumns}
                    pagination={false}
                    rowKey="bus_id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            setActiveWidget(4);
                            setSelectedBusId(record.bus_id);
                            console.log(`Bus clicked: ${record.bus_id}`);
                        },
                    })}
                />
            )}
        </div>
    );
};

export default BusList;
