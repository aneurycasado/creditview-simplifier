import { useState } from "react";
import { CreditScoreCard } from "@/components/CreditScoreCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { analyzeCreditReport } from "@/utils/claude";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const mockCategories = [
    {
      title: "Payment Activity",
      status: "good" as const,
      details: ["100% on-time payments for the last 24 months", "No late payments recorded"],
    },
    {
      title: "Utilization",
      status: "warning" as const,
      details: ["Current utilization: 35%", "Recommended: Keep below 30%"],
    },
    {
      title: "Paying Down Debt",
      status: "good" as const,
      details: ["Decreased total debt by $5,000", "Consistent monthly payments"],
    },
    {
      title: "Recent Activity",
      status: "warning" as const,
      details: ["2 new credit inquiries", "1 new account opened"],
    },
    {
      title: "Payment History",
      status: "good" as const,
      details: ["98% overall payment history", "Strong payment pattern established"],
    },
  ];

  const [categories, setCategories] = useState(mockCategories);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const analysis = await analyzeCreditReport(text);
      
      if (analysis.error) {
        throw new Error(analysis.error);
      }

      // Parse the response and update categories
      const parsedAnalysis = JSON.parse(analysis.content[0]);
      const newCategories = Object.entries(parsedAnalysis).map(([title, details]) => ({
        title,
        status: "good" as const, // You might want to add logic to determine status
        details: details as string[],
      }));

      setCategories(newCategories);
      toast({
        title: "Success",
        description: "Credit report analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze report",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png"
            className="max-w-md"
          />
          <Button onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Analyzing..." : "Analyze Report"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <CreditScoreCard score={785} change={15} />
          </div>
          
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              status={category.status}
              details={category.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;