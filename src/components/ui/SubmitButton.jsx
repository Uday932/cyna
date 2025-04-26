import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const SubmitButton = (props) => {
  const t = useTranslations("components.submitButton");
  const {
    className,
    isSubmitting = true,
    loadingText = t("loading"),
    defaultText = t("default"),
    children,
    ...otherProps
  } = props;
  return (
    <div
      className={clsx(
        "flex flex-row justify-center rounded bg-button active:bg-button/70 shadow-md shadow-black transition-transform duration-100 active:scale-95",
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
        {isSubmitting ? loadingText : children || defaultText}
      </Button>
    </div>
  );
};

export default SubmitButton;
