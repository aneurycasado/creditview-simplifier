import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  title: string;
  status: "good" | "warning" | "bad";
  details: string[];
}

export const CategoryCard = ({ title, status, details }: CategoryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-success-DEFAULT";
      case "warning":
        return "bg-warning-DEFAULT";
      case "bad":
        return "bg-destructive-DEFAULT";
      default:
        return "bg-primary-DEFAULT";
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge className={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {detail}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};