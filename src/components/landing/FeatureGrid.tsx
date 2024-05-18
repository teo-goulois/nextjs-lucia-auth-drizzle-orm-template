"use client";

import {
  Lock,
  Mails,
  Palette,
  Route,
  Share2,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { useTranslations } from "next-intl";

export const FeatureGrid = () => {
  const t = useTranslations("Home");
  const items = [
    {
      title: t("Features.passwordless.title"),
      description: t("Features.passwordless.description"),
      header: <Skeleton />,
      icon: <Mails className="size-5 " />,
    },
    {
      title: t("Features.provider.title"),
      description: t("Features.provider.description"),
      header: <Skeleton />,
      icon: <Share2 className="size-5 " />,
    },
    {
      title: t("Features.middleware.title"),
      description: t("Features.middleware.description"),
      header: <Skeleton />,
      icon: <Route className="size-5 " />,
    },
    {
      title: t("Features.password.title"),
      description: t("Features.password.description"),
      header: <Skeleton />,
      icon: <Lock className="size-5 " />,
    },
    {
      title: t("Features.tfa.title"),
      description: t("Features.tfa.description"),
      header: <Skeleton />,
      icon: <ShieldCheck className="size-5 " />,
    },
    {
      title: t("Features.email.title"),
      description: t("Features.email.description"),
      header: <Skeleton />,
      icon: <Palette className="size-5 " />,
    },
    {
      title: t("Features.rate-limiting.title"),
      description: t("Features.rate-limiting.description"),
      header: <Skeleton />,
      icon: <ShieldBan className="size-5 " />,
    },
  ];
  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 0 || i === 3 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
