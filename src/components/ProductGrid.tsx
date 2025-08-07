import { useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Grid, List } from "lucide-react";

// Sample product data
import productHeadphones from "@/assets/product-headphones.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productLaptop from "@/assets/product-laptop.jpg";
import productPhone from "@/assets/product-phone.jpg";
import productShoesRunning from "@/assets/product-shoes-running.jpg";
import productShoesFormal from "@/assets/product-shoes-formal.jpg";
import productShoesCasual from "@/assets/product-shoes-casual.jpg";
import productClothingJeans from "@/assets/product-clothing-jeans.jpg";
import productClothingTshirt from "@/assets/product-clothing-tshirt.jpg";
import productClothingJacket from "@/assets/product-clothing-jacket.jpg";

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 16500,
    originalPrice: 20700,
    image: productHeadphones,
    rating: 4.8,
    reviews: 326,
    category: "Audio",
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 24800,
    image: productWatch,
    rating: 4.6,
    reviews: 189,
    category: "Wearables",
    isNew: true,
  },
  {
    id: "3",
    name: "MacBook Pro 14-inch",
    price: 132700,
    originalPrice: 149300,
    image: productLaptop,
    rating: 4.9,
    reviews: 542,
    category: "Computers",
    isSale: true,
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    price: 82900,
    image: productPhone,
    rating: 4.7,
    reviews: 892,
    category: "Phones",
  },
  {
    id: "5",
    name: "Nike Air Max Running Shoes",
    price: 8999,
    originalPrice: 12499,
    image: productShoesRunning,
    rating: 4.7,
    reviews: 445,
    category: "Shoes",
    isNew: true,
    isSale: true,
  },
  {
    id: "6",
    name: "Oxford Leather Dress Shoes",
    price: 15999,
    image: productShoesFormal,
    rating: 4.8,
    reviews: 234,
    category: "Shoes",
  },
  {
    id: "7",
    name: "Classic White Sneakers",
    price: 6999,
    originalPrice: 8999,
    image: productShoesCasual,
    rating: 4.6,
    reviews: 678,
    category: "Shoes",
    isSale: true,
  },
  {
    id: "8",
    name: "Premium Denim Jeans",
    price: 4999,
    image: productClothingJeans,
    rating: 4.5,
    reviews: 523,
    category: "Clothing",
    isNew: true,
  },
  {
    id: "9",
    name: "Cotton Basic T-Shirt",
    price: 1999,
    originalPrice: 2999,
    image: productClothingTshirt,
    rating: 4.4,
    reviews: 892,
    category: "Clothing",
    isSale: true,
  },
  {
    id: "10",
    name: "Leather Biker Jacket",
    price: 24999,
    image: productClothingJacket,
    rating: 4.9,
    reviews: 156,
    category: "Clothing",
    isNew: true,
  },
  {
    id: "11",
    name: "Premium Wireless Headphones",
    price: 16500,
    originalPrice: 20700,
    image: productHeadphones,
    rating: 4.8,
    reviews: 326,
    category: "Audio",
    isSale: true,
  },
  {
    id: "12",
    name: "Smart Fitness Watch",
    price: 24800,
    image: productWatch,
    rating: 4.6,
    reviews: 189,
    category: "Wearables",
  },
];

interface ProductGridProps {
  title?: string;
  showTabs?: boolean;
  limit?: number;
}

const ProductGrid = ({ title = "Featured Products", showTabs = true, limit }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const displayProducts = limit ? sampleProducts.slice(0, limit) : sampleProducts;
  const categories = ["All", ...Array.from(new Set(sampleProducts.map(p => p.category)))];

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    // Here you would typically show a toast notification
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getFilteredProducts = (category: string) => {
    return category === "All" 
      ? displayProducts 
      : displayProducts.filter(p => p.category === category);
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of premium products
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showTabs ? (
          <Tabs defaultValue="All" className="space-y-8">
            <TabsList className="grid w-full grid-cols-7 animate-scale-in">
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProducts(category).map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in hover-scale"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                        isInWishlist={wishlist.includes(product.id)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in hover-scale"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isInWishlist={wishlist.includes(product.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;