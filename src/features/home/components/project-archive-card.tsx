"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProjectArchiveCard = ({
  title,
  description,
  href,
  tools,
}: {
  title?: string;
  description?: string;
  index?: number;
  href: string[];
  image: string;
  tools?: string[];
}) => {
  const [isLinkDialogOpen, setLinkDialogOpen] = useState<boolean>(false);

  const onHandleLinkDiaologOpen = (open: boolean) => setLinkDialogOpen(open);

  const onLinkClick = () => {
    if (href.length < 2) {
      window.open(href[0], "_blank");
    } else {
      onHandleLinkDiaologOpen(true);
    }
  };

  return (
    <>
      <button onClick={() => onLinkClick()} type="button">
        <div className="group hover:!opacity-100 relative flex flex-col items-start gap-6 group-hover/list:opacity-50 sm:flex-row">
          <div className="-inset-4 absolute z-0 rounded-xl bg-lime-400/10 opacity-0 backdrop-blur-md duration-200 group-hover:opacity-100" />

          <div className="z-10 flex flex-col items-start gap-4">
            <div className="flex flex-row items-end gap-3 group-hover:items-start">
              <h4 className="font-medium text-white group-hover:text-lime-400">
                {title ?? "-"}
              </h4>
              <ArrowUpRight className="h-4 w-4 text-slate-100 group-hover:scale-125 group-hover:stroke-2 group-hover:text-lime-400" />
            </div>

            <p className="text-start text-slate-400 group-hover:text-slate-100">
              {description ?? "-"}
            </p>

            <div className="flex w-full flex-wrap gap-2">
              {tools?.map((data, i) => (
                <span
                  className="w-fit rounded-full bg-lime-400/10 px-4 py-1 group-hover:bg-lime-400/20"
                  key={`${i}-${data}`}
                >
                  <p className="text-slate-100 group-hover:text-lime-400">
                    {data}
                  </p>
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      <Dialog onOpenChange={onHandleLinkDiaologOpen} open={isLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Links</DialogTitle>
            <DialogDescription />

            {href.map((data, i) => (
              <Link
                className="break-all text-lime-600 underline"
                href={data}
                key={`${i}-${data}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data}
              </Link>
            ))}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectArchiveCard;
