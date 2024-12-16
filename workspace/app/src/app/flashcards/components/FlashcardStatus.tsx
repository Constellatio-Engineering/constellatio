import { Badge } from "@/components/ui/badge";

import { Clock, RefreshCw, SmileIcon } from "lucide-react";

interface FlashcardStatusProps 
{
  readonly dueIn: string;
  readonly status: "upcoming" | "completed";
}

export function FlashcardStatus({ dueIn, status }: FlashcardStatusProps) 
{
  const statusIcon = status === "completed" ? (
    <SmileIcon className="w-6 h-6 text-green-500"/>
  ) : (
    <Clock className="w-6 h-6 text-yellow-500"/>
  );

  return (
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
    </div>
  );
}
