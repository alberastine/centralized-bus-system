import { Typography } from 'antd';
import BusList from '../../components/Bus/BusList';

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
            <Title level={4} style={{ margin: '0 0 1rem 0' }}>
                Buses
            </Title>
            <BusList
                setActiveWidget={setActiveWidget}
                setSelectedBusId={setSelectedBusId}
            />
        </div>
    );
};

export default BusesPage;
