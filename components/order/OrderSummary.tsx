"use client";

import { useStore } from "@/src/store";
import { useMemo } from "react";
import { toast } from "react-toastify";

import ProductDetails from "./ProductDetails";

import { formatCurrency } from "@/src/utils";

import { createOrder } from "@/actions/create-order-action";

import { OrderItem } from "@/src/types";

import { OrderSchema } from "@/src/schema";

export default function OrderSummary(): JSX.Element {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearStore);
  const total = useMemo(
    (): number => order.reduce((total, e): number => total + e.quantity * e.price, 0),
    [order]
  );

  const handleCreateAction = async (formData: FormData): Promise<void> => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue): void => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await createOrder(data);

    if (response?.errors) {
      response.errors.forEach((issue: any): void => {
        toast.error(issue.message);
      });

      return;
    }

    toast.success('Pedido realizado correctamente');
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item: OrderItem): JSX.Element => (
            <ProductDetails key={item.id} product={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form className="w-full mt-10 space-y-5" action={handleCreateAction}>
            <input
              type="text"
              placeholder="Tu nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
              autoComplete='off'
            />
            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirmar pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
