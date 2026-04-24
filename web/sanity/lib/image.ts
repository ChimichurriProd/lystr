import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { dataset, isConfigured, projectId } from "../env";

/**
 * Returns a Sanity image-URL builder. When Sanity is not configured we
 * return a stub whose `.url()` returns an empty string — call sites should
 * then avoid rendering the image.
 */
export function urlFor(source: SanityImageSource) {
  if (!isConfigured) {
    const stub = {
      width: () => stub,
      height: () => stub,
      fit: () => stub,
      url: () => "",
    };
    return stub;
  }
  return imageUrlBuilder({
    projectId: projectId!,
    dataset: dataset!,
  }).image(source);
}
