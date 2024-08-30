"use client";

import { SchemaSearch } from "@/src/schema";

import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm(): JSX.Element {
  const handleSearchForm = (formData: FormData): void => {
    const data = {
      search: formData.get("search"),
    };

    const result = SchemaSearch.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((e): void => {
        toast.error(e.message);
      });

      return;
    }

    redirect(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form action={handleSearchForm} className="flex items-center">
      <input
        type="text"
        placeholder="Buscar producto"
        className="p-2 placeholder-gray-400 w-full"
        name="search"
        autoComplete="off"
      />

      <input
        type="submit"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        value={"Buscar"}
      />
    </form>
  );
}
