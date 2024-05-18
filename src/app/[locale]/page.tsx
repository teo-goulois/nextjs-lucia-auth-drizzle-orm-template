import { Cta } from "@/components/Cta";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@nextui-org/react";
import { SparklesIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Home() {
  const t = await getTranslations("Home");
  return (
    <>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container  grid items-center gap-4 px-4 text-center md:px-6 md:gap-10">
            <div className="space-y-3 relative">
              <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
              />{" "}
              <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                {t.rich("Hero.title")}
              </h1>
              <p className="pt-4 font-normal text-base lg:text-lg text-neutral-300 max-w-lg text-center mx-auto">
                {t("Hero.subtitle")}
              </p>
            </div>
            <div className="flex justify-center gap-6 items-center">
              <Button
                startContent={<SparklesIcon className="size-5" />}
                size="lg"
                as={Link}
                href="/protected">
                {t("Hero.action.sign-in")}
              </Button>
              <Button size="lg" variant="bordered" as={Link} href="/protected">
                {t("Hero.action.dashboard")}
              </Button>
            </div>
          </div>
        </section>
        <FeatureGrid />
        <Cta />
      </main>
    </>
  );
}
