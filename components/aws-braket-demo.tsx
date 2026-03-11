'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, Server, Clock, AlertCircle } from 'lucide-react'

interface BraketDevice {
  deviceArn: string
  deviceName: string
  deviceType: string
  deviceStatus: string
  providerName: string
  deviceCapabilities?: {
    service?: {
      executionWindows?: Array<{
        executionDay: string
        windowStartHour: string
        windowEndHour: string
      }>
      shotsRange?: number[]
    }
    action?: {
      supportedOperations?: string[]
    }
  }
}

export function AwsBraketDemo() {
  const [devices, setDevices] = useState<BraketDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState<string>('')

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/aws/braket-devices')
      const data = await response.json()
      setDevices(data.devices || [])
      setSource(data.source || '')
    } catch (error) {
      console.error('Error fetching Braket devices:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return 'bg-green-100 text-green-800'
      case 'OFFLINE':
        return 'bg-red-100 text-red-800'
      case 'RETIRED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'QPU' ? <Cpu className="w-4 h-4" /> : <Server className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">AWS Braket Quantum Devices</h3>
          <p className="text-sm text-muted-foreground">
            Available quantum processing units and simulators for running quantum experiments
          </p>
        </div>
        {source === 'mock' && (
          <Badge variant="secondary">Demo Mode</Badge>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading devices...</p>
        </div>
      ) : devices.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No devices available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <Card key={device.deviceArn} className="p-4 border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(device.deviceType)}
                  <h4 className="font-semibold text-foreground">{device.deviceName}</h4>
                </div>
                <Badge className={getStatusColor(device.deviceStatus)}>
                  {device.deviceStatus}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium">Provider:</span> {device.providerName}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Type:</span> {device.deviceType}
                </p>

                {device.deviceCapabilities?.service?.executionWindows && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {device.deviceCapabilities.service.executionWindows[0]?.executionDay === 'EVERYDAY'
                        ? 'Available 24/7'
                        : `Available on ${device.deviceCapabilities.service.executionWindows[0]?.executionDay}`}
                    </span>
                  </div>
                )}

                {device.deviceCapabilities?.action?.supportedOperations && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-1">Supported Operations:</p>
                    <div className="flex flex-wrap gap-1">
                      {device.deviceCapabilities.action.supportedOperations.slice(0, 6).map((op) => (
                        <Badge key={op} variant="outline" className="text-xs">
                          {op}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">About AWS Braket</h4>
        <p className="text-sm text-muted-foreground">
          Amazon Braket is a fully managed quantum computing service that helps researchers and developers 
          get started with quantum computing. It provides access to quantum hardware from leading providers 
          including IonQ, Rigetti, and Oxford Quantum Circuits, as well as simulators for testing algorithms.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          To use real quantum devices, configure your AWS credentials in the environment variables.
        </p>
      </div>
    </div>
  )
}
