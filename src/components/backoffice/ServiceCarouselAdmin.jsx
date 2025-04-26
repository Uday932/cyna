import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "";

const ServiceCarouselAdmin = ({
  images,
  imagesToDelete,
  setImagesToDelete,
}) => {
  const handleRemove = (name) => {
    setImagesToDelete((prev) =>
      prev.includes(name)
        ? prev.filter((img) => img !== name)
        : [...prev, name],
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((img, idx) => {
        const isMarkedForDeletion = imagesToDelete.includes(img);
        return (
          <div
            key={idx}
            className="relative h-48 w-full md:h-56 lg:h-80 xl:h-72"
          >
            <Image
              src={`${CLOUDINARY_BASE_URL}${decodeURIComponent(img)}`}
              alt={`Image ${idx + 1}`}
              fill
              className={`h-full w-full object-contain transition ${
                isMarkedForDeletion ? "border-2 border-red-400 opacity-50" : ""
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <Button
              type="button"
              color="none"
              onClick={() => handleRemove(img)}
              className="absolute right-0 top-0 z-50 m-2 p-1 hover:scale-125"
              style={{ position: "absolute", top: "5px", right: "5px" }}
            >
              <Image
                width={20}
                height={20}
                src="/icons/cross.png"
                alt={isMarkedForDeletion ? "Restore" : "Delete"}
                className="transition duration-500"
              />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceCarouselAdmin;
