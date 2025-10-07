import { Button, Form, Input } from 'antd';
import { useModalStore } from '../../../store/useModalStore';
import { useBusStore } from '../../../store/useBusStore';

import '../../../styles/BusStyle.css';

import { useEffect } from 'react';

const AddBusFormModal = () => {
    const [form] = Form.useForm();

    const { closeModal } = useModalStore();
    const { fetchNextBusNumber, nextBusNumber, addBus } = useBusStore();

    useEffect(() => {
        const loadBusNumber = async () => {
            await fetchNextBusNumber();
        };
        loadBusNumber();
    }, [fetchNextBusNumber]);

    useEffect(() => {
        if (nextBusNumber) {
            form.setFieldsValue({ bus_number: nextBusNumber });
        }
    }, [nextBusNumber, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const payload = {
                ...values,
                status: values.status || 'active',
            };
            await addBus(payload);
            console.log('Valid values:', payload);
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
        <Form
            form={form}
            layout="vertical"
            style={{ overflow: 'auto', maxHeight: '50vh' }}
            requiredMark={false}
        >
            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Route Number
                    </span>
                }
                name="route_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the route number!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Bus Number
                    </span>
                }
                name="bus_number"
                rules={[
                    { required: true, message: 'Please input the bus number!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>
                        Plate Number
                    </span>
                }
                name="plate_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the plate number!',
                    },
                ]}
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
                <Button
                    className="custom-btn"
                    color="danger"
                    variant="dashed"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    className="custom-btn"
                    type="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AddBusFormModal;
