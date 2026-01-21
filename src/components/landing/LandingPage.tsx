
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, CheckSquare, Trophy, Star } from "lucide-react";

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background Gradients */}
                <div className="absolute inset-0 -z-10 bg-background">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
                </div>

                <div className="container px-4 text-center space-y-8">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            ✨ Phiên bản 2.1 - Social for Builders
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent pb-2">
                            Xây Dựng. Kết Nối. <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Thăng Tiến Sự Nghiệp</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-[700px] mx-auto leading-relaxed">
                            Không gian dành riêng cho Makers và Builders. Quản lý bản thân, tích lũy kinh nghiệm và mở khóa những kiến thức giá trị.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <Button size="lg" className="text-lg px-8 h-12 w-full sm:w-auto rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" asChild>
                            <Link href="/auth">
                                Tham Gia Ngay <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-12 w-full sm:w-auto rounded-full backdrop-blur-sm hover:bg-muted/50" asChild>
                            <Link href="#features">
                                Tìm Hiểu Thêm
                            </Link>
                        </Button>
                    </div>

                    {/* Dashboard Preview / Abstract UI */}
                    <div className="w-full max-w-5xl mx-auto mt-20 relative">
                        <div className="relative rounded-xl border bg-card/50 backdrop-blur shadow-2xl overflow-hidden p-2 sm:p-4">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                {/* Abstract Card 1: Features */}
                                <div className="space-y-4 p-4 rounded-lg bg-background/60 border shadow-sm">
                                    <div className="h-2 w-20 bg-primary/20 rounded-full" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-muted rounded-md" />
                                        <div className="h-4 w-2/3 bg-muted rounded-md" />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                            <CheckSquare className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                            <Book className="h-4 w-4 text-orange-500" />
                                        </div>
                                    </div>
                                </div>
                                {/* Abstract Card 2: Main Content */}
                                <div className="hidden md:block md:col-span-2 space-y-4 p-4 rounded-lg bg-background/80 border border-primary/10 shadow-md">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600" />
                                            <div className="h-3 w-32 bg-muted rounded-full" />
                                        </div>
                                        <div className="h-6 w-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center text-xs font-bold border border-yellow-500/20">Level 5</div>
                                    </div>
                                    <div className="h-24 w-full bg-muted/50 rounded-lg border border-dashed border-muted-foreground/20" />
                                    <div className="flex justify-between pt-2">
                                        <div className="h-3 w-20 bg-muted/50 rounded-full" />
                                        <div className="h-3 w-10 bg-muted/50 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-muted/30 relative">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Công cụ phát triển bản thân</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Tích hợp các công cụ giúp bạn duy trì thói quen tốt và tập trung vào mục tiêu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Book className="h-8 w-8 text-orange-500" />}
                            title="Nhật Ký Phát Triển"
                            description="Ghi lại những bài học, thất bại và suy ngẫm hàng ngày. Giúp bạn nhìn lại hành trình và trưởng thành hơn."
                            badge="Focus"
                        />
                        <FeatureCard
                            icon={<CheckSquare className="h-8 w-8 text-blue-500" />}
                            title="Todo List Tối Giản"
                            description="Quản lý công việc cần làm cực nhanh. Giao diện sạch sẽ, loại bỏ xao nhãng để bạn Get Things Done."
                            badge="Productivity"
                        />
                        <FeatureCard
                            icon={<Trophy className="h-8 w-8 text-yellow-500" />}
                            title="Hệ Thống Thăng Cấp"
                            description="Mỗi hành động tích cực đều được ghi nhận. Tích lũy XP để tăng Level và mở khóa nội dung chất lượng cao."
                            badge="Gamification"
                        />
                    </div>
                </div>
            </section>

            {/* Gamification Detail Section */}
            <section className="py-24 px-4">
                <div className="container max-w-5xl mx-auto">
                    <div className="bg-card border rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-yellow-500 font-semibold bg-yellow-500/10 px-3 py-1 rounded-full text-sm">
                                    <Star className="h-4 w-4 fill-current" />
                                    Hệ thống Level & XP
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold">Thăng hạng để nhận quyền lợi</h2>
                                <p className="text-lg text-muted-foreground">
                                    Tại Vietnam Social, chất lượng được ưu tiên hàng đầu. Bạn cần đóng góp cho cộng đồng để thăng hạng (Level Up).
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-primary">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Tích điểm (XP)</h4>
                                            <p className="text-sm text-muted-foreground">Nhận XP khi hoàn thành Todo, viết Nhật ký, hoặc chia sẻ bài viết hay.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-primary">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Bảo chứng kỹ năng</h4>
                                            <p className="text-sm text-muted-foreground">Level thể hiện độ uy tín và đóng góp của bạn trong cộng đồng Builders.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-primary">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Nội dung độc quyền</h4>
                                            <p className="text-sm text-muted-foreground">Một số bài viết chuyên sâu chỉ dành cho Level cao.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Visual for Levels */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-2xl rounded-full" />
                                <div className="relative bg-background/80 backdrop-blur border rounded-2xl p-6 space-y-4 shadow-xl">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                                <Trophy className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">Builder Legend</h3>
                                                <p className="text-xs text-muted-foreground">Level 10</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold font-mono text-primary">9,850</span>
                                            <span className="text-xs text-muted-foreground ml-1">XP</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>Progress to Level 11</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 w-[85%]" />
                                        </div>
                                    </div>
                                    <div className="pt-2 grid grid-cols-2 gap-2">
                                        <div className="bg-muted/50 rounded p-2 text-center text-xs">
                                            <div className="font-bold text-foreground">Write Post</div>
                                            <div className="text-green-500">+50 XP</div>
                                        </div>
                                        <div className="bg-muted/50 rounded p-2 text-center text-xs">
                                            <div className="font-bold text-foreground">Daily Journal</div>
                                            <div className="text-green-500">+20 XP</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 text-center px-4 bg-gradient-to-b from-transparent to-muted/20">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Sẵn sàng để bứt phá?</h2>
                    <p className="text-xl text-muted-foreground">
                        Tham gia ngay hôm nay để quản lý công việc, viết nhật ký và kết nối với cộng đồng.
                    </p>
                    <Button size="lg" className="text-lg px-8 h-12 rounded-full" asChild>
                        <Link href="/auth">Đăng Ký Miễn Phí</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, badge }: { icon: React.ReactNode, title: string, description: string, badge?: string }) {
    return (
        <div className="group relative p-8 rounded-2xl bg-background border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {badge && (
                <div className="absolute top-4 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {badge}
                </div>
            )}
            <div className="h-14 w-14 rounded-xl bg-muted/50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}


