export interface ModalProps {
  onClose?: () => void;
  children?: React.ReactNode;
  position?: "top" | "center"
}
