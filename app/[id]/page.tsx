export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <div className="mx-auto container"></div>;
}
