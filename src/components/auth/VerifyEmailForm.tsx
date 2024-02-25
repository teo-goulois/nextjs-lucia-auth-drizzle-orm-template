"use client";
import { verifyEmail } from "@/lib/api/auth/verify-email";
import { PinInput } from "@ark-ui/react";
import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const VerifyEmailForm = () => {
  const verificationMutation = useMutation({
    mutationFn: async (code: string) => {
      console.log({ code }, "mutation");
      const data = await verifyEmail({ code });
      if (data && data.serverError) {
        throw new Error(data.serverError);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Email verified successfully");
    },
  });
  const handleValueComplete = async (value: string) => {
    const token = value;
    verificationMutation.mutate(token);
  };

  return (
    <div>
      <PinInput.Root
        className="space-y-3"
        otp
        type="numeric"
        disabled={verificationMutation.isPending}
        blurOnComplete
        onValueComplete={(e) => handleValueComplete(e.valueAsString)}>
        <PinInput.Label>
          Please enter the verification code sent to your email
        </PinInput.Label>
        <PinInput.Control className="flex items-center gap-1.5">
          {Array.from(Array(8)).map((id, index) => (
            <PinInput.Input
              key={index}
              index={index}
              className="aspect-square h-11 w-11 text-center">
              {/* <Input
                className=" min-h-0"
                classNames={{
                  inputWrapper: "h-11",
                  input: "justify-center text-center ",
                }}
              /> */}
            </PinInput.Input>
          ))}
        </PinInput.Control>
      </PinInput.Root>
    </div>
  );
};
