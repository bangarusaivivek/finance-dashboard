"use client"

import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

interface WebSocketMessage {
  type: "STOCK_UPDATE" | "MARKET_STATUS" | "NEWS"
  data: any
}

export const useWebSocket = (url?: string) => {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const ws = useRef<WebSocket | null>(null)
  const queryClient = useQueryClient()
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  useEffect(() => {
    // Don't attempt connection if no URL provided or in development without WebSocket server
    if (!url || url.includes("localhost:8080")) {
      console.log("WebSocket: No URL provided or development mode detected, skipping connection")
      return
    }

    const connectWebSocket = () => {
      try {
        console.log(`WebSocket: Attempting to connect to ${url}`)
        ws.current = new WebSocket(url)

        ws.current.onopen = () => {
          setIsConnected(true)
          setConnectionError(null)
          reconnectAttempts.current = 0
          console.log("WebSocket: Connected successfully")
        }

        ws.current.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data)
            setLastMessage(message)

            // Handle real-time updates
            if (message.type === "STOCK_UPDATE") {
              queryClient.invalidateQueries({ queryKey: ["stocks"] })
            }
          } catch (error) {
            console.error("WebSocket: Error parsing message:", error)
          }
        }

        ws.current.onclose = (event) => {
          setIsConnected(false)
          console.log(`WebSocket: Connection closed (Code: ${event.code}, Reason: ${event.reason})`)

          // Only attempt reconnection if it wasn't a manual close and we haven't exceeded max attempts
          if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000) // Exponential backoff, max 30s
            console.log(
              `WebSocket: Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`,
            )

            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttempts.current++
              connectWebSocket()
            }, delay)
          } else if (reconnectAttempts.current >= maxReconnectAttempts) {
            setConnectionError("Failed to connect after multiple attempts")
            console.log("WebSocket: Max reconnection attempts reached")
          }
        }

        ws.current.onerror = (error) => {
          console.log("WebSocket: Connection error occurred")
          setConnectionError("Connection failed")
          setIsConnected(false)
        }
      } catch (error) {
        console.error("WebSocket: Failed to create connection:", error)
        setConnectionError("Failed to create connection")
      }
    }

    connectWebSocket()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (ws.current) {
        ws.current.close(1000, "Component unmounting")
      }
    }
  }, [url, queryClient])

  const sendMessage = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message))
      return true
    }
    console.warn("WebSocket: Cannot send message, connection not open")
    return false
  }

  const reconnect = () => {
    if (ws.current) {
      ws.current.close()
    }
    reconnectAttempts.current = 0
    setConnectionError(null)
  }

  return {
    isConnected,
    lastMessage,
    sendMessage,
    connectionError,
    reconnect,
  }
}
