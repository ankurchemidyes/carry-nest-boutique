import productSheet from "@/assets/carry-nest-product-sheet.jpg";

import type { Product } from "@/lib/catalog";

export function CatalogImage({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div className={`catalog-image ${product.imagePosition} ${className}`} aria-label={`${product.name} sample image`}>
      <img src={productSheet} alt="" aria-hidden="true" width={1600} height={1600} />
    </div>
  );
}