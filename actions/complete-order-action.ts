"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";

export async function completeOrder(formData: FormData): Promise<any> {
  const id = +formData.get("order_id")!;

  try {
    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });

    revalidatePath('/admin/orders');
  } catch (error) {
    console.log(error);
  }
}
