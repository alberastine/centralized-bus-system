import { Modal } from 'antd';

type GlobalModalProps = {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
};

const GlobalModal = ({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer = null,
}: GlobalModalProps) => {
    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={footer}
            centered
            title={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {title && (
                        <span
                            style={{
                                fontSize: '18px',
                            }}
                        >
                            {title}
                        </span>
                    )}
                    {subtitle && (
                        <span
                            style={{
                                fontSize: '14px',
                                color: '#717182',
                                marginBottom: 8,
                            }}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
            }
        >
            {children}
        </Modal>
    );
};

export default GlobalModal;
