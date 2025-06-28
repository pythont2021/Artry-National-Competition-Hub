"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusCircle, Upload, Image as ImageIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

const submittedArtworks = [
    { id: 1, title: "Cosmic Ocean", imageUrl: "https://placehold.co/600x800.png", aiHint: "abstract space", status: "Judged" },
    { id: 2, title: "City in Bloom", imageUrl: "https://placehold.co/600x800.png", aiHint: "cityscape floral", status: "In Judging" },
    { id: 3, title: "Silent Watcher", imageUrl: "https://placehold.co/600x800.png", aiHint: "wildlife portrait", status: "Received" },
];

export function ArtSubmissions() {
  const [submissions, setSubmissions] = useState(submittedArtworks);
  const { toast } = useToast();

  const maxSubmissions = 5;
  const progressValue = (submissions.length / maxSubmissions) * 100;
  
  const handleUpload = () => {
    // This would be a real upload handler
    toast({
        title: "Artwork Submitted",
        description: "Your new masterpiece has been submitted for review."
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline text-2xl">My Art Submissions</CardTitle>
                <CardDescription>Level 1 Competition</CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={submissions.length >= maxSubmissions}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload Artwork
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload New Artwork</DialogTitle>
                        <DialogDescription>
                            Showcase your latest creation. Make sure it adheres to the competition guidelines.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="art-title">Artwork Title</Label>
                            <Input id="art-title" placeholder="e.g., 'Sunrise over the Hills'" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="art-file">Artwork File</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="art-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                                    </div>
                                    <Input id="art-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleUpload}>Submit Artwork</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div className="mt-4">
            <Label className="text-sm text-muted-foreground">
                {submissions.length} of {maxSubmissions} submissions used
            </Label>
            <Progress value={progressValue} className="mt-1 h-2" />
        </div>
      </CardHeader>
      <CardContent>
        {submissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissions.map((art) => (
              <div key={art.id} className="group relative overflow-hidden rounded-lg">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  width={400}
                  height={500}
                  data-ai-hint={art.aiHint}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-primary-foreground font-bold">{art.title}</h3>
                  <p className="text-sm text-primary-foreground/80">Status: {art.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold">No Submissions Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">It's time to upload your first masterpiece!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
