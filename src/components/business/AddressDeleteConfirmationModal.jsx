import Button from "@@/ui/Button.jsx";
import Modal from "@@/ui/Modal.jsx";
import Text from "@@/ui/Text.jsx";
import { useTranslations } from "next-intl";

const AddressDeleteConfirmationModal = ({
  isOpen,
  onClose,
  addressToDelete,
  onConfirmDelete,
}) => {
  const t = useTranslations();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmer la suppression">
      <div className="flex flex-col items-center">
        <Text>{t("account.deleteConfirmationTitle")}</Text>

        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => onConfirmDelete(addressToDelete)}
            color="success"
          >
            {t("common.confirm")}
          </Button>
          <Button color="danger" onClick={onClose}>
            {t("common.cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressDeleteConfirmationModal;
