"use client";

import {
    Lock,
    Mails,
    Palette,
    Route,
    Share2,
    ShieldBan,
    ShieldCheck
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";

export const FeatureGrid = () => {
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
const items = [
  {
    title: "Password-less Auth with Email Link and Code",
    description: "Frictionless Access, Enhanced Security.",
    header: <Skeleton />,
    icon: <Mails className="size-5 " />,
  },
  {
    title: "GitHub, Google, and More Auth",
    description: "Seamless Integration with Popular Providers.",
    header: <Skeleton />,
    icon: <Share2 className="size-5 " />,
  },
  {
    title: "Middleware Routing",
    description: "Streamlined Route Management.",
    header: <Skeleton />,
    icon: <Route className="size-5 " />,
  },
  {
    title: "Password Auth with Reset Password Functionality",
    description: "Secure User Access, Hassle-free Recovery.",
    header: <Skeleton />,
    icon: <Lock className="size-5 " />,
  },
  {
    title: "Two-Factor Auth for More Protection",
    description: "Double the Security, Zero Compromise.",
    header: <Skeleton />,
    icon: <ShieldCheck className="size-5 " />,
  },
  {
    title: "Custom Email with React Email",
    description: "Engage Users with Stunning Email Communications.",
    header: <Skeleton />,
    icon: <Palette className="size-5 " />,
  },
  {
    title: "Rate Limiting",
    description: "Maintain Application Integrity with Built-in Rate Limiting.",
    header: <Skeleton />,
    icon: <ShieldBan className="size-5 " />,
  },
];
