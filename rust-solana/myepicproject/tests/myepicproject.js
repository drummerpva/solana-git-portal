const anchor = require('@coral-xyz/anchor')
// const anchor = require('@project-serum/anchor')

describe('myepicproject', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env())

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Myepicproject
    const tx = await program.rpc.startStuffOff()
    console.log('Your transaction signature', tx)
  })
})
/* const main = async () => {
  console.log('🚀 Starting test...')

  anchor.setProvider(anchor.AnchorProvider.env())

  const program = anchor.workspace.Myepicproject
  const tx = await program.rpc.startStuffOff()

  console.log('📝 Your transaction signature', tx)
}
const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain() */
