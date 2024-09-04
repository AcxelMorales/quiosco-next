export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getImagePath(image: string): string | undefined {
  const cloudinaryBaseUrl = "https://res.cloudinary.com";

  if (image.startsWith(cloudinaryBaseUrl)) {
    return image;
  } else {
    return `/products/${image}.jpg`;
  }
}
