import { products } from '@/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/app/providers/cart-provider';
import { Star } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Normalize category name
  const categorySlug = params.category.toLowerCase().replace(/ /g, '-');
  const categoryProducts = products[categorySlug as keyof typeof products];

  if (!categoryProducts) {
    notFound();
  }

  const { addToCart } = useCart();

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">{params.category}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-t-lg"
                priority={false}
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300 fill-transparent'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-xl font-bold text-primary mb-4">₹{product.price}</p>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full hover:scale-105 transition-transform"
                >
                  Add to Cart
                </Button>
                <Link href={`/product/${product.id}`} className="w-full">
                  <Button variant="outline" className="w-full hover:bg-gray-100">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}