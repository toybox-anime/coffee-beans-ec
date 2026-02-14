// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-50">
      <div className="flex flex-col items-center gap-4">
        {/* クルクル回るスピナー */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-800"></div>
        <p className="text-amber-800 font-bold animate-pulse">
          コーヒーを淹れています...
        </p>
      </div>
    </div>
  );
}