import { Typography } from 'antd';
import BusList from '../../components/Bus/BusList';
import AddBus from '../../components/Bus/AddBus';

const { Title } = Typography;
const BusesPage = ({
    setActiveWidget,
    setSelectedBusId,
}: {
    setActiveWidget: (key: number) => void;
    setSelectedBusId: (id: string) => void;
}) => {
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
                    Buses
                </Title>
                <AddBus />
            </div>
            <BusList
                setActiveWidget={setActiveWidget}
                setSelectedBusId={setSelectedBusId}
            />
        </div>
    );
};

export default BusesPage;
