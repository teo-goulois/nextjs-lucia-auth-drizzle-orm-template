import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./navigation";
import deepmerge from "deepmerge";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const now = headers().get("x-now");
  const timeZone = headers().get("x-time-zone") ?? "Europe/Vienna";

  const fallbackMessages = (await import(`@/../../messages/en.json`)).default;
  const messages = (await import(`@/../../messages/${locale}.json`)).default;

  const messagesWithFallback = deepmerge(fallbackMessages, messages) as any;

  return {
    now: now ? new Date(now) : undefined,
    timeZone,
    messages: messagesWithFallback,
    defaultTranslationValues: {
      highlight: (chunks) => <strong>{chunks}</strong>,
      br: () => <br />,
      b: (chunks) => <b>{chunks}</b>,
    },
    formats: {
      dateTime: {
        medium: {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: false,
        },
      },
    },
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === "production"
          ? "MISSING_MESSAGE"
          : "MISSING_MESSAGE: Could not resolve `missing` in `Index`." +
            error.message)
      ) {
        // Do nothing, this error is triggered on purpose
      } else {
        console.error(JSON.stringify(error.message));
      }
    },
    getMessageFallback({ key, namespace }) {
      return (
        "`getMessageFallback` called for " +
        [namespace, key].filter((part) => part != null).join(".")
      );
    },
  };
});
