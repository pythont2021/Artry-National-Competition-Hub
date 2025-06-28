import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, FileDown, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const achievements = [
    {
        type: 'Winner',
        title: 'Level 1 Winner',
        description: 'Awarded for outstanding performance in the "Traditional Painting" category.',
        date: 'August 2024',
        icon: <Trophy className="h-8 w-8 text-yellow-500" />,
        action: {
            label: 'Download Certificate',
            icon: <FileDown className="h-4 w-4" />
        }
    },
    {
        type: 'Participation',
        title: 'Participation Certificate',
        description: 'Certificate for participating in the Artry National Competition 2023.',
        date: 'September 2023',
        icon: <Award className="h-8 w-8 text-primary" />,
        action: {
            label: 'Download Certificate',
            icon: <FileDown className="h-4 w-4" />
        }
    }
];

export function AchievementsSection() {
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
                <Image src="https://placehold.co/150x100.png" alt="Winner Memento" width={150} height={100} data-ai-hint="trophy award" className="rounded-md" />
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
