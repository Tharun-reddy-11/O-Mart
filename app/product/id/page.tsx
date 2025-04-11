import { products } from '@/data/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/providers/cart-provider';
import { Star } from 'lucide-react';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = Object.values(products)
    .flat()
    .find(p => p.id === params.id);
  
  const { addToCart } = useCart();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96 bg-gray-100 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="text-2xl font-bold text-primary">₹{product.price}</div>
          
          <div className="flex items-center gap-2">
            <span className="text-lg">{product.rating}/5</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => addToCart(product)}
              className="bg-primary hover:bg-primary-dark px-8 py-4 text-lg hover:scale-105 transition-all"
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg border-2 hover:border-primary transition-all"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}