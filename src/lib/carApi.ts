const FUNCTIONS_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/car-posts`;

export const fetchCarPosts = async (params: Record<string, string | number>) => {
  const url = new URL(FUNCTIONS_BASE);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  // extra params required by the karnameh API
  url.searchParams.append("is_guaranteed", "false");
  url.searchParams.append("has_active_campaign", "false");
  url.searchParams.append("next_set", "1784979159724");
  url.searchParams.append("next_set", "1");
  url.searchParams.append("user_id", "8ef2873e-db76-4e03-a6ce-4100b6d73e11");

  const response = await fetch(url.toString(), {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
