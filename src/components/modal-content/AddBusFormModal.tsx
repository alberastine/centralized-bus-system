import { Button, Form, Input } from 'antd';
import { useModalStore } from '../../store/useModalStore';

import '../../styles/BusStyle.css';

const AddBusFormModal = () => {
    const [form] = Form.useForm();
    const { closeModal } = useModalStore();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log('Valid values:', values);
            form.resetFields();
            closeModal();
        } catch (err) {
            console.log('Validation failed:', err);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        closeModal();
    };

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                label="Bus Number"
                name="bus_number"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Route Number"
                name="route_number"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 16,
                }}
            >
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AddBusFormModal;
