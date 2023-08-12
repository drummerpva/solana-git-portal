declare global {
  interface Window {
    solana?: {
      isPhantom: boolean
      connect: (args?: any) => Promise<{
        publicKey: {
          toString(): string
        }
      }>
    }
  }
}
export {}
