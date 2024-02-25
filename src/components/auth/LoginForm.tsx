"use client";

import React, { useMemo } from "react";
import { Button, Input, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import {
  loginWithGithub,
  loginWithGoogle,
  loginWithMagicLink,
} from "@/lib/api/auth/login";
import { Controller, useForm } from "react-hook-form";
import { LoginValitor, loginValidator } from "@/lib/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProviderForm } from "./ProviderForm";

export default function LoginForm() {
  const methods = useForm<LoginValitor>({
    resolver: zodResolver(loginValidator),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const magicLinkMutation = useMutation({
    mutationFn: async (input: LoginValitor) => {
      const data = await loginWithMagicLink(input);
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const onSubmit = (data: LoginValitor) => {
    magicLinkMutation.mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-2 text-xl font-medium">Log In</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  label="Email Address"
                  type="email"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              );
            }}
          />

          <Button
            isLoading={magicLinkMutation.isPending}
            color="primary"
            startContent={
              <Icon
                className="pointer-events-none text-2xl"
                icon="solar:letter-bold"
              />
            }
            type="submit">
            Continue with Email
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <ProviderForm />
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
