import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  caption,
  className,
  height = 300,
  children,
}: {
  title: string;
  caption?: string;
  className?: string;
  height?: number;
  children: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {caption && <CardDescription>{caption}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }} className={cn("w-full")}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
