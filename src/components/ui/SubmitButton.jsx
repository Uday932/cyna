import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import clsx from "clsx";

const SubmitButton = (props) => {
  const { className, isSubmitting = false, children, ...otherProps } = props;
  return (
    <div
      className={clsx(
        "active:bg-success/70 flex flex-row justify-center rounded bg-green-500 px-2 shadow-md shadow-black transition-transform duration-100 active:scale-95",
        className,
      )}
    >
      {isSubmitting && (
        <Image
          width={40}
          height={40}
          src="/icons/load.png"
          alt="Modifier"
          className="animate-spin rounded-xl bg-transparent p-1"
        />
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        color="none"
        {...otherProps}
      >
        {isSubmitting
          ? "Enregistrement..."
          : children
            ? children
            : "Enregistrer"}
      </Button>
    </div>
  );
};

export default SubmitButton;
