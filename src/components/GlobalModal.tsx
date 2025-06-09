import { Modal } from 'antd';

type GlobalModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const GlobalModal = ({ open, onClose, title, children, footer = null }: GlobalModalProps) => {
  return (
    <Modal title={title} open={open} onCancel={onClose} footer={footer}>
      {children}
    </Modal>
  );
};

export default GlobalModal;
