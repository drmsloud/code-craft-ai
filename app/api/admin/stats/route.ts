import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/orders-local'

export async function GET(request: NextRequest) {
  try {
    const stats = await getDashboardStats()

    // Format orders for display
    const formattedOrders = (stats.orders || []).map((order) => ({
      id: order.orderId,
      templateName: order.templateName,
      email: order.email,
      amount: order.amount,
      date: new Date(order.createdAt).toISOString().split('T')[0],
    }))

    return NextResponse.json({
      totalSales: stats.ordersCount,
      totalRevenue: stats.totalRevenue,
      ordersCount: stats.ordersCount,
      avgOrderValue: stats.avgOrderValue,
      lastOrder: formattedOrders[0] || null,
      orders: formattedOrders,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
