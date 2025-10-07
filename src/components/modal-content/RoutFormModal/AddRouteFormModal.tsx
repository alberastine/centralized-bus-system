import { Form, Input, Button } from 'antd';
import { useModalStore } from '../../../store/useModalStore';
import { useRouteStore } from '../../../store/useRouteStore';

const AddRouteFormModal = () => {
    const [form] = Form.useForm();
    const { closeModal } = useModalStore();
    const { addRoute } = useRouteStore();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addRoute(values);
            form.resetFields();
            closeModal();
        } catch (err) {
            console.error('Validation failed:', err);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        closeModal();
    };

    return (
        <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item
                label={<span style={{ fontWeight: 600 }}>Route Number</span>}
                name="route_number"
                rules={[
                    {
                        required: true,
                        message: 'Please input the route number!',
                    },
                ]}
            >
                <Input placeholder="17B" />
            </Form.Item>

            <Form.Item
                label={
                    <span style={{ fontWeight: 600 }}>Route Description</span>
                }
                name="route_description"
                rules={[
                    {
                        required: true,
                        message: 'Please input the route description!',
                    },
                ]}
            >
                <Input.TextArea placeholder="Apas-Lahug-Escario-Jones-Carbon" />
            </Form.Item>

            <div
                style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}
            >
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default AddRouteFormModal;
