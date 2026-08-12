import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: ReactNode;
  subtext?: string;
  icon?: ReactNode;
};

function StatCard({ label, value, subtext, icon }: StatCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
      <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
        <span>{icon}</span> {label}
      </p>
      <p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
  );
}

export default StatCard;