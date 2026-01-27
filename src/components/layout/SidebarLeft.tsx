"use client";

import { Button } from "@/components/ui/button";
import { Lock, Home, Hash, MessageCircle, BookOpen, CheckSquare, NotebookPen, Users } from "lucide-react";
import { RPG_CLASSES, SPACES } from "@/data/mock";
import Link from "next/link";
import { useGamification } from "@/context/GamificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname } from "next/navigation";

export function SidebarLeft() {
    const { level } = useGamification();
    const { t } = useLanguage();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="space-y-6 pb-4">
            <div className="space-y-1">
                <Button
                    variant={isActive("/") ? "secondary" : "ghost"}
                    className={`w-full justify-start font-medium transition-all duration-200 ${isActive("/")
                            ? "bg-primary/10 text-primary border-l-2 border-primary rounded-none rounded-r-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    asChild
                >
                    <Link href="/">
                        <Users className={`mr-2 h-4 w-4 ${isActive("/") ? "text-primary" : "text-muted-foreground"}`} />
                        {t.nav.community}
                    </Link>
                </Button>
                <Button
                    variant={isActive("/journal") ? "secondary" : "ghost"}
                    className={`w-full justify-start font-medium transition-all duration-200 ${isActive("/journal")
                            ? "bg-primary/10 text-primary border-l-2 border-primary rounded-none rounded-r-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    asChild
                >
                    <Link href="/journal">
                        <NotebookPen className={`mr-2 h-4 w-4 ${isActive("/journal") ? "text-primary" : "text-muted-foreground"}`} />
                        {t.nav.myJournal}
                    </Link>
                </Button>
                <Button
                    variant={isActive("/todos") ? "secondary" : "ghost"}
                    className={`w-full justify-start font-medium transition-all duration-200 ${isActive("/todos")
                            ? "bg-primary/10 text-primary border-l-2 border-primary rounded-none rounded-r-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    asChild
                >
                    <Link href="/todos">
                        <CheckSquare className={`mr-2 h-4 w-4 ${isActive("/todos") ? "text-primary" : "text-muted-foreground"}`} />
                        {t.nav.todoList}
                    </Link>
                </Button>
                <Button
                    variant={isActive("/messages") ? "secondary" : "ghost"}
                    className={`w-full justify-start font-medium transition-all duration-200 ${isActive("/messages")
                            ? "bg-primary/10 text-primary border-l-2 border-primary rounded-none rounded-r-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    asChild
                >
                    <Link href="/messages">
                        <MessageCircle className={`mr-2 h-4 w-4 ${isActive("/messages") ? "text-primary" : "text-muted-foreground"}`} />
                        {t.nav.messages}
                    </Link>
                </Button>
            </div>

            <div>
                <Button
                    variant={isActive("/courses") ? "secondary" : "ghost"}
                    className={`w-full justify-start font-medium transition-all duration-200 ${isActive("/courses")
                            ? "bg-primary/10 text-primary border-l-2 border-primary rounded-none rounded-r-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                    asChild
                >
                    <Link href="/courses">
                        <BookOpen className={`mr-2 h-4 w-4 ${isActive("/courses") ? "text-primary" : "text-muted-foreground"}`} />
                        {t.nav.courses}
                    </Link>
                </Button>
            </div>



        </div>
    )
}
