"use client";

import { LANGUAGES_OPTIONS } from "@/lib/constants";
import { usePathname, useRouter } from "@/navigation";
import { Select, SelectItem } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { locale: l, ...params } = useParams();

  // pathname exemple: /en/website/brands/[slug]/catalog, we should replace [slug] with the current slug with params.slug
  // here we should replace every value in [params] with the current value in params
  const formatedPathname = pathname.replace(
    /\[(.*?)\]/g,
    (match, p1): string => {
      return params[p1] as string;
    }
  );

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      const url = `${formatedPathname}?${searchParams.toString()}`;
      // @ts-ignore
      router.replace(url as any, { locale: nextLocale });
    });
  }

  const currentLang = LANGUAGES_OPTIONS.find((lang) => lang.value === locale);
  const ref = useRef<HTMLDivElement>(null);

  const [wrapper, setWrapper] = useState<Element | undefined>(undefined);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWrapper(document.querySelector("#nav-wrapper") ?? undefined);
  }, []);

  return (
    <div ref={ref} className="relative z-0">
      <Select
        aria-label={t("label")}
        defaultSelectedKeys={
          currentLang ? [currentLang.value] : [LANGUAGES_OPTIONS[0].value]
        }
        popoverProps={{
          portalContainer: wrapper,
        }}
        className="w-fit min-w-24 max-w-xs"
        listboxProps={{
          itemClasses: {
            base: "data-[hover=true]:bg-default-100/80",
            title: "font-bold",
          },
        }}
        onChange={(event) => {
          console.log("event", event.target.value);
          onSelectChange(event.target.value);
        }}
        renderValue={(items) => {
          return items.map((item) => {
            const lang = LANGUAGES_OPTIONS.find(
              (lang) => lang.value === item.key
            );
            return (
              <div key={item.key} className="flex items-center gap-1.5">
                <p className="">{lang?.label}</p>
              </div>
            );
          });
        }}>
        {LANGUAGES_OPTIONS.map((lang) => (
          <SelectItem
            textValue={lang.label}
            key={lang.value}
            value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
