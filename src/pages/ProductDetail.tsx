import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Import product images
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

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
}

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
    description: "Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation and crystal-clear audio reproduction.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Quick charge technology",
      "Premium leather headband",
      "Hi-Res Audio certified"
    ],
    specifications: {
      "Driver": "40mm Dynamic",
      "Frequency Response": "4Hz - 40kHz",
      "Battery": "40 hours",
      "Connectivity": "Bluetooth 5.2, USB-C",
      "Weight": "250g"
    }
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
    description: "Track your fitness goals with our advanced smartwatch. Features GPS, heart rate monitoring, and 7-day battery life.",
    features: [
      "GPS tracking",
      "Heart rate monitor",
      "7-day battery life",
      "Water resistant (5ATM)",
      "50+ workout modes"
    ],
    specifications: {
      "Display": "1.4\" AMOLED",
      "Battery": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "GPS, Heart Rate, Accelerometer",
      "Compatibility": "iOS & Android"
    }
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
    description: "Powerful laptop for professionals with M2 Pro chip, stunning Liquid Retina XDR display, and all-day battery life.",
    features: [
      "M2 Pro chip",
      "14.2-inch Liquid Retina XDR display",
      "16GB unified memory",
      "512GB SSD storage",
      "17-hour battery life"
    ],
    specifications: {
      "Processor": "Apple M2 Pro",
      "Memory": "16GB Unified",
      "Storage": "512GB SSD",
      "Display": "14.2\" Liquid Retina XDR",
      "Ports": "3x Thunderbolt 4, HDMI, MagSafe"
    }
  },
  {
    id: "4",
    name: "iPhone 15 Pro",
    price: 82900,
    image: productPhone,
    rating: 4.7,
    reviews: 892,
    category: "Phones",
    description: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
    features: [
      "A17 Pro chip",
      "Titanium design",
      "Pro camera system",
      "Action Button",
      "USB-C connectivity"
    ],
    specifications: {
      "Processor": "A17 Pro",
      "Storage": "128GB",
      "Display": "6.1\" Super Retina XDR",
      "Camera": "48MP Main, 12MP Ultra Wide",
      "Battery": "Up to 23 hours video"
    }
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
    description: "Premium running shoes with Air Max cushioning technology for ultimate comfort and performance.",
    features: [
      "Air Max cushioning",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Lightweight design",
      "Enhanced heel support"
    ],
    specifications: {
      "Material": "Mesh and synthetic",
      "Sole": "Rubber with Air Max technology",
      "Weight": "280g (Size 9)",
      "Cushioning": "Air Max units",
      "Support": "Heel and arch support"
    }
  },
  {
    id: "6",
    name: "Oxford Leather Dress Shoes",
    price: 15999,
    image: productShoesFormal,
    rating: 4.8,
    reviews: 234,
    category: "Shoes",
    description: "Handcrafted Oxford dress shoes made from premium leather for formal occasions and business wear.",
    features: [
      "Genuine leather construction",
      "Handcrafted design",
      "Cushioned insole",
      "Leather lining",
      "Classic Oxford style"
    ],
    specifications: {
      "Material": "Premium leather",
      "Sole": "Leather with rubber heel",
      "Construction": "Goodyear welted",
      "Lining": "Leather",
      "Style": "Oxford lace-up"
    }
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
    description: "Versatile white sneakers perfect for casual wear with comfort-focused design and durable construction.",
    features: [
      "All-white design",
      "Comfortable padded collar",
      "Flexible sole",
      "Easy-clean material",
      "Classic silhouette"
    ],
    specifications: {
      "Material": "Synthetic leather",
      "Sole": "Rubber",
      "Weight": "300g (Size 9)",
      "Color": "White",
      "Style": "Low-top sneaker"
    }
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
    description: "High-quality denim jeans with perfect fit and premium construction for everyday comfort and style.",
    features: [
      "100% cotton denim",
      "Slim fit design",
      "Reinforced stitching",
      "Classic 5-pocket style",
      "Pre-washed finish"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Slim",
      "Weight": "14oz denim",
      "Wash": "Dark indigo",
      "Style": "5-pocket jeans"
    }
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
    description: "Essential cotton t-shirt with soft fabric and classic fit. Perfect for layering or wearing on its own.",
    features: [
      "100% cotton fabric",
      "Classic crew neck",
      "Soft hand feel",
      "Pre-shrunk",
      "Tagless design"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Weight": "180gsm",
      "Fit": "Regular",
      "Neckline": "Crew neck",
      "Care": "Machine washable"
    }
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
    description: "Premium leather biker jacket with classic design and superior craftsmanship. A timeless piece for any wardrobe.",
    features: [
      "Genuine leather",
      "Asymmetrical zip",
      "Multiple pockets",
      "Quilted shoulders",
      "Classic biker styling"
    ],
    specifications: {
      "Material": "Genuine leather",
      "Lining": "Polyester",
      "Closure": "Asymmetrical zip",
      "Pockets": "4 exterior, 2 interior",
      "Style": "Biker jacket"
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-8">
          <div className="container">
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/products')}>
                Browse All Products
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to checkout...",
      description: "Taking you to the payment page.",
    });
    // In a real app, this would redirect to checkout
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? "Product removed from your wishlist." : "Product added to your wishlist.",
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-8">
        <div className="container">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4 animate-fade-in">
              <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted/20 to-muted/40 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    New
                  </Badge>
                )}
                {product.isSale && discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mb-8">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 hover-scale"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    variant="secondary"
                    className="flex-1 hover-scale"
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="hover-scale"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <Card className="animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="animate-scale-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{key}</span>
                          <span className="text-sm text-muted-foreground">{value}</span>
                        </div>
                        {index < Object.entries(product.specifications).length - 1 && (
                          <Separator className="mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;