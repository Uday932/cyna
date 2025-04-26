import Button from "@@/ui/Button.jsx";
import Modal from "@@/ui/Modal.jsx";
import Text from "@@/ui/Text.jsx";

const ServiceDeleteConfirmationModal = ({
  isOpen,
  onClose,
  serviceToDelete,
  onConfirmDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmer la suppression">
      <div className="flex flex-col items-center">
        <Text>Are you sure you want to delete this service?</Text>

        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => onConfirmDelete(serviceToDelete)}
            color="success"
          >
            Confirm
          </Button>
          <Button color="danger" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDeleteConfirmationModal;
