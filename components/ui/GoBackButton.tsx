"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton(): JSX.Element {
  const router = useRouter();

  return (
    <button
      className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
      onClick={(): void => router.back()}
    >
      Volver
    </button>
  );
}
