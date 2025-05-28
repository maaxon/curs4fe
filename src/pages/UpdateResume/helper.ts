export function getImage(image: string | File): string {
  if (typeof image === 'string') {
    return image;
  } else if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  throw new Error('Invalid input type: expected string or File');
}
