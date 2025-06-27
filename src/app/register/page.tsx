import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Shield, GraduationCap } from "lucide-react";

const registrationTypes = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Participant",
    description: "Register as a young artist to submit your work and participate in the competition.",
    href: "/register/participant",
    cta: "Register as Participant",
  },
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: "Teacher / Volunteer",
    description: "Join us as a teacher or volunteer to support and guide our talented participants.",
    href: "/register/teacher",
    cta: "Register as Teacher",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Judiciary / Jury",
    description: "Apply to be a part of our esteemed jury to help us discover the next generation of artists.",
    href: "/register/jury",
    cta: "Register as Jury",
  },
];

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter">
          Join Artry
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-body">
          Select your role to begin the registration process. We're excited to have you on board!
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {registrationTypes.map((type) => (
          <Card key={type.title} className="flex flex-col text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-2">
                {type.icon}
              </div>
              <CardTitle className="font-headline">{type.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{type.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                <Button asChild className="w-full">
                    <Link href={type.href}>{type.cta}</Link>
                </Button>
            </div>
          </Card>
        ))}
      </section>
       <div className="mt-12 text-center text-sm font-body">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
        </div>
    </div>
  );
}
