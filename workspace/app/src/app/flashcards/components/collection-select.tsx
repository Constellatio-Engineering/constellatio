"use client";

import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";

interface CollectionSelectProps 
{
  readonly onSelect: (value: string) => void;
}

export function CollectionSelect({ onSelect }: CollectionSelectProps) 
{
  return (
    <div className="grid gap-2">
      <Label htmlFor="set">Assign To Set</Label>
      <Select onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a collection"/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="exam">Exam Collection</SelectItem>
          <SelectItem value="study">Study Collection</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
