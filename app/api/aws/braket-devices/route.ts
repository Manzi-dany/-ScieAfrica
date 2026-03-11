import { NextRequest, NextResponse } from 'next/server'
import { BraketClient, SearchDevicesCommand } from '@aws-sdk/client-braket'

/**
 * GET /api/aws/braket-devices
 * List available AWS Braket quantum devices
 * Note: Requires AWS credentials to be configured
 */
export async function GET(request: NextRequest) {
  try {
    // Check if AWS credentials are configured
    const hasAwsCredentials =
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY

    // If no credentials, return mock data for demo
    if (!hasAwsCredentials) {
      return NextResponse.json({
        devices: getMockBraketDevices(),
        source: 'mock',
        message:
          'Using mock data. Configure AWS credentials to access real Braket devices.',
      })
    }

    // Initialize Braket client
    const client = new BraketClient({
      region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })

    // Search for quantum devices
    const command = new SearchDevicesCommand({
      filters: [],
    })
    const response = await client.send(command)

    return NextResponse.json({
      devices: response.devices || [],
      source: 'aws',
    })
  } catch (error) {
    console.error('Braket devices error:', error)
    // Return mock data on error
    return NextResponse.json({
      devices: getMockBraketDevices(),
      source: 'mock',
      message: 'Error accessing AWS Braket, using mock data.',
    })
  }
}

/**
 * Mock Braket devices for demonstration
 */
function getMockBraketDevices() {
  return [
    {
      deviceArn:
        'arn:aws:braket:::device/qpu/ionq/ionQdevice',
      deviceName: 'IonQ Device',
      deviceType: 'QPU',
      deviceStatus: 'ONLINE',
      providerName: 'IonQ',
      deviceCapabilities: {
        service: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_service_properties',
            version: '1',
          },
          executionWindows: [
            {
              executionDay: 'EVERYDAY',
              windowStartHour: '00:00',
              windowEndHour: '23:59',
            },
          ],
          shotsRange: [1, 10000],
        },
        action: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_action_properties',
            version: '1',
          },
          supportedOperations: ['x', 'y', 'z', 'rx', 'ry', 'rz', 'h', 'cnot'],
        },
        deviceParameters: {
          braketSchemaHeader: {
            name: 'braket.device_schema.ionq.ionq_device_parameters',
            version: '1',
          },
        },
      },
    },
    {
      deviceArn:
        'arn:aws:braket:::device/qpu/rigetti/Aspen-M-3',
      deviceName: 'Rigetti Aspen-M-3',
      deviceType: 'QPU',
      deviceStatus: 'ONLINE',
      providerName: 'Rigetti',
      deviceCapabilities: {
        service: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_service_properties',
            version: '1',
          },
          executionWindows: [
            {
              executionDay: 'TUESDAY',
              windowStartHour: '15:00',
              windowEndHour: '18:00',
            },
          ],
          shotsRange: [10, 100000],
        },
        action: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_action_properties',
            version: '1',
          },
          supportedOperations: ['x', 'y', 'z', 'rx', 'ry', 'rz', 'h', 'cnot', 'cz'],
        },
      },
    },
    {
      deviceArn:
        'arn:aws:braket:::device/quantum-simulator/amazon/sv1',
      deviceName: 'SV1 Simulator',
      deviceType: 'SIMULATOR',
      deviceStatus: 'ONLINE',
      providerName: 'Amazon Braket',
      deviceCapabilities: {
        service: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_service_properties',
            version: '1',
          },
          executionWindows: [
            {
              executionDay: 'EVERYDAY',
              windowStartHour: '00:00',
              windowEndHour: '23:59',
            },
          ],
          shotsRange: [0, 0],
        },
        action: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_action_properties',
            version: '1',
          },
          supportedOperations: ['x', 'y', 'z', 'rx', 'ry', 'rz', 'h', 'cnot', 'cz', 'swap'],
        },
      },
    },
    {
      deviceArn:
        'arn:aws:braket:::device/quantum-simulator/amazon/tn1',
      deviceName: 'TN1 Simulator',
      deviceType: 'SIMULATOR',
      deviceStatus: 'ONLINE',
      providerName: 'Amazon Braket',
      deviceCapabilities: {
        service: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_service_properties',
            version: '1',
          },
          executionWindows: [
            {
              executionDay: 'EVERYDAY',
              windowStartHour: '00:00',
              windowEndHour: '23:59',
            },
          ],
          shotsRange: [0, 0],
        },
        action: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_action_properties',
            version: '1',
          },
          supportedOperations: ['x', 'y', 'z', 'rx', 'ry', 'rz', 'h', 'cnot'],
        },
      },
    },
    {
      deviceArn:
        'arn:aws:braket:::device/qpu/oqc/lucy',
      deviceName: 'OQC Lucy',
      deviceType: 'QPU',
      deviceStatus: 'ONLINE',
      providerName: 'Oxford Quantum Circuits',
      deviceCapabilities: {
        service: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_service_properties',
            version: '1',
          },
          executionWindows: [
            {
              executionDay: 'WEEKDAYS',
              windowStartHour: '10:00',
              windowEndHour: '16:00',
            },
          ],
          shotsRange: [1, 10000],
        },
        action: {
          braketSchemaHeader: {
            name: 'braket.device_schema.device_action_properties',
            version: '1',
          },
          supportedOperations: ['x', 'y', 'z', 'rx', 'ry', 'rz', 'h', 'cnot'],
        },
      },
    },
  ]
}
