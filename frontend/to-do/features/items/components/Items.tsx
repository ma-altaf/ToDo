import ItemsHeader from "./ItemsHeader";
import ItemsList from "./ItemsList";

export default function Items() {
  return (
    <section className="w-full md:w-3/4 flex flex-col mx-auto">
      <ItemsHeader />
      <ItemsList />
    </section>
  );
}
