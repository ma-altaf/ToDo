import Items from "@/features/items/components/Items";
import Clock from "@/shared/components/Clock";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1>ToDo</h1>
      <Clock />
      <Items />
    </div>
  );
}
