import { BookOpen } from "lucide-react";

export default function CoursesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
            <div className="bg-secondary/20 p-6 rounded-full mb-6">
                <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">Community Courses</h1>
            <p className="text-muted-foreground text-lg max-w-[500px] mb-8">
                Knowledge sharing and premium courses are coming soon to Vietnam Social.
                Stay tuned for updates!
            </p>
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 text-sm text-foreground/80">
                Are you a content creator? <span className="font-semibold text-primary">Contact Admin</span> to become an instructor.
            </div>
        </div>
    )
}
