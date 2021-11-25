// const swUrl = `${process.env.PUBLIC_URL}/sw.js`
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
}
