import { NextResponse } from 'next/server'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3002/api/v1/product'

export async function GET() {
    try {
        const response = await axios.get(`${API_BASE_URL}/get`)
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}