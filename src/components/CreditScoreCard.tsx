import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CreditScoreCardProps {
  score: number;
  change?: number;
}

export const CreditScoreCard = ({ score, change }: CreditScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 740) return "text-success-DEFAULT";
    if (score >= 670) return "text-primary-DEFAULT";
    if (score >= 580) return "text-warning-DEFAULT";
    return "text-destructive-DEFAULT";
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
        {change && (
          <span className={change >= 0 ? "text-success-DEFAULT" : "text-destructive-DEFAULT"}>
            {change > 0 ? "+" : ""}{change} pts
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-4">
          <span className={getScoreColor(score)}>{score}</span>
        </div>
        <Progress value={(score / 850) * 100} className="h-2" />
      </CardContent>
    </Card>
  );
};