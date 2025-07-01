
"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { login } from "./actions";


const otpFormSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
});

function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
      {isPending ? 'Logging in...' : 'Login with Password'}
    </Button>
  );
}

function LoginMessages() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const message = searchParams.get('message');
    const error = searchParams.get('error');
    if (message === 'logout-success') {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
     if (message === 'registration-success') {
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
    }
    if(error) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Could not authenticate user. Please try again.",
        });
    }
  }, [searchParams, toast]);

  return null;
}

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      mobile: "",
    },
  });
  
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    setIsPending(false);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: result.error,
      });
    } else if (result?.success && result.redirectTo) {
      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });
      router.push(result.redirectTo);
    }
  };

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
              <form onSubmit={handleLoginSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="name@example.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" placeholder="••••••••" type="password" required />
                </div>
                <LoginButton isPending={isPending} />
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
      </Card>
    </div>
  );
}
