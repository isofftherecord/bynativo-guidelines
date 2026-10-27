export const metadata = {
  title: "byNativo Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh", margin: 0, overscrollBehavior: "none" }}>
      {children}
    </div>
  );
}
