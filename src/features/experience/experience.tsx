"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CursorSpotlight from "@/components/common/cursor-spotlight";
import BrandIcon from "@/components/icons/brand-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type CardItem = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

const MAX_RANDOM_POSITION = 200;
const CARD_SCALE_DRAGGING = 1.05;
const CARD_SCALE_DEFAULT = 1;

export default function Experience() {
  const boardRef = useRef<HTMLDivElement>(null);

  const [cards, setCards] = useState<CardItem[]>([
    { id: "1", title: "Card 1", description: "Drag me around", x: 50, y: 50 },
    {
      id: "2",
      title: "Card 2",
      description: "Free form placement",
      x: 350,
      y: 150,
    },
    {
      id: "3",
      title: "Card 3",
      description: "Use transform translate",
      x: 650,
      y: 100,
    },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!(draggingId && boardRef.current)) return;

      const boardRect = boardRef.current.getBoundingClientRect();
      const newX = e.clientX - boardRect.left - dragOffset.x;
      const newY = e.clientY - boardRect.top - dragOffset.y;

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === draggingId
            ? { ...card, x: Math.max(0, newX), y: Math.max(0, newY) }
            : card
        )
      );
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    if (draggingId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingId, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const card = cards.find((c) => c.id === id);
    if (!(card && boardRef.current)) return;

    const boardRect = boardRef.current.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - boardRect.left - card.x,
      y: e.clientY - boardRect.top - card.y,
    });
    setDraggingId(id);
  };

  const addCard = () => {
    const newCard: CardItem = {
      id: Date.now().toString(),
      title: `Card ${cards.length + 1}`,
      description: "New card",
      x: Math.random() * MAX_RANDOM_POSITION,
      y: Math.random() * MAX_RANDOM_POSITION,
    };
    setCards([...cards, newCard]);
  };

  return (
    <main className="relative h-svh w-svw overflow-clip font-sans">
      <CursorSpotlight />

      <div className="-translate-x-1/2 absolute inset-shadow-2xs inset-shadow-white/20 top-4 left-1/2 z-50 flex h-fit w-full max-w-md items-center justify-between rounded-md bg-zinc-800 p-2 backdrop-blur-lg">
        <div className="p-2">
          <BrandIcon className="aspect-square text-lime-500" />
        </div>
        <div className="flex gap-2.5 font-mono">
          <Link href="/">
            <Button className="cursor-pointer rounded-full">Home</Button>
          </Link>
          <Button
            className="cursor-pointer rounded-full bg-lime-700 hover:bg-lime-700/80"
            onClick={addCard}
          >
            Add Note
          </Button>
        </div>
      </div>
      <div
        className="absolute h-svh w-svw overflow-clip font-sans"
        ref={boardRef}
      >
        {/* Cards */}
        {cards.map((card) => (
          <div
            aria-label={`Move ${card.title}`}
            className="pointer-events-auto absolute border-none bg-transparent p-0"
            key={card.id}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const mouseEvent = new MouseEvent("mousedown", {
                  clientX: e.currentTarget.getBoundingClientRect().left,
                  clientY: e.currentTarget.getBoundingClientRect().top,
                });
                handleMouseDown(
                  mouseEvent as unknown as React.MouseEvent,
                  card.id
                );
              }
            }}
            onMouseDown={(e) => handleMouseDown(e, card.id)}
            role="button"
            style={{
              transform: `translate(${card.x}px, ${card.y}px) scale(${draggingId === card.id ? CARD_SCALE_DRAGGING : CARD_SCALE_DEFAULT})`,
              cursor: draggingId === card.id ? "grabbing" : "grab",
              boxShadow:
                draggingId === card.id
                  ? "0 20px 40px rgba(0,0,0,0.2)"
                  : "0 10px 20px rgba(0,0,0,0.1)",
              transition: draggingId === card.id ? "none" : "all 0.2s ease-out",
            }}
            tabIndex={0}
          >
            <motion.div
              animate={{ rotate: 0 }}
              className="w-80 select-none rounded-md border-none bg-zinc-800/80 p-0.5 shadow-lg transition-shadow hover:shadow-xl"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={draggingId !== card.id ? { rotate: 2 } : {}}
            >
              <div className="mr-6 flex items-center gap-1">
                <Avatar className="m-3 rounded-full bg-zinc-900">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <div className="font-semibold text-xs text-zinc-400">
                    {card.title}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {card.description}
                  </div>
                </div>
              </div>
              <div className="aspect-video w-full rounded-md bg-zinc-950">
                test
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </main>
  );
}
