import { Select } from "@/components/select";

import { type Condition } from "@/contexts/nodes-context";

const criteriaOptions: {
  label: Condition["criteria"];
  value: Condition["criteria"];
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
  criteria: Condition["criteria"];
  onChange: (criteria: Condition["criteria"]) => void;
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
