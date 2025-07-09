"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import MealCard from "@/components/MealCard";
import { AnalysisResult } from "@/lib/imageAnalysis";
import { supabase } from "@/lib/supabaseClient";

interface Meal {
  id?: number;
  image_url: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at?: string;
}

export default function UploadPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [lastMeal, setLastMeal] = useState<Meal | null>(null);
  const [user, setUser] = useState<{ name?: string; image?: string } | null>(null);

  useEffect(() => {
    // Načti jídla ze Supabase
    supabase
      .from("meals")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setMeals(data);
      });
    const session = window.sessionStorage.getItem("nextauth.user");
    if (session) setUser(JSON.parse(session));
  }, []);

  const handleUpload = async (imageUrl: string, analysis: AnalysisResult) => {
    const { data, error } = await supabase
      .from("meals")
      .insert([
        {
          image_url: imageUrl,
          calories: analysis.calories,
          protein: analysis.protein,
          carbs: analysis.carbs,
          fat: analysis.fat,
        },
      ])
      .select();
    if (!error && data && data[0]) {
      const meal = data[0];
      setMeals([meal, ...meals]);
      setLastMeal(meal);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-blue-950 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-2 py-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 tracking-tight drop-shadow-lg">Upload your meal</h1>
        <UploadForm onUpload={handleUpload} />
        {lastMeal && (
          <div className="mt-10 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 text-center">Analysis result</h2>
            <MealCard imageUrl={lastMeal.image_url} analysis={{calories: lastMeal.calories, protein: lastMeal.protein, carbs: lastMeal.carbs, fat: lastMeal.fat}} date={lastMeal.created_at || ""} user={user || undefined} />
          </div>
        )}
      </main>
    </div>
  );
} 