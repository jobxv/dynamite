export const getImageUrl = (image: string): string => {
  const url = `http://localhost/etsy${image}`;
  // console.log("image url", url);
  return url;
};
