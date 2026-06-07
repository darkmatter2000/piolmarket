import { NextRequest, NextResponse } from "next/server";
import { MOCK_LISTINGS } from "@/lib/utils/mock-data";
import type { ListingsFilters } from "@/lib/types";

// TODO: Replace mock data with Supabase query once .env is configured
// import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: ListingsFilters = {
      city: searchParams.get("city") as any || undefined,
      listing_type: searchParams.get("type") as any || undefined,
      property_type: searchParams.get("property_type") as any || undefined,
      price_min: searchParams.get("price_min") ? Number(searchParams.get("price_min")) : undefined,
      price_max: searchParams.get("price_max") ? Number(searchParams.get("price_max")) : undefined,
      sort_by: searchParams.get("sort_by") as any || "newest",
      page: Number(searchParams.get("page")) || 1,
      page_size: Number(searchParams.get("page_size")) || 12,
    };

    // ---- MOCK MODE (no Supabase configured) ----
    // When NEXT_PUBLIC_SUPABASE_URL is set, switch to the Supabase query below
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("xxxx")) {
      let data = [...MOCK_LISTINGS];

      if (filters.city) data = data.filter((l) => l.city === filters.city);
      if (filters.listing_type) data = data.filter((l) => l.listing_type === filters.listing_type);
      if (filters.property_type) data = data.filter((l) => l.property_type === filters.property_type);
      if (filters.price_min) data = data.filter((l) => l.price >= filters.price_min!);
      if (filters.price_max) data = data.filter((l) => l.price <= filters.price_max!);

      const start = ((filters.page || 1) - 1) * (filters.page_size || 12);
      const paginated = data.slice(start, start + (filters.page_size || 12));

      return NextResponse.json({
        data: paginated,
        count: data.length,
        page: filters.page || 1,
        pageSize: filters.page_size || 12,
        totalPages: Math.ceil(data.length / (filters.page_size || 12)),
      });
    }

    // ---- SUPABASE MODE ----
    // const supabase = createClient();
    // let query = supabase.from("properties").select("*, neighborhood:neighborhoods(*), photos:property_photos(*)", { count: "exact" });
    //
    // if (filters.city) query = query.eq("city", filters.city);
    // if (filters.listing_type) query = query.eq("listing_type", filters.listing_type);
    // if (filters.property_type) query = query.eq("property_type", filters.property_type);
    // if (filters.price_min) query = query.gte("price", filters.price_min);
    // if (filters.price_max) query = query.lte("price", filters.price_max);
    //
    // const sortMap = {
    //   price_asc: { column: "price", ascending: true },
    //   price_desc: { column: "price", ascending: false },
    //   newest: { column: "created_at", ascending: false },
    //   relevance: { column: "created_at", ascending: false },
    // };
    // const sort = sortMap[filters.sort_by || "newest"];
    // query = query.order(sort.column, { ascending: sort.ascending });
    //
    // const pageSize = filters.page_size || 12;
    // const page = filters.page || 1;
    // const start = (page - 1) * pageSize;
    // query = query.range(start, start + pageSize - 1);
    //
    // const { data, error, count } = await query;
    // if (error) throw error;
    //
    // return NextResponse.json({
    //   data: data || [],
    //   count: count || 0,
    //   page,
    //   pageSize,
    //   totalPages: Math.ceil((count || 0) / pageSize),
    // });

    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  } catch (error) {
    console.error("[API] /api/listings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
