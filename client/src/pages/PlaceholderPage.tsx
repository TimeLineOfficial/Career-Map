import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction, ArrowLeft, Mail, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function PlaceholderPage({
  title,
  description,
  icon: Icon = Construction,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 -m-8">
            <div
              className="absolute top-0 left-1/4 w-2 h-2 bg-career-primary rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-1/4 right-1/4 w-1 h-1 bg-career-secondary rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-career-accent rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-0 right-1/3 w-1 h-1 bg-career-primary rounded-full animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <Card className="relative border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-br from-career-primary to-career-secondary text-white">
                  <Icon className="h-12 w-12" />
                </div>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-bold text-center">
                {title}
              </CardTitle>

              <CardDescription className="text-lg text-center max-w-md mx-auto">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Lightbulb className="h-5 w-5 text-career-accent" />
                  <span className="font-medium">
                    We're working hard to bring you this feature!
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  This section is currently under development. Our team is
                  building amazing features to help you navigate your career and
                  business journey. Stay tuned for updates!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Homepage
                  </Button>
                </Link>

                <Button className="gap-2 bg-gradient-to-r from-career-primary to-career-secondary">
                  <Mail className="h-4 w-4" />
                  Notify Me When Ready
                </Button>
              </div>

              <div className="border-t pt-6">
                <p className="text-xs text-muted-foreground text-center">
                  Want to see a specific feature prioritized?
                  <br />
                  <span className="text-career-primary font-medium cursor-pointer hover:underline">
                    Let us know what you need most
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress indication */}
        <div className="flex items-center justify-center gap-2">
          <div className="text-xs text-muted-foreground">
            Development Progress:
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-career-primary"></div>
            <div className="w-2 h-2 rounded-full bg-career-primary"></div>
            <div className="w-2 h-2 rounded-full bg-career-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <div className="w-2 h-2 rounded-full bg-muted"></div>
          </div>
          <div className="text-xs text-muted-foreground">60%</div>
        </div>
      </div>
    </div>
  );
}
