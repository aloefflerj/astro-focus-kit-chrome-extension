export function isOnExtensionContext(): boolean {
  return location.protocol === 'chrome-extension:';
}
