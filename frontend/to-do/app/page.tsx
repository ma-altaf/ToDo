import ItemsSection from "@/features/items/components/ItemsSection";
import Clock from "@/shared/components/Clock/Clock";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1>ToDo</h1>
      <Clock />
      <ItemsSection />
    </div>
  );
}
