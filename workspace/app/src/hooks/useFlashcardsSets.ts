"use client";

import { api } from "@/trpc/react";

export const useFlashcardsSets = () => 
{
  const { data: collections, error, isLoading } = api.flashcards.getFlashcardsSets.useQuery();

  return {
    collections: collections ?? [],
    error,
    isLoading,
  };
};
