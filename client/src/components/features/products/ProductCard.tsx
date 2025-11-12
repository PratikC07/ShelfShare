import { type ProductSummary } from "@/features/products/types";
import { Button } from "@/components/ui/Button";
import { MotionDiv } from "@/components/ui/motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ProductCardProps {
  product: ProductSummary;
  onViewDetails: () => void; // <-- Add onClick prop
}

/**
 * Formats a number as USD currency.
 */
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <MotionDiv
      className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 dark:bg-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative w-full aspect-video">
        <ImageWithFallback
          src={product.imageUrl}
          alt={`Cover image for ${product.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <div className="flex-grow">
          <h3 className="text-lg font-bold leading-normal text-slate-900 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-1 text-base font-normal text-slate-600 dark:text-slate-400">
            {formatCurrency(product.price)}
          </p>
        </div>
        {/* --- UPDATE: Change from <Link> to onClick --- */}
        <Button
          variant="secondary"
          className="mt-4 w-full"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </MotionDiv>
  );
}
