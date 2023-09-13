import { Decision } from "@/contexts/policy-context";

export const Variable: React.FC<{
  onChange: (variable: Decision["variable"]) => void;
  variable: Decision["variable"];
}> = ({ onChange, variable }) => {
  return (
    <input
      defaultValue={variable}
      onBlur={(e) => onChange(e.target.value)}
      className="h-8 truncate rounded px-2 py-1 outline-none ring-1 ring-black/25"
    />
  );
};
