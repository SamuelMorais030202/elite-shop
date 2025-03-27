"use client"

import axios from "axios"
import { useState } from "react"

interface IBuyButton {
  priceId: string
}

export function BuyButton({ priceId }: IBuyButton) {
  const [isCreantingCheckoutSession, setIsCreantingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreantingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: priceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {

      setIsCreantingCheckoutSession(false)
      console.log(error)
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <button onClick={handleBuyProduct} disabled={isCreantingCheckoutSession}>
      Comprar agora
    </button>
  )
}