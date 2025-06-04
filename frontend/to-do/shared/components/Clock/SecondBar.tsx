export default function SecondBar({ second }: { second: number }) {
  return (
    <div className="rounded-full h-2 m-0 w-full flex items-center justify-center border-foreground border-r-2 border-l-2">
      <div
        className="rounded-full h-1 m-0 w-full bg-foreground duration-300"
        style={{ width: `${(second / 60) * 100}%` }}
      ></div>
    </div>
  );
}
