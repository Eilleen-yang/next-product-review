import Link from "next/link";
import { useCart } from "../context/cartContext";

export default function Header() {
  const { cart } = useCart();
  return (
    <header className="p-4 bg-blue-600 text-white">
      <nav className="flex justify-between max-w-4xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          My Shop
        </Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/products">Product</Link>
          <Link href="/cart">Cart({cart?.length})</Link>
        </div>
      </nav>
    </header>
  );
}
