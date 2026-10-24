export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  image: string;
  role: "admin" | "moderator" | "user";
  address?: { city: string };
  company?: { name: string };
}

export type AuthUser = User & { token: string };
