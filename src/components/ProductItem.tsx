import Link from "next/link";

type ProductItemProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductItem({
  id,
  title,
  description,
  price,
  category,
  image,
}: ProductItemProps) {
  return (
    <Link href={`/products/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image}
          className="hover:scale-110 transition ease-in-out"
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{title}</p>
      <p className="text-sm font-medium">
        ${price}
      </p>
    </Link>
  );
}
