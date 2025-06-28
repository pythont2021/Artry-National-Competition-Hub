import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, GraduationCap, School } from "lucide-react";

type ProfileCardProps = {
    name: string;
    avatarUrl: string;
    category: string;
    school: string;
};

export function ProfileCard({ name, avatarUrl, category, school }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="font-headline text-2xl">{name}</CardTitle>
          <CardDescription>Participant Profile</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 font-body text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{category}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>Class 10</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
            <School className="h-4 w-4" />
            <span>{school}</span>
        </div>
      </CardContent>
    </Card>
  );
}
