"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import appConfig from "@/utils/appConfig.js";
import UserInfoModal from "@@/business/UserInfoModal.jsx";
import Button from "@@/ui/Button";
import Input from "@@/ui/Input.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

const Account = () => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [userInfoEditMessage, setUserInfoEditMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const conf = {
          headers: {
            Authorization: `Bearer ${getCookie(appConfig.security.session.cookieName)}`,
          },
        };

        const { data } = await axios(apiRoutes.users.single(), conf);

        setUser(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur",
          error,
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <Text size="title">Profil utilisateur</Text>

      {user && (
        <div className="flex w-1/4 flex-col gap-4">
          <Input
            placeholder="Prénom"
            value={user.firstName}
            label="Prénom"
            disabled
          />

          <Input placeholder="Nom" value={user.lastName} label="Nom" disabled />

          <Input
            placeholder="Email"
            value={user.email}
            label="Email"
            disabled
          />

          <Input
            placeholder="Mot de passe"
            value="*********"
            label="Mot de passe"
            type="password"
            disabled
          />
        </div>
      )}

      <Button
        onClick={() => setIsUserInfoModalOpen(true)}
        className="bg-button"
      >
        Modifier
      </Button>

      {userInfoEditMessage && (
        <Text color="success" className="text-center">
          {userInfoEditMessage}
        </Text>
      )}

      {user && (
        <UserInfoModal
          isOpen={isUserInfoModalOpen}
          onClose={() => setIsUserInfoModalOpen(false)}
          user={user}
          setMessageSucces={setUserInfoEditMessage}
        />
      )}
    </div>
  );
};

export default Account;
