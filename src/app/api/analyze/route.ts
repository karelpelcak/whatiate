// Tento endpoint je nyní prázdný, protože AI analýza se již nepoužívá.
export async function POST() {
  return new Response(JSON.stringify({ message: "Not implemented" }), { status: 501 });
} 