
"use client";

import { useEffect, useActionState, Suspense } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn } from "lucide-react";
import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";


const otpFormSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
});

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? 'Logging in...' : 'Login with Password'}
    </Button>
  );
}

function LoginMessages() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'logout-success') {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  }, [searchParams, toast]);

  return null;
}

export default function LoginPage() {
  const { toast } = useToast();
  
  const [state, formAction] = useActionState(login, undefined);

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      mobile: "",
    },
  });

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.error,
      });
    }
  }, [state, toast]);
  
  function onOtpSubmit(values: z.infer<typeof otpFormSchema>) {
    console.log("OTP login:", values);
    toast({
      title: "OTP Sent",
      description: "Check your mobile for the one-time password.",
    });
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginMessages />
      </Suspense>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <LogIn className="h-6 w-6" />
            </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Artry account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
              <form action={formAction} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="name@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" placeholder="••••••••" type="password" required />
                </div>
                <LoginButton />
              </form>
            </TabsContent>
            <TabsContent value="otp">
               <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6 pt-4">
                  <FormField
                    control={otpForm.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Send OTP
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center text-sm font-body">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm">View Mock User Credentials</AccordionTrigger>
                <AccordionContent>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p><b>Enrolled Participant:</b><br/>participant@artry.com / participant123</p>
                    <p><b>Unenrolled Participant:</b><br/>unenrolled@artry.com / unenrolled123</p>
                    <p><b>Unenrolled Artist:</b><br/>artist@artry.com / artist123</p>
                    <p><b>Enrolled Artist:</b><br/>enrolled-artist@artry.com / artist123</p>
                    <p><b>Audience:</b><br/>audience@artry.com / audience123</p>
                    <p><b>Volunteer:</b><br/>volunteer@artry.com / volunteer123</p>
                    <p><b>Jury:</b><br/>jury@artry.com / jury123</p>
                    <p><b>Vendor:</b><br/>vendor@artry.com / vendor123</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
}
