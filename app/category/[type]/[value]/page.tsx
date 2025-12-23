// // app/category/[type]/[value]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { ChevronRight } from "lucide-react";
// import ProductCard from "@/components/ui/ProductCard";

// // Mock data - replace with your actual data fetching
// const categoryTitles: Record<string, Record<string, string>> = {
//   price: {
//     u10: "Under ₹10,000",
//     u15: "Under ₹15,000",
//     u20: "Under ₹20,000",
//     u25: "Under ₹25,000",
//     u50: "Under ₹50,000",
//     u75: "Under ₹75,000",
//     u100: "Under ₹100,000",
//     o100: "Over ₹100,000",
//   },
//   brand: {
//     hp: "HP",
//     dell: "Dell",
//     lenovo: "Lenovo",
//     acer: "Acer",
//     asus: "Asus",
//     apple: "Apple",
//   },
//   processor: {
//     i3: "Intel i3 Generation",
//     i5: "Intel i5 Generation",
//     i7: "Intel i7 Generation",
//     m1: "Apple M1",
//     m2: "Apple M2",
//   },
// };

// interface Product {
//   id: string;
//   name: string;
//   slug: string;
//   price: number;
//   originalPrice?: number;
//   discount?: number;
//   images: Array<{ url: string; alt: string }>;
// }

// export default function CategoryPage({
//   params,
// }: {
//   params: { type: string; value: string };
// }) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const categoryTitle = categoryTitles[params.type]?.[params.value] || "Products";
//   const categoryType = params.type === "price" ? "Shop By Price" : 
//                        params.type === "brand" ? "Shop By Brands" : 
//                        "Shop By Processor";

//   useEffect(() => {
//     // Replace with your actual API call
//     const fetchProducts = async () => {
//       setLoading(true);
//       // const response = await fetch(`/api/products?type=${params.type}&value=${params.value}`);
//       // const data = await response.json();

//       // Mock data for demonstration
//       const mockProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
//         id: `product-${i + 1}`,
//         name: `HP 15s Laptop, 12th Gen Intel Core i3-1215U, 15.6-inch (39.6 cm), FHD, 8GB DDR4, 512GB SSD`,
//         slug: `laptop-${i + 1}`,
//         price: 14990 + (i * 1000),
//         originalPrice: 19990 + (i * 1000),
//         discount: 25,
//         images: [
//           { url: "/placeholder-laptop-1.jpg", alt: "Laptop front view" },
//           { url: "/placeholder-laptop-2.jpg", alt: "Laptop side view" },
//         ],
//       }));

//       setProducts(mockProducts);
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [params.type, params.value]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading products...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Breadcrumb */}
//       <div className="border-b border-gray-200 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <a href="/" className="hover:text-blue-600 transition-colors">
//               Home
//             </a>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-gray-400">{categoryType}</span>
//             <ChevronRight className="h-4 w-4" />
//             <span className="text-blue-600 font-medium">{categoryTitle}</span>
//           </div>
//         </div>
//       </div>

//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
//             {categoryTitle}
//           </h1>
//           <p className="text-blue-100 text-sm sm:text-base">
//             {products.length} products available
//           </p>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {products.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-600 text-lg">No products found in this category</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 {...product}
//                 cardHeight="aspect-[3/4]"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Bottom Spacing */}
//       <div className="h-12" />
//     </div>
//   );
// }




// app/category/[type]/[value]/page.tsx
"use client";

import { use, useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import CategoryFilter, { FilterState } from "@/components/CategoryFilter";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductsData from '@/data/products.json';

const categoryTitles: Record<string, Record<string, string>> = {
  price: {
    "under-10000": "Under ₹10,000",
    "under-15000": "Under ₹15,000",
    "under-20000": "Under ₹20,000",
    "under-25000": "Under ₹25,000",
    "under-50000": "Under ₹50,000",
    "under-75000": "Under ₹75,000",
    "under-100000": "Under ₹100,000",
    "over-100000": "Over ₹100,000",
  },
  brand: {
    hp: "HP",
    dell: "Dell",
    lenovo: "Lenovo",
    acer: "Acer",
    asus: "Asus",
    apple: "Apple",
  },
  processor: {
    "intel-i3": "Intel i3 Generation",
    "intel-i5": "Intel i5 Generation",
    "intel-i7": "Intel i7 Generation",
    "apple-m1": "Apple M1",
    "apple-m2": "Apple M2",
  },
};

interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: Array<{ url: string; alt: string; duplicate?: boolean }>;
  specifications?: {
    Processor?: string;
    [key: string]: string | undefined;
  };
  inStock?: boolean;
  topSelling?: boolean;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ type: string; value: string }>;
}) {
  // Unwrap the promise using React.use()
  const resolvedParams = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 100000,
    brands: [],
    processors: [],
    ram: [],
    storage: [],
    screenSize: [],
    inStock: false,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowScrollTop(currentScrollY > 200);
      
      // Hide/show mobile filters based on scroll direction
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setShowMobileFilters(false); // Hide on scroll down
        } else {
          setShowMobileFilters(true); // Show on scroll up
        }
      } else {
        setShowMobileFilters(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryTitle = categoryTitles[resolvedParams.type]?.[resolvedParams.value] || "Products";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    // Start with all products if brand filter is applied and we're on a brand category page
    let baseProducts = products;
    if (resolvedParams.type === 'brand' && filters.brands.length > 0) {
      baseProducts = allProducts;
    }
    
    const filtered = baseProducts.filter((product) => {
      // Price Check
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;

      // Brand Check
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;

      // In Stock Check
      if (filters.inStock && !product.inStock) return false;

      // Processor filter
      if (
        filters.processors.length > 0 &&
        (!product.specifications?.Processor || !filters.processors.includes(product.specifications.Processor))
      )
        return false;

      if (
        filters.ram.length > 0 &&
        (!product.specifications?.RAM || !filters.ram.includes(product.specifications.RAM))
      )
        return false;

      if (
        filters.storage.length > 0 &&
        (!product.specifications?.Storage || !filters.storage.includes(product.specifications.Storage))
      )
        return false;

      if (
        filters.screenSize.length > 0 &&
        (!product.specifications?.Display || !filters.screenSize.includes(product.specifications.Display))
      )
        return false;

      return true;
    });

    // Apply sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [products, allProducts, filters, sortBy, resolvedParams.type]);

  // Calculate price limits dynamically from all products
  const allPrices = allProducts.map((p) => p.price);
  const minPriceLimit = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPriceLimit = allPrices.length > 0 ? Math.max(...allPrices) : 100000;

  // Update filter limits when all products change
  useEffect(() => {
    if (allProducts.length > 0) {
      setFilters(prev => ({
        ...prev,
        minPrice: minPriceLimit,
        maxPrice: maxPriceLimit
      }));
    }
  }, [allProducts, minPriceLimit, maxPriceLimit]);

  useEffect(() => {
    const filterProducts = () => {
      setLoading(true);

      try {
        const allProductsData = ProductsData as Product[];
        setAllProducts(allProductsData);
        let filtered: Product[] = [];

        if (resolvedParams.type === 'price') {
          filtered = allProductsData.filter(product => {
            switch (resolvedParams.value) {
              case 'under-10000': return product.price < 10000;
              case 'under-15000': return product.price < 15000;
              case 'under-20000': return product.price < 20000;
              case 'under-25000': return product.price < 25000;
              case 'under-50000': return product.price < 50000;
              case 'under-75000': return product.price < 75000;
              case 'under-100000': return product.price < 100000;
              case 'over-100000': return product.price >= 100000;
              default: return false;
            }
          });
        } else if (resolvedParams.type === 'brand') {
          filtered = allProductsData.filter(product =>
            product.brand.toLowerCase() === resolvedParams.value.toLowerCase()
          );
        } else if (resolvedParams.type === 'processor') {
          filtered = allProductsData.filter(product => {
            const processor = product.specifications?.Processor?.toLowerCase() || '';
            switch (resolvedParams.value) {
              case 'intel-i3': return processor.includes('i3');
              case 'intel-i5': return processor.includes('i5');
              case 'intel-i7': return processor.includes('i7');
              case 'apple-m1': return processor.includes('m1');
              case 'apple-m2': return processor.includes('m2');
              default: return false;
            }
          });
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    filterProducts();
  }, [resolvedParams.type, resolvedParams.value]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Category Header */}
        <div className="mb-0 sm:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {categoryTitle}
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <CategoryFilter
                products={allProducts}
                filters={filters}
                setFilters={setFilters}
                minPriceLimit={minPriceLimit}
                maxPriceLimit={maxPriceLimit}
              />
            </div>
          </aside>

          {/* Mobile Filter & Sort Bar */}
          <div className={`lg:hidden flex gap-2 mb-4 sticky top-[50px] z-30 bg-gray-50/95 backdrop-blur py-2 transition-transform duration-300 ${
            showMobileFilters ? 'translate-y-[30px]' : '-translate-y-full'
          }`}>
            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1 gap-2 border-gray-300">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle><ShoppingCart className='h-8 w-8 text-blue-600' /></SheetTitle>
                </SheetHeader>
                <div className="mt-4 pb-10">
                  <CategoryFilter
                    products={allProducts}
                    filters={filters}
                    setFilters={setFilters}
                    minPriceLimit={minPriceLimit}
                    maxPriceLimit={maxPriceLimit}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 gap-2 border-gray-300">
                  <ArrowUpDown className="w-4 h-4" /> Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort Bar */}
            <div className="hidden lg:flex justify-end mb-4 items-center">
              <span className="text-sm text-gray-500 mr-2">Sort By:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-semibold text-gray-800">
                    {sortBy === "featured" && "Featured"}
                    {sortBy === "newest" && "Newest First"}
                    {sortBy === "price-asc" && "Price: Low to High"}
                    {sortBy === "price-desc" && "Price: High to Low"}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Price: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 relative sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    images={product.images}
                    className="bg-white hover:shadow-xl transition-shadow duration-300"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg border border-dashed">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2 max-w-sm">We couldn&apos;t find any products matching your selected filters.</p>
                <Button
                  variant="link"
                  onClick={() => setFilters({
                    minPrice: minPriceLimit,
                    maxPrice: maxPriceLimit,
                    brands: [],
                    processors: [],
                    ram: [],
                    storage: [],
                    screenSize: [],
                    inStock: false
                  })}
                  className="mt-4 text-blue-600"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}