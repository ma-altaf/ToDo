import ItemsHeader from "./ItemsHeader";
import ItemsList from "./ItemsList";

export default function ItemsSection() {
  return (
    <section className="w-full md:w-3/5 flex flex-col mx-auto">
      <ItemsHeader />
      <ItemsList />
    </section>
  );
}
