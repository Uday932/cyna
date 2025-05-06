import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Modal from "@@/ui/Modal.jsx";
import Text from "@@/ui/Text.jsx";

const ServiceDeleteConfirmationModal = ({
  title,
  isOpen,
  onClose,
  onConfirmDelete,
  isDeleting,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmer la suppression">
      <div className="flex flex-col items-center">
        <Text>{title}</Text>

        <div className="flex gap-4 mt-4">
          <div className="bg-green-500 flex flex-row rounded px-2">
            {isDeleting && (
              <Image
                width={40}
                height={40}
                src="/icons/load.png"
                alt="Modifier"
                className="animate-spin rounded-xl bg-transparent p-1"
              />
            )}

            <Button onClick={() => onConfirmDelete()} color="none">
              Confirm
            </Button>
          </div>
          <Button color="danger" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDeleteConfirmationModal;
