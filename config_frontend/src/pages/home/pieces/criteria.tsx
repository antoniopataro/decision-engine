import Select from "@/components/select";

import { Decision } from "@/contexts/policy-context";

const criteriaOptions: {
  label: Decision["criteria"];
  value: Decision["criteria"];
}[] = [
  {
    label: "<",
    value: "<",
  },
  {
    label: "<=",
    value: "<=",
  },
  {
    label: "==",
    value: "==",
  },
  {
    label: ">=",
    value: ">=",
  },
  {
    label: ">",
    value: ">",
  },
];

export const Criteria: React.FC<{
  criteria: Decision["criteria"];
  onChange: (criteria: Decision["criteria"]) => void;
}> = ({ criteria, onChange }) => {
  return (
    <div className="flex h-8 divide-x divide-black/25 rounded ring-1 ring-black/25">
      <Select
        options={criteriaOptions}
        select={criteria}
        setSelect={onChange as any}
      />
    </div>
  );
};
