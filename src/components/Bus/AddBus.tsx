import { Button } from 'antd';
import { useModalStore } from '../../store/useModalStore';
import AddBusFormModal from '../modal-content/BusFormModals/AddBusFormModal';

import '../../styles/BusStyle.css';

const AddBus = () => {
    const { openModal } = useModalStore();

    const handleClick = () => {
        openModal(<AddBusFormModal />, 'Add New Bus');
    };

    return (
        <Button type="primary" className="custom-btn" onClick={handleClick}>
            Add Bus
        </Button>
    );
};

export default AddBus;
