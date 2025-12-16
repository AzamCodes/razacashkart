import products from "@/data/products.json";

export const priceLinks = [
    { label: "Under ₹10,000", slug: "under-10000", max: 10000 },
    { label: "Under ₹15,000", slug: "under-15000", max: 15000 },
    { label: "Under ₹20,000", slug: "under-20000", max: 20000 },
    { label: "Under ₹25,000", slug: "under-25000", max: 25000 },
    { label: "Under ₹50,000", slug: "under-50000", max: 50000 },
    { label: "Under ₹75,000", slug: "under-75000", max: 75000 },
    { label: "Under ₹1,00,000", slug: "under-100000", max: 100000 },


];

export const brandLinks = Array.from(
    new Set(products.map(p => p.brand))
).map(brand => ({
    label: brand,
    slug: brand.toLowerCase(),
}));

export const policyLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Return & Refund Policy", href: "/return-policy" },
];
