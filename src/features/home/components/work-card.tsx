import { ArrowUpRight, Dot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const WorkCard = ({
  title,
  work,
  description,
  href,
  isLast,
  tools,
}: {
  title?: string;
  work?: string;
  description?: string;
  href: string;
  isLast: boolean;
  tools?: string[];
}) => {
  return (
    <div className="grid grid-cols-8 gap-x-6">
      <div className="relative flex flex-col items-center">
        <div className="absolute z-10 h-5 w-5 shrink-0 rounded-full bg-lime-500 opacity-100 backdrop-blur-md" />
        <div className="h-full w-1 bg-lime-800 opacity-100 backdrop-blur-md" />
      </div>
      <Link
        aria-label={`Open ${title ?? "work"}`}
        className={cn(
          "group relative col-span-7 flex flex-col gap-4 focus:outline-none",
          isLast ? "mb-0" : "mb-8"
        )}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="-inset-4 absolute z-0 rounded-xl bg-lime-400/10 opacity-0 backdrop-blur-md duration-200 group-hover:opacity-100" />

        <div className="z-10 flex flex-col gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex flex-row items-end gap-3 group-hover:items-start">
              <h4 className="text-start font-medium text-white group-hover:text-lime-400">
                {title ?? "-"}
              </h4>
              <ArrowUpRight className="h-4 w-4 text-slate-100 group-hover:scale-125 group-hover:stroke-2 group-hover:text-lime-400" />
            </div>
            <div className="flex flex-row items-center gap-1">
              <p className="text-start font-medium text-400 text-slate-400 group-hover:text-slate-100">
                {work ?? "-"}
              </p>
              <Dot className="h-5 w-5 text-slate-400" />
              <p className="text-start text-slate-400 group-hover:text-slate-100">
                Jun 2024 - Aug 2024
              </p>
            </div>
          </div>
          <p className="text-start text-slate-400 group-hover:text-slate-100">
            {description ?? "-"}
          </p>

          {/* Tools as shadcn Badges */}
          <div className="flex w-full flex-wrap gap-2">
            {tools?.map((data, i) => (
              <span
                className="w-fit rounded-full bg-lime-400/10 px-4 py-1 text-slate-100 group-hover:bg-lime-400/20 group-hover:text-lime-400"
                key={`${i}-${data}`}
              >
                {data}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkCard;
