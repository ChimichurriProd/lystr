/**
 * Studio bypasses the site chrome (header/footer/fonts) so it gets its
 * own slim layout. Sanity Studio ships its own styling.
 */

export const metadata = {
  title: "Lystr Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
