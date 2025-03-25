import { stripe } from "@/lib/stripe";
import { IProduct } from "@/types/product";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products: IProduct[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100)
    }
  })

  return NextResponse.json({ products })
}