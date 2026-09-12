export async function fetchMicrolinkScreenshot(demoUrl: string): Promise<string | null> {
  const params = new URLSearchParams({
    url: demoUrl,
    screenshot: "true",
    meta: "false",
    waitUntil: "networkidle0",
    waitForTimeout: "3000",
  });
  
  try {
    const headers: Record<string, string> = {};
    if (process.env.MICROLINK_API_KEY) {
      headers["x-api-key"] = process.env.MICROLINK_API_KEY;
    }
    const res = await fetch(`https://api.microlink.io/?${params.toString()}`, { headers });
    const json = await res.json();
    if (json.status !== "success" || !json.data?.screenshot?.url) return null;
    return json.data.screenshot.url;
  } catch (err) {
    console.error("Microlink screenshot fetch failed:", err);
    return null;
  }
}
