import { useModalStore } from "../../store/useModalStore";
import { Button } from 'antd';
import UpdateBusDetailsModal from '../modal-content/BusFormModals/UpdateBusDetialsModal';

const UpdateBusDetails = ({ busId }: { busId: string }) => {
    
    const { openModal } = useModalStore();

    const handleClick = () => {
        openModal(<UpdateBusDetailsModal busId={busId} />, 'Update Bus Details');
    };

    return (
        <Button type="primary" className="custom-btn" onClick={handleClick}>
            Update Bus Details
        </Button>
    );
}

export default UpdateBusDetails