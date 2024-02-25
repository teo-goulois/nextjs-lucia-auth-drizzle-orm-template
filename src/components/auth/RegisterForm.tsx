"use client";

import { register } from "@/lib/api/auth/register";
import {
  RegisterValidator,
  registerValidator
} from "@/lib/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProviderForm } from "./ProviderForm";

export default function RegisterForm() {
  const methods = useForm<RegisterValidator>({
    resolver: zodResolver(registerValidator),
    values: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const registerMutation = useMutation({
    mutationFn: async (input: RegisterValidator) => {
      const data = await register({ email: input.email });
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onSuccess: () => {
      toast.success(
        "you have been registered successfully, please check your email"
      );
    },
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
    },
  });

  const onSubmit = (data: RegisterValidator) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <p className="pb-2 text-xl font-medium">Sign Up</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  isRequired
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              );
            }}
          />

          <Button
            isLoading={registerMutation.isPending}
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
          Already have an account?&nbsp;
          <Link href="/auth/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
