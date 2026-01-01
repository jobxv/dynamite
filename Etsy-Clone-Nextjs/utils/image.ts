export const getImageUrl = (image: string): string => {
  if (image.startsWith("http") || image.startsWith("https")) {
    return image;
  }
  return `http://localhost:8000/${image.startsWith("/") ? image.slice(1) : image}`;
};
