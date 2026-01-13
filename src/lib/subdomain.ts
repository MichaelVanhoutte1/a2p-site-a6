/**
 * Extracts the subdomain from a hostname
 * Example: "acme.mydomain.com" -> "acme"
 */
export function extractSubdomain(hostname: string): string | null {
  // Remove port if present
  const hostWithoutPort = hostname.split(':')[0];
  
  // Split by dots
  const parts = hostWithoutPort.split('.');
  
  // If we have at least 3 parts (subdomain.domain.tld), return the first part
  // If it's localhost or IP, return null
  if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }
  
  // For development/localhost, you might want to handle this differently
  // For now, return null if no subdomain detected
  return null;
}
