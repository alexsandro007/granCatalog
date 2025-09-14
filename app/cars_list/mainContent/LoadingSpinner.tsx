'use client';
import { Spinner } from "@heroui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full py-10 md:py-15 sticky top-[35%]">
      <Spinner color="primary" variant="wave" label="Loading..." />
    </div>
  );
}
