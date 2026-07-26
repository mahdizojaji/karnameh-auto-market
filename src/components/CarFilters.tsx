import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CarFiltersState = {
  sort: string;
  size: number;
  relevant: boolean;
  is_guaranteed: boolean;
  has_active_campaign: boolean;
};

export const defaultFilters: CarFiltersState = {
  sort: "newest",
  size: 20,
  relevant: false,
  is_guaranteed: false,
  has_active_campaign: false,
};

const SORT_OPTIONS = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "most_expensive", label: "گران‌ترین" },
  { value: "lowest_mileage", label: "کم‌کارکردترین" },
];

const SIZE_OPTIONS = [10, 20, 30, 50];

interface CarFiltersProps {
  value: CarFiltersState;
  onChange: (value: CarFiltersState) => void;
}

export const CarFilters = ({ value, onChange }: CarFiltersProps) => {
  const set = <K extends keyof CarFiltersState>(key: K, v: CarFiltersState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="mb-8 rounded-lg border bg-card p-4 text-card-foreground">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 items-end">
        <div className="space-y-2">
          <Label>مرتب‌سازی</Label>
          <Select value={value.sort} onValueChange={(v) => set("sort", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>تعداد در هر صفحه</Label>
          <Select
            value={String(value.size)}
            onValueChange={(v) => set("size", Number(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SIZE_OPTIONS.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="relevant">فقط مرتبط</Label>
            <Switch
              id="relevant"
              checked={value.relevant}
              onCheckedChange={(v) => set("relevant", v)}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="is_guaranteed">دارای ضمانت</Label>
            <Switch
              id="is_guaranteed"
              checked={value.is_guaranteed}
              onCheckedChange={(v) => set("is_guaranteed", v)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="has_active_campaign">دارای کمپین فعال</Label>
            <Switch
              id="has_active_campaign"
              checked={value.has_active_campaign}
              onCheckedChange={(v) => set("has_active_campaign", v)}
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onChange(defaultFilters)}
          >
            حذف فیلترها
          </Button>
        </div>
      </div>
    </div>
  );
};
