import Navigation from "@/components/Navigation";
import ProductGrid from "@/components/ProductGrid";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of premium products
            </p>
          </div>
          
          <ProductGrid title="All Products" showTabs={true} />
        </div>
      </main>
    </div>
  );
};

export default Products;