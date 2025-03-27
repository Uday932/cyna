"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/app/context/AppContext.js";
import Text from "@@/ui/Text";
import routes from "@/utils/routes";

const BackOffice = () => {
  const { state } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.session || state.session.role !== "ADMIN") {
      router.push(routes.home());
    }
  }, [state.session, router]);

  if (!state.session || state.session.role !== "ADMIN") {
    return null;
  }

  return (
    <div>
      <Text size="title" color="black" style="center">
        Bienvenue dans le BackOffice
      </Text>
    </div>
  );
};

export default BackOffice;
