export function track(event, payload = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    const entry = { event, payload, ts: Date.now() }
    window.dataLayer.push(entry)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', entry)
    }
  } catch (e) {
    // noop
  }
}
