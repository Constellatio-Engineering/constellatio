import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

type FlashcardMenuProps = {
  readonly onDelete: () => void;
};

export function FlashcardMenu({ onDelete }: FlashcardMenuProps) 
{
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-500"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black text-white border-gray-800">
        <DropdownMenuItem>Edit Card</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400" onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
