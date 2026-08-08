function ProductCard({ product }: any) {
  const soldOut = product.availability === "sold_out";
  const cover = product.images[0] ?? "";
  const hover = product.images[1] ?? cover;

  return (
    <article className="group flex">
      {/* ... */}
    </article>
  );
}