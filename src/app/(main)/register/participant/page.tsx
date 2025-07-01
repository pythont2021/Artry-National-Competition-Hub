
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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
import { Calendar as CalendarIcon, GraduationCap, Upload, Image as ImageIcon, XCircle, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      { value: "ap", label: "Board of Secondary Education, Andhra Pradesh" },
      { value: "ar", label: "Directorate of School Education, Arunachal Pradesh" },
      { value: "as", label: "Board of Secondary Education, Assam (SEBA)" },
      { value: "br", label: "Bihar School Examination Board (BSEB)" },
      { value: "cg", label: "Chhattisgarh Board of Secondary Education (CGBSE)" },
      { value: "ga", label: "Goa Board of Secondary & Higher Secondary Education" },
      { value: "gj", label: "Gujarat Secondary & Higher Secondary Education Board (GSEB)" },
      { value: "hr", label: "Board of School Education Haryana (BSEH)" },
      { value: "hp", label: "Himachal Pradesh Board of School Education (HPBOSE)" },
      { value: "jk", label: "Jammu and Kashmir State Board of School Education (JKBOSE)" },
      { value: "jh", label: "Jharkhand Academic Council (JAC)" },
      { value: "ka", label: "Karnataka School Examination and Assessment Board (KSEAB)" },
      { value: "kl", label: "Kerala Board of Public Examinations (KBPE)" },
      { value: "mp", label: "Board of Secondary Education, Madhya Pradesh (MPBSE)" },
      { value: "mh", label: "Maharashtra State Board of Secondary & Higher Secondary Education" },
      { value: "mn", label: "Board of Secondary Education, Manipur (BSEM)" },
      { value: "ml", label: "Meghalaya Board of School Education (MBOSE)" },
      { value: "mz", label: "Mizoram Board of School Education (MBSE)" },
      { value: "nl", label: "Nagaland Board of School Education (NBSE)" },
      { value: "od", label: "Board of Secondary Education, Odisha" },
      { value: "pb", label: "Punjab School Education Board (PSEB)" },
      { value: "rj", label: "Board of Secondary Education, Rajasthan (BSER)" },
      { value: "sk", label: "Sikkim Board of Secondary Education" },
      { value: "tn", label: "Directorate of Government Examinations, Tamil Nadu" },
      { value: "ts", label: "Board of Secondary Education, Telangana (BSE Telangana)" },
      { value: "tr", label: "Tripura Board of Secondary Education (TBSE)" },
      { value: "up", label: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)" },
      { value: "uk", label: "Uttarakhand Board of School Education (UBSE)" },
      { value: "wb", label: "West Bengal Board of Secondary Education (WBBSE)" },
    ]
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
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
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
  profilePhoto: z.any().refine((file) => file, {
    message: "Profile photo is required.",
  }),
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
    if (age < 18) {
      return !!data.email && data.email.length > 0;
    }
    return true;
  },
  {
    message: "A parent's or guardian's email is required for participants under 18.",
    path: ["email"],
  }
)
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
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
      profilePhoto: undefined,
      referralCode: "",
    },
  });
  
  const dob = form.watch("dob");
  const photo = form.watch("profilePhoto");

  useEffect(() => {
    if (dob) {
      const calculatedAge = differenceInYears(new Date(), dob);
      let group = "";
      // Reset category choice on DOB change
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

  useEffect(() => {
      if (photo && photo.name) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(photo);
      } else {
        setProfilePhotoPreview(null);
      }
    }, [photo])


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
                        A parent's email is required for participants under 18.
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
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <div className="flex items-center gap-4">
                      <Dialog>
                          <DialogTrigger asChild>
                              <Button type="button" variant="outline">
                                  <Upload className="mr-2 h-4 w-4" />
                                  {profilePhotoPreview ? "Change Photo" : "Upload Photo"}
                              </Button>
                          </DialogTrigger>
                          <DialogContent>
                              <DialogHeader>
                                  <DialogTitle>Upload Profile Photo</DialogTitle>
                                  <DialogDescription>
                                      Please upload a clear, high-resolution headshot. HD images are preferred. Blurry images may be rejected.
                                  </DialogDescription>
                              </DialogHeader>
                              <div className="flex flex-col items-center gap-4 py-4">
                                  <div className="w-48 h-48 rounded-full border-2 border-dashed flex items-center justify-center bg-muted/50 overflow-hidden">
                                      {profilePhotoPreview ? (
                                            <Image src={profilePhotoPreview} alt="Profile preview" width={192} height={192} className="object-cover w-full h-full" />
                                      ) : (
                                          <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                      )}
                                  </div>
                                  <FormControl>
                                    <Input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden"
                                      ref={fileInputRef}
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            if (!file.type.startsWith('image/')) {
                                                toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload an image file.'});
                                                return;
                                            }
                                            field.onChange(file);
                                        }
                                      }} />
                                  </FormControl>
                                  <Button type="button" onClick={() => fileInputRef.current?.click()}>Choose File</Button>
                                  <Alert variant="destructive" className="hidden" data-ai-hint="blurry image warning">
                                      <AlertTitle>Image Quality Low</AlertTitle>
                                      <AlertDescription>
                                          This image appears to be blurry. Please upload a clearer photo.
                                      </AlertDescription>
                                  </Alert>
                              </div>
                               <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                  Your profile photo will be used for upcoming certifications, awards, and achievements.
                                </AlertDescription>
                              </Alert>
                              <DialogFooter className="pt-4">
                                  <DialogClose asChild>
                                      <Button type="button">Done</Button>
                                  </DialogClose>
                              </DialogFooter>
                          </DialogContent>
                      </Dialog>

                      {profilePhotoPreview && (
                          <div className="flex items-center gap-2">
                              <Image src={profilePhotoPreview} alt="Profile thumbnail" width={40} height={40} className="rounded-full object-cover" />
                              <span className="text-sm text-muted-foreground truncate max-w-xs">{photo?.name}</span>

                              <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                      field.onChange(null);
                                      if (fileInputRef.current) {
                                        fileInputRef.current.value = "";
                                      }
                                      setProfilePhotoPreview(null);
                                  }}>
                                    <XCircle className="h-4 w-4" />
                              </Button>
                          </div>
                      )}
                    </div>
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

              <Button type="submit" className="w-full" size="lg">Create Account</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    