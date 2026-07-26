const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const BASE = "https://api-gw.karnameh.com/post-storage/car-posts/car-post-list/";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const incoming = new URL(req.url);
    const target = new URL(BASE);
    incoming.searchParams.forEach((value, key) => {
      target.searchParams.append(key, value);
    });

    const upstream = await fetch(target.toString(), {
      headers: {
        accept: "application/json",
        "user-agent": "Mozilla/5.0",
      },
    });

    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error("car-posts proxy error:", e);
    return new Response(
      JSON.stringify({ error: "upstream_unreachable", message: String(e) }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
