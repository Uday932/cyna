"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "";

const Item = ({ label, value }) => (
  <div>
    <Text>{label} :</Text>
    <Text>{value}</Text>
  </div>
);

const ServiceBackofficeDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(apiRoutes.services.single(id));
        setService(data);
      } catch (err) {
        setError("Impossible de charger le service.");
      }
    };

    fetchService();
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <Text color="error">{error}</Text>
        <Button onClick={() => router.push(routes.backoffice.services.all())}>
          Retour à la liste
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {service && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Text size="subtitle" className="font-bold">
              Détail du service
            </Text>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  router.push(routes.backoffice.services.edit(service.id))
                }
              >
                Modifier
              </Button>
              <Button variant="danger">Supprimer</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Item label="Nom" value={service.name} />
            <Item label="Catégorie" value={service.category || "N/A"} />
            <Item label="Résumé" value={service.summary} />
            <Item label="Description" value={service.description || "—"} />
            <Item
              label="Caractéristiques techniques"
              value={service.technicalCharacteristics || "—"}
            />
            <Item
              label="Bénéfices entreprise"
              value={service.companyBenefits || "—"}
            />
            <Item label="Prix mensuel" value={`${service.monthlyPrice} €`} />
            <Item label="Prix annuel" value={`${service.annualPrice} €`} />
            <Item
              label="Prix par utilisateur"
              value={`${service.perUserPrice} €`}
            />
            <Item
              label="Prix par appareil"
              value={`${service.perDevicePrice} €`}
            />
            <Item label="Ressources max" value={service.maxResources} />
            <Item label="Ressources utilisées" value={service.usedResources} />
            <Item label="Disponibilité" value={service.availability} />
            <Item label="Priorité" value={service.priority} />
            <Item
              label="Créé le"
              value={new Date(service.createdAt).toLocaleString("fr-FR")}
            />
            <Item
              label="Mis à jour le"
              value={new Date(service.updatedAt).toLocaleString("fr-FR")}
            />
          </div>

          {service.images?.length > 0 && (
            <div className="mt-8">
              <Text className="mb-2 font-semibold">Images :</Text>
              <div className="flex flex-wrap gap-4">
                {service.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={`${CLOUDINARY_BASE_URL}${decodeURIComponent(img)}`}
                    width={300}
                    height={300}
                    alt={`Image ${idx + 1}`}
                    className=""
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceBackofficeDetail;
