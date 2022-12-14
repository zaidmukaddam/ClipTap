import { useTransition } from "@remix-run/react";
import type { Device } from "~/types";

interface InfoFooterProps {
  myDevice: Device;
}

function InfoFooter({ myDevice }: InfoFooterProps) {
  const transition = useTransition();

  return (
    <div className="mt-auto flex flex-col items-center text-center">
      <img
        src="/logo.svg"
        alt="Cliptap"
        className={`${
          transition.state === "submitting" ? "animate-spin" : ""
        } h-14 w-14 mb-3`}
      />
      <p className="text-gray-200">You are known as {myDevice.name}</p>
    </div>
  );
}

export { InfoFooter };
