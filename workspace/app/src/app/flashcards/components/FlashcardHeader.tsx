import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

import {
  HelpCircle, MoreVertical, RefreshCw, SmileIcon, Clock 
} from "lucide-react";

interface FlashcardHeaderProps 
{
  readonly dueIn: string;
  readonly status: "upcoming" | "completed";
}

export function FlashcardHeader({ dueIn, status }: FlashcardHeaderProps) 
{
  const statusIcon = status === "completed" ? (
    <SmileIcon className="w-6 h-6 text-green-500"/>
  ) : (
    <Clock className="w-6 h-6 text-yellow-500"/>
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {statusIcon}
          <Badge 
            variant={status === "completed" ? "outline" : "secondary"} 
            className="flex items-center gap-1 px-2 py-0.5 text-xs">
            <RefreshCw className="w-3 h-3 mr-1"/>
            {dueIn}
          </Badge>
        </div>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 text-xs">
              IS IN 3 SETS <HelpCircle className="w-3 h-3 ml-1"/>
            </Badge>
          </TooltipTrigger>
          <TooltipContent sideOffset={5}>
            <p>This card appears in 3 different study sets</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="hover:bg-gray-100 p-1.5 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-500"/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit Card</DropdownMenuItem>
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
