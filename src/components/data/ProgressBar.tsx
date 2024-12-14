import { type FC } from "react";
import { Label } from "../ui/label";

interface ProgressBarProps {
  label: string;
  value: number;
  target: number;
  color: string;
  unit: string;
  hideCurrentValueUnit?: boolean;
  onClick?: () => void;
}

const ProgressBar: FC<ProgressBarProps> = ({
  label,
  value,
  target,
  color,
  unit,
  hideCurrentValueUnit = false,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-xs text-gray-500">
          {value}
          {!hideCurrentValueUnit && unit} / {target}
          {unit}
        </span>
      </div>
      <div className="flex w-full h-12 bg-gray-300 rounded-md shadow-lg overflow-hidden">
        <div
          className={`transition-all rounded-md duration-150 ease-in-out h-full bg-gradient-to-r ${color}`}
          style={{
            flexBasis: `${
              (value / target) * 100 > 100 ? 100 : (value / target) * 100
            }%`,
          }}
        ></div>
        <div className="h-full flex-grow bg-gradient-to-r from-zinc-200 to-zinc-300"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
