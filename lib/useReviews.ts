"use client";

import { useCallback, useEffect, useState } from "react";
import { seedReviews, type Review } from "./reviews-data";

const LOCAL_KEY = "matrushakti_reviews";

function loadLocalReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveLocalReview(r: Review) {
  const existing = loadLocalReviews();
  localStorage.setItem(LOCAL_KEY, JSON.stringify([r, ...existing]));
}

// Single-flight + short-lived cache so multiple hook instances mounting at
// once (e.g. React Strict Mode's dev double-invoke, or the homepage and
// /reviews both rendering) collapse into one network request.
let approvedCache: Review[] | null = null;
let approvedInFlight: Promise<Review[]> | null = null;

function fetchApproved(): Promise<Review[]> {
  if (approvedCache) return Promise.resolve(approvedCache);
  if (approvedInFlight) return approvedInFlight;

  approvedInFlight = fetch("/api/reviews")
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => [])
    .then((data: Review[]) => {
      approvedCache = data;
      return data;
    })
    .finally(() => {
      approvedInFlight = null;
    });

  return approvedInFlight;
}

// Merges: locally-submitted reviews (this browser, optimistic) + reviews
// approved via the admin dashboard (/api/reviews) + the static seed set,
// so every page reads from the same source of truth.
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const local = loadLocalReviews();
      const approved = await fetchApproved();

      if (cancelled) return;
      const seen = new Set<string>();
      const merged: Review[] = [];
      for (const r of [...local, ...approved, ...seedReviews]) {
        if (seen.has(r.id)) continue;
        seen.add(r.id);
        merged.push(r);
      }
      setReviews(merged);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addReview = useCallback((review: Review) => {
    saveLocalReview(review);
    setReviews((prev) => [review, ...prev]);
  }, []);

  return { reviews, loading, addReview };
}
