import { OrderForm } from '@/components/admin/OrderForm'

export default function NewOrderPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
      <OrderForm />
    </div>
  )
}


