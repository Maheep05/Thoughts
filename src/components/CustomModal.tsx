import { FC, memo, ReactNode } from "react";
import Button from "./Button";
import CloseIcon from "./icons/CloseIcon";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const CustomModal: FC<CustomModalProps> = memo(
  ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold  text-gray-800">{title}</h2>
            <Button
              onClickHandler={onClose}
              type={"button"}
              startIcon={<CloseIcon />}
              variant="ghost"
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }
);

export default CustomModal;
