// api/bitcoin.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Fetch price data
    const priceResponse = await fetch('https://blockchain.info/ticker');
    const priceData = await priceResponse.json();
    
    // Fetch block data
    const blockResponse = await fetch('https://blockchain.info/latestblock');
    const blockData = await blockResponse.json();
    
    // Return combined data
    res.status(200).json({
      success: true,
      price: {
        usd: priceData.USD.last,
        symbol: priceData.USD.symbol
      },
      block: {
        height: blockData.height,
        time: blockData.time,
        hash: blockData.hash,
        block_index: blockData.block_index
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Bitcoin data'
    });
  }
}
