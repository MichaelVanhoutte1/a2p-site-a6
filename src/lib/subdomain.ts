/**
 * Extracts the subdomain from a hostname
 * Example: "acme.mydomain.com" -> "acme"
 * Example: "acme-plumbing.stonesystems.io" -> "acme-plumbing"
 */
export function extractSubdomain(hostname: string): string | null {
  // Remove port if present
  const hostWithoutPort = hostname.split(':')[0];
  
  // Split by dots
  const parts = hostWithoutPort.split('.');
  
  console.log('extractSubdomain - Hostname:', hostname);
  console.log('extractSubdomain - Parts:', parts);
  console.log('extractSubdomain - Parts length:', parts.length);
  
  // If we have at least 3 parts (subdomain.domain.tld), return the first part
  // Examples: "acme-plumbing.stonesystems.io" -> ["acme-plumbing", "stonesystems", "io"]
  // Exclude 'www' and 'dev' as special subdomains (treated as root domains)
  // If it's localhost or IP, return null
  if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'dev' && parts[0] !== 'localhost') {
    const subdomain = parts[0];
    console.log('extractSubdomain - Extracted subdomain:', subdomain);
    return subdomain;
  }
  
  // For development/localhost, you might want to handle this differently
  // For now, return null if no subdomain detected
  console.log('extractSubdomain - No subdomain detected');
  return null;
}

/**
 * Checks if the current hostname is the root domain (no subdomain)
 * Example: "dev.stonesystems.io" -> true (dev is treated as root domain)
 * Example: "www.stonesystems.io" -> true (www is treated as root domain)
 * Example: "acme-plumbing.stonesystems.io" -> false
 * Example: "stonesystems.io" -> true (2 parts, no subdomain)
 */
export function isRootDomain(hostname: string): boolean {
  const hostWithoutPort = hostname.split(':')[0];
  const parts = hostWithoutPort.split('.');
  
  // Root domain has 2 parts (domain.tld) or is localhost
  // Also treat www.domain.tld and dev.domain.tld as root domain (special cases)
  // Subdomain has 3+ parts where first part is NOT www or dev (subdomain.domain.tld)
  return (
    parts.length === 2 || 
    (parts.length === 3 && (parts[0] === 'www' || parts[0] === 'dev')) ||
    hostname === 'localhost' || 
    hostname.startsWith('localhost:')
  );
}
