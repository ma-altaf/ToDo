import Items from "@/features/items/components/Items";
import Clock from "@/shared/components/Clock";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h1>ToDo</h1>
      <Clock />
      <Items />
    </div>
  );
}
