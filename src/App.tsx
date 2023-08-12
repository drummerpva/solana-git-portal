import twitterLogo from './assets/twitter-logo.svg'
import './App.css'
import { useCallback, useEffect, useState } from 'react'

// Constants
const TWITTER_HANDLE = 'teste'
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [gifList, setGifList] = useState<string[]>([])
  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { solana } = window
      if (!solana) {
        window.alert('Instale a Phantom Wallet')
        return
      }
      if (!solana.isPhantom) {
        window.alert('Instale a Phantom Wallet')
        return
      }
      console.log('Phantom instalado')
      const response = await solana.connect({ onlyIfTrusted: true })
      const publicKey = response.publicKey?.toString()
      console.log('Connected to wallet', publicKey)
      setWalletAddress(publicKey)
    } catch (error: any) {
      console.log(error.message)
    }
  }, [])
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [checkIfWalletIsConnected])
  useEffect(() => {
    if (!walletAddress) return
    setGifList(TEST_GIFS)
  }, [walletAddress])

  const connectWallet = useCallback(async () => {
    const { solana } = window
    if (!solana) {
      window.alert('Instale a Phantom Wallet')
      return
    }
    const response = await solana.connect()
    const publicKey = response.publicKey?.toString()
    console.log('Connected to wallet', publicKey)
    setWalletAddress(publicKey)
  }, [])

  const renderNotConnectedContainer = useCallback(
    () => (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Conectar Carteira
      </button>
    ),
    [connectWallet],
  )
  const sendGif = useCallback(() => {
    try {
      const url = new URL(inputValue)
      console.log('Sending gif .:', inputValue)
      setGifList((currentList) => currentList.concat(url.toString()))
      setInputValue('')
    } catch (error) {
      console.log('Empty input or not VALID URL')
    }
  }, [inputValue])
  const renderConnectedContainer = useCallback(
    () => (
      <div className="connected-container">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            sendGif()
          }}
        >
          <input
            type="text"
            placeholder="Coloque o link do GIF aqui!"
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <button type="submit" className="cta-button submit-gif-button">
            Enviar
          </button>
        </form>
        <div className="gif-grid">
          {gifList.map((gif) => (
            <div className="gif-item" key={gif}>
              <img src={gif} alt={gif} />
            </div>
          ))}
        </div>
      </div>
    ),
    [inputValue, sendGif, gifList],
  )

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Descentralizado</p>
          <p className="sub-text">Sua coleção de GIF descentralizada ✨</p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}

export default App
