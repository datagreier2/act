export function isPreviewModePath(pathname) {
  const path = String(pathname || '').toLowerCase()
  return path === '/preview' || path.startsWith('/preview/')
}

export function getIsPreviewMode() {
  if (typeof window === 'undefined') return false
  return isPreviewModePath(window.location.pathname)
}
