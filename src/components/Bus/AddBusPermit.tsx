import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import BusAddPermitsFormModal from '../modal-content/BusFormModals/BusAddPermitsFormModal';

const AddBusPermit = ({ busId }: { busId: string }) => {
    const { openModal } = useModalStore();

    const handleClick = () => {
        openModal(<BusAddPermitsFormModal busId={busId} />, 'Update Bus Permit Status');
    };
    return (
        <Button type="primary" className="custom-btn" onClick={handleClick}>
            Update Bus Permit Status
        </Button>
    );
};

export default AddBusPermit;
