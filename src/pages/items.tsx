import Card from "~/components/Card";
import useItems from "~/hooks/useItems";

export default function Items() {
  const { itemsarr, loading } = useItems();
  if (itemsarr === undefined || itemsarr?.length === 0 || loading)
    return <div>Nincsenek tárgyak</div>;
  return (
    <div className="mx-auto grid w-[80%] lg:grid-cols-2 2xl:grid-cols-3">
      {itemsarr?.map((item) => {
        return <Card item={item} key={item.id} />;
      })}
    </div>
  );
}
