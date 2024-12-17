"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFlashcardsSets } from "@/hooks/useFlashcardsSets";

interface FlashcardsSetsSelectProps 
{
  readonly onSelect: (value: string) => void;
  readonly value?: string;
}

export function FlashcardsSetsSelect({ onSelect, value }: FlashcardsSetsSelectProps) 
{
  const { collections, isLoading } = useFlashcardsSets();

  if(isLoading) 
  {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Loading collections..."/>
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value ?? undefined} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a collection"/>
      </SelectTrigger>
      <SelectContent>
        {collections.map((collection) => (
          <SelectItem key={collection.id} value={collection.id}>
            {collection.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
