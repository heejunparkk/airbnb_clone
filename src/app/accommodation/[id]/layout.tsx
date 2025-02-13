export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b"></div>
      <div className="pt-16">{children}</div>
    </>
  );
}
