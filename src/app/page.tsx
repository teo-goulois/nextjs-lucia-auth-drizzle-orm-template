import { Button } from "@nextui-org/react";
import { LogInIcon, MountainIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Next.js Authentication Template
              </h1>
              <p className="mx-auto max-w-[600px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Kickstart your Next.js app with authentication. Secure your app
                with user registration, login, and more.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button as={Link} href="/protected">
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 md:px-6 lg:gap-10">
            <div className="mx-auto space-y-4 text-center">
              <div className="space-y-2">
                <UserIcon className="mx-auto w-12 h-12" />
                <h3 className="text-2xl font-bold">User registration</h3>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Allow users to sign up for an account with email and password.
                </p>
              </div>
              <div className="space-y-2">
                <LogInIcon className="mx-auto w-12 h-12" />
                <h3 className="text-2xl font-bold">
                  Login with social media accounts
                </h3>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Enable users to log in using their existing social media
                  accounts.
                </p>
              </div>
              {/*  
             LATER
             <div className="space-y-2">
                <LogInIcon className="mx-auto w-12 h-12" />
                <h3 className="text-2xl font-bold">
                  Password reset functionality
                </h3>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Allow users to reset their password if they forget it.
                </p>
              </div>*/}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
