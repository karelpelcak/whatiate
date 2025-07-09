"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MealCard from "@/components/MealCard";
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

export default function DashboardPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [user, setUser] = useState<{ name?: string; email?: string; image?: string } | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8 px-2">
        <div className="flex flex-col items-center mb-8">
          {user?.image && (
            <img src={user.image} alt="profile" className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg mb-2 object-cover" />
          )}
          <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{user?.name}</div>
          <div className="text-gray-600 dark:text-gray-300">{user?.email}</div>
        </div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Your meals</h2>
        <div className="flex flex-col gap-8">
          {meals.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-center">No meals yet. Upload your first meal!</div>
          ) : (
            meals.map((meal) => (
              <MealCard key={meal.id} imageUrl={meal.image_url} analysis={{calories: meal.calories, protein: meal.protein, carbs: meal.carbs, fat: meal.fat}} date={meal.created_at || ""} user={user || undefined} />
            ))
          )}
        </div>
      </main>
    </div>
  );
} 