
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

type ProfileDetail = {
    icon: ReactNode;
    label: string;
}

type ProfileCardProps = {
    name: string;
    avatarUrl: string;
    description: string;
    details: ProfileDetail[];
};

export function ProfileCard({ name, avatarUrl, description, details }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="font-headline text-2xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 font-body text-sm">
        {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-2 text-muted-foreground">
                {detail.icon}
                <span>{detail.label}</span>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
