
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format, differenceInYears } from "date-fns";
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
import { Calendar as CalendarIcon, GraduationCap, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { registerParticipant } from "./actions";

const boards = [
  {
    heading: "National Boards",
    options: [
      { value: "cbse", label: "Central Board of Secondary Education (CBSE)" },
      { value: "cisce-icse", label: "Council for the Indian School Certificate Examinations (CISCE) - ICSE" },
      { value: "cisce-isc", label: "Council for the Indian School Certificate Examinations (CISCE) - ISC" },
      { value: "nios", label: "National Institute of Open Schooling (NIOS)" },
    ],
  },
  {
    heading: "State Boards",
    options: [
      { value: "bseap", label: "Board of Secondary Education, Andhra Pradesh" },
      { value: "dseap", label: "Directorate of School Education, Arunachal Pradesh" },
      { value: "seba", label: "Board of Secondary Education, Assam (SEBA)" },
      { value: "bseb", label: "Bihar School Examination Board (BSEB)" },
      { value: "cgbse", label: "Chhattisgarh Board of Secondary Education (CGBSE)" },
      { value: "gbshse", label: "Goa Board of Secondary & Higher Secondary Education" },
      { value: "gseb", label: "Gujarat Secondary & Higher Secondary Education Board (GSEB)" },
      { value: "bseh", label: "Board of School Education Haryana (BSEH)" },
      { value: "hpbose", label: "Himachal Pradesh Board of School Education (HPBOSE)" },
      { value: "jkbose", label: "Jammu and Kashmir State Board of School Education (JKBOSE)" },
      { value: "jac", label: "Jharkhand Academic Council (JAC)" },
      { value: "kseab", label: "Karnataka School Examination and Assessment Board (KSEAB)" },
      { value: "kbpe", label: "Kerala Board of Public Examinations (KBPE)" },
      { value: "mpbse", label: "Board of Secondary Education, Madhya Pradesh (MPBSE)" },
      { value: "msbshse", label: "Maharashtra State Board of Secondary & Higher Secondary Education" },
      { value: "bsem", label: "Board of Secondary Education, Manipur (BSEM)" },
      { value: "mbose", label: "Meghalaya Board of School Education (MBOSE)" },
      { value: "mbse", label: "Mizoram Board of School Education (MBSE)" },
      { value: "nbse", label: "Nagaland Board of School Education (NBSE)" },
      { value: "bseodisha", label: "Board of Secondary Education, Odisha" },
      { value: "pseb", label: "Punjab School Education Board (PSEB)" },
      { value: "bser", label: "Board of Secondary Education, Rajasthan (BSER)" },
      { value: "sbse", label: "Sikkim Board of Secondary Education" },
      { value: "dge", label: "Directorate of Government Examinations, Tamil Nadu" },
      { value: "bsetg", label: "Board of Secondary Education, Telangana (BSE Telangana)" },
      { value: "tbse", label: "Tripura Board of Secondary Education (TBSE)" },
      { value: "upmsp", label: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)" },
      { value: "ubse", label: "Uttarakhand Board of School Education (UBSE)" },
      { value: "wbbse", label: "West Bengal Board of Secondary Education (WBBSE)" },
    ],
  },
  {
    heading: "Other / Open Boards",
    options: [
      { value: "other", label: "Other" },
    ],
  },
];

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  ageGroup: z.string().optional(),
  participantCategory: z.string({required_error: "Participant category is required."}),
  board: z.string({ required_error: "Please select a board." }),
  school: z.string().min(1, { message: "School/College is required." }),
  grade: z.string().min(1, { message: "Class/Grade is required." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  altContact: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }).optional().or(z.literal('')),
  referralCode: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.refine(
  (data) => {
    if (!data.dob) return true;
    const age = differenceInYears(new Date(), data.dob);
    if (age >= 18) { // Age 18+ must make a category choice
      return !!data.participantCategory;
    }
    return true;
  },
  {
    message: "Please select a participant category.",
    path: ["participantCategory"],
  }
);


export default function ParticipantRegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [showCategoryChoice, setShowCategoryChoice] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      altContact: "",
      school: "",
      grade: "",
      board: undefined,
      address: "",
      password: "",
      confirmPassword: "",
      terms: false,
      ageGroup: "Select date of birth to see age group.",
      participantCategory: undefined,
      referralCode: "",
    },
  });
  
  const { isSubmitting } = form.formState;

  const processForm = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    const result = await registerParticipant(formData);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: result.error,
      });
    } else if (result?.success) {
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
      router.push('/login?message=registration-success');
    }
  };

  const dob = form.watch("dob");

  useEffect(() => {
    if (dob) {
      const calculatedAge = differenceInYears(new Date(), dob);
      let group = "";
      setShowCategoryChoice(false);
      form.setValue("participantCategory", undefined);
      form.clearErrors("participantCategory");

      if (calculatedAge >= 18) {
        setShowCategoryChoice(true);
        group = "Please select your category below.";
      } else {
        setShowCategoryChoice(false);
        if (calculatedAge >= 9 && calculatedAge <= 12) {
          group = "Junior (9-12 years)";
          form.setValue("participantCategory", "junior");
        } else if (calculatedAge >= 13 && calculatedAge <= 17) {
          group = "Intermediate (13-17 years)";
          form.setValue("participantCategory", "intermediate");
        } else {
          group = "Not in eligible age range (must be 9+)";
           form.setValue("participantCategory", "ineligible");
        }
      }
      form.setValue("ageGroup", group);
    } else {
      setShowCategoryChoice(false);
      form.setValue("ageGroup", "Select date of birth to see age group.");
      form.setValue("participantCategory", undefined);
      form.clearErrors("participantCategory");
    }
  }, [dob, form]);


  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <GraduationCap className="h-6 w-6" />
            </div>
          <CardTitle className="font-headline text-3xl">Participant Registration</CardTitle>
          <CardDescription>Create your artist account to join the competition.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(processForm)();
              }} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Priya" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sharma" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                      <FormDescription>
                        For participants under 18, please use a parent's email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number (for OTP)</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1990-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              {showCategoryChoice && (
                <FormField
                  control={form.control}
                  name="participantCategory"
                  render={({ field }) => (
                    <FormItem className="space-y-3 rounded-md border p-4">
                      <FormLabel>Participant Category (Age 18+)</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                          name={field.name}
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="senior" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Senior (18-22 years)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="artist" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Artist (18+ years, experienced)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                       <Alert variant="destructive" className="mt-4">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important: 'Artist' Category</AlertTitle>
                        <AlertDescription>
                          The 'Artist' category is for experienced creators and enters the competition directly at Level 4. Please choose carefully, as changing your category later will require a new registration.
                        </AlertDescription>
                      </Alert>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                  control={form.control}
                  name="board"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Board of Education</FormLabel>
                       <Combobox options={boards} placeholder="Search board..." emptyMessage="No board found." {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/College</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Delhi Public School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class/Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12th" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location/Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Art Lane, Creativity City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="altContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternative Contact (Optional)</FormLabel>
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
                    <FormLabel>Referral Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter teacher or volunteer referral code" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>
                        If a teacher or volunteer referred you, please enter their code here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

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
