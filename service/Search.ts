import type { NextApiRequest, NextApiResponse } from "next";
import { API_MARKETING } from "./constants";

type Product = {
  title: string;
  name: string;
  basePrice: number;
  description: string;
  type: string;
  address: string;
  totalArea: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    searchTerm,
    title,
    name,
    basePrice,
    description,
    type,
    address,
    totalArea,
  } = req.query;

  // External API endpoint to fetch products
  const apiEndpoint =
    `${API_MARKETING}/post/searching`;

  try {
    // Fetch products from the external API
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products: Product[] = await response.json();

    // Convert price to a range
    const priceRange = (basePrice: string) => {
      switch (basePrice) {
        case "< 3 triệu":
          return [0, 3000000];
        case "3-5 triệu":
          return [3000000, 5000000];
        case "5-10 triệu":
          return [5000000, 10000000];
        case "> 10 triệu":
          return [10000000, Infinity];
        default:
          return [0, Infinity];
      }
    };

    // Filter products based on the search criteria
    const filteredProducts = products.filter((product) => {
      return (
        (!searchTerm ||
          product.name
            .toLowerCase()
            .includes((searchTerm as string).toLowerCase())) &&
        (!address || product.address === address) &&
        (!name || product.name === name) &&
        (!description || product.description === description) &&
        (!title || product.title === title) &&
        (!type || product.type === type) &&
        (!totalArea || product.totalArea === type) &&
        product.basePrice >= priceRange(basePrice as string)[0] &&
        product.basePrice <= priceRange(basePrice as string)[1]
      );
    });

    // Return the filtered products
    res.status(200).json(filteredProducts);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", message: error.message });
  }
}
