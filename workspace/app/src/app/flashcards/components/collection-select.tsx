"use client";

import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

interface CollectionSelectProps 
{
  readonly onSelect: (value: string) => void;
  readonly value?: string;
}
  
export function CollectionSelect({ onSelect, value }: CollectionSelectProps) 
{
  return (
    <Select value={value} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Select a collection"/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="exam">Exam Collection</SelectItem>
        <SelectItem value="study">Study Collection</SelectItem>
      </SelectContent>
    </Select>
  );
}
