"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import { cn } from "@/lib/utils.js";
import routes from "@/utils/routes.js";
import UserInfoModal from "@@/business/UserInfoModal.jsx";
import Button from "@@/ui/Button";
import Input from "@@/ui/Input.jsx";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Account = () => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [userInfoEditMessage, setUserInfoEditMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios(apiRoutes.users.single());

        setUser(data);
        console.log(data);
      } catch (error) {
        setIsError(true);

        if (error.response) {
          setMessage(
            error.response.data.error ||
              error.response.data.message ||
              t("form.apiErrors.genericError"),
          );
        } else if (error.request) {
          setMessage(t("form.apiErrors.offlineError"));
        } else {
          setMessage(t("form.apiErrors.internalError"));
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Text size="title">{t("account.title")}</Text>

      <Text className={cn("min-h-[40px] rounded p-1", isError && "bg-red-500")}>
        {message}
      </Text>

      {isError && !user && (
        <Link href={routes.home()}>{t("navigation.goToHomePage")}</Link>
      )}

      {user && (
        <div className="flex w-1/4 flex-col gap-4">
          <Input
            value={user.firstName}
            label={t("common.firstName")}
            disabled
          />

          <Input value={user.lastName} label={t("common.lastName")} disabled />

          <Input value={user.email} label={t("common.email")} disabled />

          <Input
            value="*********"
            label={t("common.password")}
            type="password"
            disabled
          />

          <div className="flex justify-center">
            <Button
              onClick={() => setIsUserInfoModalOpen(true)}
              className="bg-button"
            >
              {t("common.edit")}
            </Button>
          </div>
        </div>
      )}

      {userInfoEditMessage && (
        <Text className="text-center bg-green-500 p-1 rounded-lg">
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
