"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PortfolioCatalogCardProps = {
  slug: string;
  image: string;
  title: string;
  description: string;
  href: string[];
  tools: string[];
};

const CARD_DESCRIPTION_MAX_LENGTH = 140;

const PortfolioCatalogCard = ({
  slug,
  image,
  title,
  description,
  href,
  tools,
}: PortfolioCatalogCardProps) => {
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);
  const truncatedDescription = `${description.slice(0, CARD_DESCRIPTION_MAX_LENGTH)}…`;

  return (
    <>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition-colors hover:border-lime-400/30 hover:bg-zinc-900/70"
        data-slug={slug}
      >
        <button
          aria-label={`View ${title} details`}
          className="flex h-full cursor-pointer flex-col text-left"
          onClick={() => setDetailDialogOpen(true)}
          type="button"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
            <Image
              alt={title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={image}
            />
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-white group-hover:text-lime-400">
                {title}
              </h3>
              <ArrowUpRight
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-hover:scale-110 group-hover:text-lime-400"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {truncatedDescription}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  className="rounded-full bg-lime-400/10 px-3 py-1 font-mono text-slate-100 text-xs group-hover:bg-lime-400/20 group-hover:text-lime-400"
                  key={`${slug}-${tool}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </button>
      </article>

      <Dialog onOpenChange={setDetailDialogOpen} open={isDetailDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-900 text-slate-100 sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">{title}</DialogTitle>
            <DialogDescription className="sr-only">
              Full project details for {title}
            </DialogDescription>
          </DialogHeader>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-950">
            <Image
              alt={`${title} full preview`}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              src={image}
            />
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                className="rounded-full bg-lime-400/10 px-3 py-1 font-mono text-lime-400 text-xs"
                key={`${slug}-dialog-${tool}`}
              >
                {tool}
              </span>
            ))}
          </div>

          <DialogFooter className="gap-2 sm:justify-start">
            {href.map((url) => (
              <Button
                asChild
                className="rounded-full bg-lime-700 hover:bg-lime-700/80"
                key={`${slug}-visit-${url}`}
                type="button"
              >
                <Link href={url} rel="noopener noreferrer" target="_blank">
                  Visit Project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioCatalogCard;
