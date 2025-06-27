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
import { Calendar as CalendarIcon, GraduationCap, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";

const schools = [
  { value: "delhi-public-school", label: "Delhi Public School" },
  { value: "kendriya-vidyalaya", label: "Kendriya Vidyalaya" },
  { value: "dav-public-school", label: "DAV Public School" },
  { value: "the-shriram-school", label: "The Shriram School" },
  { value: "bombay-scottish-school", label: "Bombay Scottish School" },
];

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
    heading: "Andhra Pradesh",
    options: [
      { value: "bieap-ap", label: "Board of Intermediate Education, Andhra Pradesh (BIEAP)" },
      { value: "bseap-ap", label: "Board of Secondary Education, Andhra Pradesh (BSEAP)" },
    ],
  },
  {
    heading: "Arunachal Pradesh",
    options: [
        { value: "dse-arunachal", label: "Directorate of School Education, Arunachal Pradesh" },
    ],
  },
  {
    heading: "Assam",
    options: [
      { value: "seba-assam", label: "Board of Secondary Education, Assam (SEBA)" },
      { value: "ahsec-assam", label: "Assam Higher Secondary Education Council (AHSEC)" },
    ],
  },
  {
    heading: "Bihar",
    options: [
        { value: "bseb-bihar", label: "Bihar School Examination Board (BSEB)" },
    ],
  },
  {
    heading: "Chhattisgarh",
    options: [
        { value: "cgbse-chhattisgarh", label: "Chhattisgarh Board of Secondary Education (CGBSE)" },
    ],
  },
  {
    heading: "Goa",
    options: [
        { value: "gbshse-goa", label: "Goa Board of Secondary and Higher Secondary Education (GBSHSE)" },
    ],
  },
  {
    heading: "Gujarat",
    options: [
        { value: "gseb-gujarat", label: "Gujarat Secondary and Higher Secondary Education Board (GSHSEB or GSEB)" },
    ],
  },
  {
    heading: "Haryana",
    options: [
        { value: "bseh-haryana", label: "Board of School Education Haryana (BSEH or HBSE)" },
    ],
  },
  {
    heading: "Himachal Pradesh",
    options: [
        { value: "hpbose-himachal", label: "Himachal Pradesh Board of School Education (HPBOSE)" },
    ],
  },
  {
    heading: "Jammu & Kashmir",
    options: [
        { value: "jkbose-jk", label: "Jammu and Kashmir Board of School Education (JKBOSE)" },
    ],
  },
  {
    heading: "Jharkhand",
    options: [
        { value: "jac-jharkhand", label: "Jharkhand Academic Council (JAC)" },
    ],
  },
  {
    heading: "Karnataka",
    options: [
      { value: "kseeb-karnataka", label: "Karnataka Secondary Education Examination Board (KSEEB)" },
      { value: "dpue-karnataka", label: "Department of Pre-University Education (DPUE)" },
    ],
  },
  {
    heading: "Kerala",
    options: [
      { value: "kbpe-kerala", label: "Kerala Board of Public Examinations (KBPE)" },
      { value: "dhse-kerala", label: "Directorate of Higher Secondary Education (DHSE)" },
    ],
  },
  {
    heading: "Madhya Pradesh",
    options: [
        { value: "mpbse-mp", label: "Board of Secondary Education, Madhya Pradesh (MPBSE)" },
    ],
  },
  {
    heading: "Maharashtra",
    options: [
        { value: "msbshse-maharashtra", label: "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)" },
    ],
  },
  {
    heading: "Manipur",
    options: [
      { value: "bsem-manipur", label: "Board of Secondary Education, Manipur (BSEM)" },
      { value: "cohsem-manipur", label: "Council of Higher Secondary Education, Manipur (COHSEM)" },
    ],
  },
  {
    heading: "Meghalaya",
    options: [
        { value: "mbose-meghalaya", label: "Meghalaya Board of School Education (MBOSE)" },
    ],
  },
  {
    heading: "Mizoram",
    options: [
        { value: "mbse-mizoram", label: "Mizoram Board of School Education (MBSE)" },
    ],
  },
  {
    heading: "Nagaland",
    options: [
        { value: "nbse-nagaland", label: "Nagaland Board of School Education (NBSE)" },
    ],
  },
  {
    heading: "Odisha",
    options: [
      { value: "bse-odisha", label: "Board of Secondary Education, Odisha (BSE Odisha)" },
      { value: "chse-odisha", label: "Council of Higher Secondary Education, Odisha (CHSE Odisha)" },
    ],
  },
  {
    heading: "Punjab",
    options: [
        { value: "pseb-punjab", label: "Punjab School Education Board (PSEB)" },
    ],
  },
  {
    heading: "Rajasthan",
    options: [
        { value: "rbse-rajasthan", label: "Board of Secondary Education, Rajasthan (RBSE)" },
    ],
  },
  {
    heading: "Sikkim",
    options: [
        { value: "sbse-sikkim", label: "Sikkim Board of Secondary Education (SBSE)" },
    ],
  },
  {
    heading: "Tamil Nadu",
    options: [
        { value: "tndge-tamilnadu", label: "Directorate of Government Examinations, Tamil Nadu (TNDGE)" },
    ],
  },
  {
    heading: "Telangana",
    options: [
      { value: "tsbie-telangana", label: "Board of Intermediate Education, Telangana (TSBIE)" },
      { value: "bse-telangana", label: "Board of Secondary Education, Telangana (BSE Telangana)" },
    ],
  },
  {
    heading: "Tripura",
    options: [
        { value: "tbse-tripura", label: "Tripura Board of Secondary Education (TBSE)" },
    ],
  },
  {
    heading: "Uttar Pradesh",
    options: [
        { value: "upmsp-up", label: "Uttar Pradesh Board of High School and Intermediate Education (UPMSP)" },
    ],
  },
  {
    heading: "Uttarakhand",
    options: [
        { value: "ubse-uttarakhand", label: "Uttarakhand Board of School Education (UBSE)" },
    ],
  },
  {
    heading: "West Bengal",
    options: [
      { value: "wbbse-wb", label: "West Bengal Board of Secondary Education (WBBSE)" },
      { value: "wbchse-wb", label: "West Bengal Council of Higher Secondary Education (WBCHSE)" },
    ],
  },
  {
    heading: "Other / Open Boards",
    options: [
      { value: "ignou", label: "Indira Gandhi National Open University (IGNOU)" },
      { value: "dr-ambedkar-ou", label: "Dr. Ambedkar Open University" },
    ],
  },
];


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  school: z.string({ required_error: "Please select a school." }),
  grade: z.string().min(1, { message: "Class/Grade is required." }),
  board: z.string({ required_error: "Please select a board." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  altContact: z.string().optional(),
  profilePhoto: z.any().optional(),
  achievements: z.any().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ParticipantRegisterPage() {
  const { toast } = useToast();
  const [age, setAge] = useState<number | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      school: undefined,
      grade: "",
      board: undefined,
      address: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  
  const dob = form.watch("dob");

  useEffect(() => {
    if (dob) {
      const calculatedAge = differenceInYears(new Date(), dob);
      setAge(calculatedAge);
      if (calculatedAge >= 10 && calculatedAge <= 14) {
        setAgeGroup("10-14 years");
      } else if (calculatedAge >= 15 && calculatedAge <= 18) {
        setAgeGroup("15-18 years");
      } else if (calculatedAge >= 19 && calculatedAge <= 22) {
        setAgeGroup("19-22 years");
      } else {
        setAgeGroup("Not in eligible age range");
      }
    }
  }, [dob]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Registration Successful",
      description: "Your account has been created. Welcome, artist!",
    });
  }

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Priya Sharma" {...field} />
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
                      <FormLabel>Mobile Number (for OTP)</FormLabel>
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
                      <FormDescription>
                        {age !== null && `You are ${age} years old.`} {ageGroup && `(${ageGroup})`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>School/College</FormLabel>
                       <Combobox options={schools} placeholder="Search school..." emptyMessage="No school found." {...field} />
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

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="profilePhoto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Photo (Optional)</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Achievements (Optional)</FormLabel>
                      <FormControl>
                        <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => field.onChange(e.target.files?.[0])} />
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

              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
