export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto container h-auto min-h-full">{children}</div>;
}
