"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export const Cta = () => {
  const t = useTranslations("Home");
  return (
    <footer className="py-40">
      <div className="container">
        <h1 className="relative z-10 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          {t("Cta.title")}
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          {t("Cta.subtitle")}
        </p>
        <div className="flex justify-center pt-6">
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            size="lg"
            as={"a"}
            href="https://github.com/teo-goulois/nextjs-lucia-auth-drizzle-orm-template"
            target="_blank">
            {t("Cta.action")}
          </Button>
        </div>
      </div>
    </footer>
  );
};
