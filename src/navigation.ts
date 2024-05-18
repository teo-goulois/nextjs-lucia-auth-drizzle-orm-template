import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const defaultLocale = "en";

export const locales = ["en", "fr"] as const;

export const localePrefix = "as-needed";

// special characters can't be used in pathnames
export const pathnames = {
  "/": "/",
  /* Auth */
  "/auth/login": {
    en: "/login",
    fr: "/connexion",
  },
  "/auth/register": {
    en: "/register",
    fr: "/inscription",
  },
  "/auth/forgot-password": {
    en: "/forgot-password",
    fr: "/mot-de-passe-oublie",
  },
  "/auth/reset-password": {
    en: "/reset-password",
    fr: "/reinitialiser-mot-de-passe",
  },
  "/auth/verify-email": {
    en: "/verify-email",
    fr: "/verifier-email",
  },
  /* Documents */
  privacy: {
    en: "/privacy",
    fr: "/confidentialite",
  },
  terms: {
    en: "/terms",
    fr: "/conditions",
  },
  /* Dashboard */
  "/protected": {
    en: "/protected",
    fr: "/protege",
  },
} satisfies Pathnames<typeof locales>;

export type Pathname = keyof typeof pathnames | "#";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
