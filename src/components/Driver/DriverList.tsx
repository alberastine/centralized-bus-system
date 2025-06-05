import { useEffect, useState } from 'react';
import { Table, Skeleton } from 'antd';
import { supabase } from '../../services/supabaseClient';
import type { Drivers } from '../../types';

const DriverList = () => {
    const [drivers, setDrivers] = useState<Drivers[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: driverData } = await supabase
                .from('drivers')
                .select('*');
            setDrivers(driverData || []);
            setLoading(false);
        };

        fetchData();
    }, []);

    const driverColumns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
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
                    dataSource={drivers}
                    columns={driverColumns}
                    pagination={false}
                    rowKey="driver_id"
                    size="small"
                    onRow={(record) => ({
                        onClick: () => {
                            console.log(`Driver clicked: ${record.driver_id}`);
                        },
                    })}
                />
            )}
        </div>
    );
};

export default DriverList;
