export function PatientIdentifiedTag({
  name,
  onUnselect,
}: {
  name: string;
  onUnselect: Function;
}) {
  return (
    <div className="flex items-center p-2 px-4 bg-gray-100 w-fit rounded-full border border-sky-500">
      <span className="pr-4">{name}</span>
      <span
        className="cursor-pointer inline-block px-2 rounded-full flex items-center text-slate-400"
        onClick={() => onUnselect()}
      >
        x
      </span>
    </div>
  );
}
