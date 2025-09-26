import { Typography } from 'antd';
import BusList from '../../components/Bus/BusList';
import AddBus from '../../components/Bus/AddBus';
import { useState } from 'react';

const { Title } = Typography;
const BusesPage = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
    const [busCount, setBusCount] = useState(0);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}
            >
                <Title level={4} style={{ margin: '0' }}>
                    Total Buses Owned: {busCount}
                </Title>
                <AddBus />
            </div>
            <BusList
                setActiveWidget={setActiveWidget}
                setSelectedBusId={setSelectedBusId}
                onBusCountChange={setBusCount}
            />
        </div>
    );
};

export default BusesPage;
