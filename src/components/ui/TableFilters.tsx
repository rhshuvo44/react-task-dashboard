import { DatePicker, Input, Select } from "antd";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type FilterType = "text" | "select" | "dateRange";

interface FilterField {
  key: string;
  label?: string;
  type: FilterType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  value?: any;
}

interface TableFiltersProps {
  fields: FilterField[];
  onChange: (key: string, value: any) => void;
}

export function TableFilters({ fields, onChange }: TableFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <Input
                key={field.key}
                placeholder={field.placeholder || field.label}
                value={field.value}
                onChange={(e) => onChange(field.key, e.target.value)}
                allowClear
                style={{ width: 200 }}
              />
            );
          case "select":
            return (
              <Select
                key={field.key}
                placeholder={field.placeholder || field.label}
                value={field.value}
                onChange={(val) => onChange(field.key, val)}
                allowClear
                options={field.options || []}
                style={{ width: 200 }}
              />
            );
          case "dateRange":
            return (
              <RangePicker
                key={field.key}
                onChange={(dates) =>
                  onChange(field.key, dates as [Dayjs | null, Dayjs | null])
                }
                value={field.value}
                allowEmpty={[true, true]}
                style={{ width: 250 }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
