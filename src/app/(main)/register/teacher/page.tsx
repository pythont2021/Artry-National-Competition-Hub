
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { registerTeacher } from "./actions";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  referralCode: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export default function TeacherRegisterPage() {
  const { toast } = useToast();

  const generateReferralCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const [referralCode, setReferralCode] = useState(generateReferralCode());
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      referralCode: referralCode,
      password: "",
      confirmPassword: "",
      terms: false,
    },
    values: { // set initial value
        referralCode: referralCode,
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        terms: false,
    }
  });

  const { isSubmitting } = form.formState;

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
    });
    
    const result = await registerTeacher(formData);

    if (result?.error) {
       toast({
        variant: "destructive",
        title: "Registration Failed",
        description: result.error,
      });
    }
  };

  const handleGenerateCode = () => {
      const newCode = generateReferralCode();
      setReferralCode(newCode);
      form.setValue("referralCode", newCode);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    toast({ description: "Referral code copied to clipboard!" });
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <User className="h-6 w-6" />
            </div>
          <CardTitle className="font-headline text-3xl">Teacher / Volunteer Registration</CardTitle>
          <CardDescription>Join our community to support young artists.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Anita Desai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                <FormField
                    control={form.control}
                    name="referralCode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Your Unique Referral Code</FormLabel>
                        <div className="flex gap-2">
                            <FormControl>
                                <Input readOnly {...field} />
                            </FormControl>
                            <Button type="button" variant="secondary" onClick={copyToClipboard} size="icon" aria-label="Copy code">
                                <Copy className="h-4 w-4"/>
                            </Button>
                            <Button type="button" variant="outline" onClick={handleGenerateCode} size="icon" aria-label="Generate new code">
                                <RefreshCw className="h-4 w-4"/>
                            </Button>
                        </div>
                        <FormDescription>Share this code with participants.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Accept terms and conditions
                      </FormLabel>
                      <FormDescription>
                        You agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
