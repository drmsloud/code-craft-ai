/**
 * Local file-based order management for testing
 * In production, this would use DynamoDB
 */
import fs from 'fs'
import path from 'path'

export interface Order {
  orderId: string
  email: string
  templateId: string
  templateName: string
  amount: number
  downloadUrl?: string
  status: 'completed' | 'pending' | 'failed'
  createdAt: string
  expiresAt?: string
}

const ORDERS_FILE = path.join(process.cwd(), 'lib', 'orders.json')

function ensureOrdersFile() {
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(
      ORDERS_FILE,
      JSON.stringify(
        {
          orders: [],
          lastUpdated: new Date().toISOString(),
        },
        null,
        2
      )
    )
  }
}

function readOrders(): Order[] {
  ensureOrdersFile()
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8')
    const parsed = JSON.parse(data)
    return parsed.orders || []
  } catch (error) {
    console.error('Error reading orders:', error)
    return []
  }
}

function writeOrders(orders: Order[]) {
  ensureOrdersFile()
  try {
    fs.writeFileSync(
      ORDERS_FILE,
      JSON.stringify(
        {
          orders,
          lastUpdated: new Date().toISOString(),
        },
        null,
        2
      )
    )
  } catch (error) {
    console.error('Error writing orders:', error)
  }
}

export async function createOrder(order: Order): Promise<void> {
  const orders = readOrders()
  orders.push(order)
  writeOrders(orders)
  console.log(`Order created locally: ${order.orderId}`)
}

export async function getAllOrders(): Promise<Order[]> {
  return readOrders()
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const orders = readOrders()
  return orders.filter(o => o.email === email)
}

export async function updateOrderWithDownloadUrl(
  orderId: string,
  downloadUrl: string,
  expiresAt: string
): Promise<void> {
  const orders = readOrders()
  const order = orders.find(o => o.orderId === orderId)

  if (order) {
    order.downloadUrl = downloadUrl
    order.expiresAt = expiresAt
    order.status = 'completed'
    writeOrders(orders)
    console.log(`Order updated locally: ${orderId}`)
  }
}

export async function getDashboardStats() {
  const orders = readOrders()

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return {
    totalRevenue,
    ordersCount: totalOrders,
    avgOrderValue,
    orders: orders.slice(0, 10).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  }
}
