"use client";
import { useRef, useState } from "react";

interface UploadFormProps {
  onUpload: (imageUrl: string, analysis: { calories: number; protein: number; carbs: number; fat: number }) => void;
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) {
      setError("Please select a photo.");
      return;
    }
    setError(null);
    // Simulace uploadu na storage, v produkci by se mělo nahrát na Supabase Storage a získat URL
    const imageUrl = preview;
    onUpload(imageUrl, { calories, protein, carbs, fat });
    setPreview(null);
    setCalories(0);
    setProtein(0);
    setCarbs(0);
    setFat(0);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
      <label className="block text-gray-700 dark:text-gray-200 font-semibold">Meal photo</label>
      <input type="file" accept="image/*" ref={fileInput} onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      {preview && <img src={preview} alt="preview" className="w-full h-48 object-cover rounded-lg border mt-2" />}
      <label className="block text-gray-700 dark:text-gray-200 font-semibold mt-2">Calories</label>
      <input type="number" value={calories} onChange={e => setCalories(Number(e.target.value))} className="input input-bordered w-full" min={0} required />
      <label className="block text-gray-700 dark:text-gray-200 font-semibold">Protein (g)</label>
      <input type="number" value={protein} onChange={e => setProtein(Number(e.target.value))} className="input input-bordered w-full" min={0} required />
      <label className="block text-gray-700 dark:text-gray-200 font-semibold">Carbs (g)</label>
      <input type="number" value={carbs} onChange={e => setCarbs(Number(e.target.value))} className="input input-bordered w-full" min={0} required />
      <label className="block text-gray-700 dark:text-gray-200 font-semibold">Fat (g)</label>
      <input type="number" value={fat} onChange={e => setFat(Number(e.target.value))} className="input input-bordered w-full" min={0} required />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">Save meal</button>
    </form>
  );
}
