"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";
import Input from "@@/ui/Input";
import Button from "@@/ui/Button";
import { Form, Formik } from "formik";
import FormField from "@/components/ui/FormField";
import * as Yup from "yup";
import { stringValidator } from "@/utils/validators";
import Link from "@/components/ui/Link";
import routes from "@/utils/routes";
import { cn } from "@/lib/utils";
import Image from "@/components/ui/Image";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const TextSchema = Yup.object().shape({
  textePrincipal: stringValidator("texte principal"),
});

const CAROUSEL_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CAROUSEL_URL || "";

export default function Homepage() {
  const [text, setText] = useState("");
  const [carouselItems, setCarouselItems] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchCarouselData();
    axios
      .get(apiRoutes.textSection())
      .then((response) => setText(response.data?.content || ""))
      .catch((error) => {
        console.error("Erreur lors du fetch du texte :", error);
      });

    axios
      .get(apiRoutes.carousel.all())
      .then((response) => {
        setCarouselItems(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch du carrousel :", error);
      });
  }, []);

  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(apiRoutes.carousel.all());
      setCarouselItems(response.data);
    } catch (error) {
      console.error("Erreur lors du fetch du carrousel :", error);
    }
  };

  const handleSubmitTextSection = async (values, { resetForm }) => {
    try {
      setMessage("");
      setIsError(false);
      console.log(values.textePrincipal);

      const { data } = await axios.patch(apiRoutes.backoffice.textSection(), {
        textePrincipal: values.textePrincipal,
      });

      setMessage(data.message);
    } catch (error) {
      setIsError(true);

      if (error.response) {
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      } else if (error.request) {
        setMessage(
          "Le serveur est actuellement hors ligne. Veuillez réessayer plus tard.",
        );
      } else {
        setMessage("Une erreur interne s'est produite.");
      }
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...carouselItems];
    updatedItems[index][field] = value;
    setCarouselItems(updatedItems);
  };

  const handleAddSlide = async () => {
    try {
      const newSlide = {
        title: "Nouveau slide",
        image: "test.jpg",
        description: "Ceci est une description",
        link: "/test/",
      };

      await axios.post(apiRoutes.backoffice.createCarousel(), newSlide);

      fetchCarouselData();
    } catch (error) {
      console.error("Erreur lors de l'ajout du slide :", error);
    }
  };

  const handleDeleteSlide = async (id) => {
    const isInDatabase = !isNaN(Number(id));

    if (isInDatabase) {
      try {
        const deleteUrl = apiRoutes.backoffice.carousel(id);
        await axios.delete(deleteUrl);
      } catch (error) {
        console.error("Erreur lors de la suppression de la slide :", error);
        return;
      }
    }

    setCarouselItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <Text size="subtitle" color="black">
        Modifier la section de texte
      </Text>

      <Formik
        initialValues={{
          textePrincipal: text,
        }}
        validationSchema={TextSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmitTextSection(values, { resetForm })
        }
      >
        {({ isSubmitting }) => (
          <Form className="flex w-1/3 flex-col gap-2">
            <FormField
              name="textePrincipal"
              placeholder="Texte principal"
              className="w-full"
              required
            />
            <Button type="submit">
              {isSubmitting ? "En cours..." : "Valider"}
            </Button>
          </Form>
        )}
      </Formik>
      <Text
        className={cn(
          "my-2 min-h-[40px] rounded p-1",
          isError ? "bg-red-500" : "",
        )}
      >
        {message}
      </Text>
      {/* Section du carrousel */}
      <div className="mb-10 flex flex-col items-center">
        <Text size="subtitle" color="black" className="mt-6">
          Modifier le carrousel
        </Text>
      </div>

      {carouselItems.length > 0 && (
        <table className="p-2">
          <thead>
            <tr>
              {Object.keys(carouselItems[0]).map((key) => {
                return (
                  <th key={key} className="px-6">
                    <Text
                      color="black"
                      className="flex flex-row items-center justify-center first-letter:uppercase"
                    >
                      {key}
                    </Text>
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {carouselItems.map((item) => (
              <tr key={item.id}>
                {Object.keys(item).map((column) => {
                  if (column === "image") {
                    return (
                      <td key={column} className="w-[200px] min-w-[200px]">
                        <Image
                          width={250}
                          height={250}
                          src={`${CAROUSEL_URL}${item[column]}`}
                          alt={"Image" + item.title}
                        />
                      </td>
                    );
                  } else if (column === "createdAt" || column === "updatedAt") {
                    return (
                      <td key={column}>
                        <Text color="black" className="px-2 text-center">
                          {dateFormatter.format(new Date(item[column]))}
                        </Text>
                      </td>
                    );
                  } else {
                    return (
                      <td key={column}>
                        <Text color="black" className="px-2 text-center">
                          {item[column]}
                        </Text>
                      </td>
                    );
                  }
                })}

                {/* Bouton Modifier */}
                <td className="w-[70px] min-w-[70px] px-1.5">
                  <Link href={routes.backoffice.homepage.editCarousel(item.id)}>
                    <Image
                      width={35}
                      height={35}
                      src="/icons/edit.png"
                      alt="Modifier"
                      className="rounded-xl bg-button p-1"
                    />
                  </Link>
                </td>

                {/* Bouton Supprimer */}
                <td className="w-[70px] min-w-[70px] px-1.5">
                  <Button onClick={() => handleDeleteSlide(item.id)}>
                    <Image
                      width={35}
                      height={35}
                      src="/icons/delete.png"
                      alt="Supprimer"
                      className="rounded-xl bg-button p-1"
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button
        onClick={handleAddSlide}
        className="bg-blue-600 rounded px-4 py-2 text-white"
      >
        Ajouter un slide
      </Button>
    </div>
  );
}
