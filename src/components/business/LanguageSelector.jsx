"use client";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Text from "@@/ui/Text.jsx";
import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "fr", name: "Français", flag: "/icons/flag-france.png" },
  { code: "en", name: "English", flag: "/icons/flag-england.png" },
];

const LanguageSelector = ({ handleClick, currentLocale }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLang =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-left flex">
      <Button onClick={() => setOpen(!open)} color="none">
        <Image
          src={selectedLang.flag}
          alt={selectedLang.name}
          width={35}
          height={35}
        />
      </Button>

      {open && (
        <div className="absolute z-10 mt-12 w-32 rounded-md shadow-lg bg-white">
          <ul>
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => {
                  if (lang.code !== currentLocale) {
                    handleClick(lang.code);
                  }
                  setOpen(false);
                }}
                className="px-2 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex items-center space-x-2"
              >
                <Image src={lang.flag} alt={lang.name} width={30} height={30} />
                <Text as="span" color="black">
                  {lang.name}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
