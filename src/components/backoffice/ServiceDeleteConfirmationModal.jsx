import Button from "@@/ui/Button.jsx";
import Modal from "@@/ui/Modal.jsx";
import Text from "@@/ui/Text.jsx";

const ServiceDeleteConfirmationModal = ({ isOpen, onClose, serviceToDelete, onConfirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmer la suppression"
    >
      <div className="flex flex-col items-center">
        <Text>Êtes-vous sûr de vouloir supprimer ce service ?</Text>
        
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => onConfirmDelete(serviceToDelete)}
            color="success"
          >
            Confirmer
          </Button>
          <Button
            color="danger"
            onClick={onClose}
          >
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDeleteConfirmationModal;
