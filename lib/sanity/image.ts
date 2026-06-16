import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient } from "@/lib/sanity/client";

const builder = imageUrlBuilder(getSanityClient());

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
