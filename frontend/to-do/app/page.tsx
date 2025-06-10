import ItemsSection from "@/features/items/components/ItemsSection";
import Clock from "@/shared/components/Clock";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-8 px-2 min-h-screen">
      <h1>ToDo</h1>
      <Clock />
      <ItemsSection />
    </div>
  );
}
