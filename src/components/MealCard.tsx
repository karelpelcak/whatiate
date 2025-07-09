interface MealCardProps {
  imageUrl: string;
  analysis: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  date: string;
  user?: { name?: string; image?: string };
}

export default function MealCard({ imageUrl, analysis, date, user }: MealCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 flex flex-col gap-3 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3">
        {user?.image && <img src={user.image} alt="user" className="w-8 h-8 rounded-full border" />}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 dark:text-gray-100">{user?.name || "You"}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{date ? new Date(date).toLocaleString() : ""}</span>
        </div>
      </div>
      <img src={imageUrl} alt="meal" className="w-full h-48 object-cover rounded-lg border" />
      <div className="flex flex-wrap gap-4 justify-between mt-2">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Calories</span>
          <span className="font-bold text-lg text-blue-600 dark:text-blue-300">{analysis.calories}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Protein</span>
          <span className="font-bold text-lg text-green-600 dark:text-green-300">{analysis.protein}g</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Carbs</span>
          <span className="font-bold text-lg text-yellow-600 dark:text-yellow-300">{analysis.carbs}g</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Fat</span>
          <span className="font-bold text-lg text-pink-600 dark:text-pink-300">{analysis.fat}g</span>
        </div>
      </div>
    </div>
  );
}
