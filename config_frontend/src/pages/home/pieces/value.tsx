import { Condition } from "@/contexts/nodes-context";

export const Value: React.FC<{
  onChange: (value: Condition["value"]) => void;
  value: Condition["value"];
}> = ({ onChange, value }) => {
  return (
    <input
      defaultValue={value}
      onBlur={(e) => onChange(parseInt(e.target.value, 10))}
      type="number"
      className="h-8 truncate rounded px-2 py-1 outline-none ring-1 ring-black/25"
    />
  );
};
