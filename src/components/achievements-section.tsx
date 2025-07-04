import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FileDown, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ReactNode } from "react";

type Achievement = {
    type: string;
    title: string;
    description: string;
    date: string;
    icon: ReactNode;
    action?: {
        label: string;
        icon: ReactNode;
    };
}

interface AchievementsSectionProps {
    achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {achievements.map((achievement) => (
            <div key={achievement.title} className="flex items-start gap-4">
              <div className="p-2 bg-muted rounded-full">
                  {achievement.icon}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                    </div>
                     {achievement.action && (
                        <Button variant="outline" size="sm">
                            {achievement.action.icon}
                            {achievement.action.label}
                        </Button>
                    )}
                </div>
              </div>
            </div>
          ))}
           <div className="flex items-start gap-4 p-4 border-2 border-dashed rounded-lg bg-muted/50">
                <Image src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg" alt="Winner Memento" width={150} height={100} data-ai-hint="trophy award" className="rounded-md object-cover" />
                <div className="flex-grow">
                    <h3 className="font-semibold">Winner's Memento</h3>
                    <p className="text-sm text-muted-foreground">A snapshot from the Level 1 offline awards ceremony. Congratulations!</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
