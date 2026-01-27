import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, MessageSquare, Share2 } from "lucide-react";

interface PostActionsProps {
    likes: number;
    commentsCount: number;
    isLiked: boolean;
    onToggleLike: () => void;
    onToggleComments: () => void;
}

export function PostActions({ likes, commentsCount, isLiked, onToggleLike, onToggleComments }: PostActionsProps) {
    const { t } = useLanguage();

    return (
        <div className="flex w-full justify-between border-t bg-muted/20 p-2">
            <Button
                variant="ghost"
                size="sm"
                className={`flex-1 gap-2 hover:text-red-500 hover:bg-red-500/10 transition-colors ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
                onClick={onToggleLike}
            >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {likes}
            </Button>
            <Button
                variant="ghost"
                size="sm"
                className="flex-1 gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                onClick={onToggleComments}
            >
                <MessageSquare className="h-4 w-4" />
                {commentsCount}
            </Button>
            <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground bg-transparent">
                <Share2 className="h-4 w-4" />
                {t.feed.share}
            </Button>
        </div>
    );
}
