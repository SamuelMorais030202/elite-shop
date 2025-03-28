import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Success(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const sessionId = searchParams.session_id

  if (!sessionId || Array.isArray(sessionId)) {
    return redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image 
          src={product.images[0]}
          alt={`Imagem de ${product.name}`}
          width={120}
          height={110}
        />
      </ImageContainer>

      <p>
        Uhuu <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}

export const metadata: Metadata = {
  title: 'Compra efetuada | Elite Shop',
};