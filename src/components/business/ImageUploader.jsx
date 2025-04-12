import { normalizeImageNames } from "@/utils/utils.js";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import { useEffect, useRef, useState } from "react";

const ImageUploader = ({ className, onFilesChange, reset, ...otherProps }) => {
  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (reset) {
      fileInputRef.current.value = "";
      setFileNames([]);
      setPreviews([]);
      onFilesChange([]);
    }
  }, [reset]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const normalizedFiles = files.map((file) => {
      const normalizedName = normalizeImageNames([file.name])[0];
      return new File([file], normalizedName, { type: file.type });
    });

    setFileNames(normalizedFiles.map((file) => file.name));
    setPreviews(normalizedFiles.map((file) => URL.createObjectURL(file)));
    onFilesChange(normalizedFiles);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {previews.length > 0 && (
        <div className="mb-4 w-full">
          <div
            className={`flex justify-center space-x-2 ${previews.length > 1 ? "flex-wrap" : ""}`}
          >
            {previews.map((src, i) => (
              <div
                key={i}
                className="relative mb-2 h-24 w-24 rounded-xl bg-slate-500 shadow-2xl"
              >
                <Image
                  src={src}
                  alt={`Preview ${i + 1}`}
                  fill
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={className}
        {...otherProps}
      >
        Choisir des images
      </Button>

      <input
        ref={fileInputRef}
        id="file-input"
        type="file"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="mt-2 text-sm text-gray-300">
        {fileNames.length > 0
          ? `${fileNames.length} fichier${fileNames.length > 1 ? "s" : ""} sélectionné${fileNames.length > 1 ? "s" : ""} : ${fileNames.join(", ")}`
          : "Aucun fichier sélectionné"}
      </div>
    </div>
  );
};

export default ImageUploader;
