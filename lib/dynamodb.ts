import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client)

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

/**
 * Create a new order in DynamoDB
 */
export async function createOrder(order: Order): Promise<void> {
  try {
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE || 'CodeCraftOrders',
      Item: {
        ...order,
        createdAt: new Date().toISOString(),
      },
    })

    await docClient.send(command)
    console.log(`Order created: ${order.orderId}`)
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

/**
 * Get all orders (for admin dashboard)
 */
export async function getAllOrders(): Promise<Order[]> {
  try {
    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE || 'CodeCraftOrders',
      Limit: 50,
    })

    const result = await docClient.send(command)
    return (result.Items as Order[]) || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

/**
 * Get orders by email
 */
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE || 'CodeCraftOrders',
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    })

    const result = await docClient.send(command)
    return (result.Items as Order[]) || []
  } catch (error) {
    console.error('Error fetching orders by email:', error)
    return []
  }
}

/**
 * Update order with download URL after file is generated
 */
export async function updateOrderWithDownloadUrl(
  orderId: string,
  downloadUrl: string,
  expiresAt: string
): Promise<void> {
  try {
    const command = new UpdateCommand({
      TableName: process.env.DYNAMODB_TABLE || 'CodeCraftOrders',
      Key: { orderId },
      UpdateExpression: 'SET downloadUrl = :url, expiresAt = :expires, #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':url': downloadUrl,
        ':expires': expiresAt,
        ':status': 'completed',
      },
    })

    await docClient.send(command)
    console.log(`Order updated with download URL: ${orderId}`)
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

/**
 * Get dashboard stats
 */
export async function getDashboardStats() {
  try {
    const orders = await getAllOrders()

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
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    return {
      totalRevenue: 0,
      ordersCount: 0,
      avgOrderValue: 0,
      orders: [],
    }
  }
}
