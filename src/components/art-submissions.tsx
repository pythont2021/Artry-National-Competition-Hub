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
import { Artwork } from "@/lib/database.types";

export function ArtSubmissions({ level, submissions }: { level: number; submissions: Artwork[] }) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const maxSubmissions = 5;
  const progressValue = (submissions.length / maxSubmissions) * 100;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024 && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please select a PNG, JPG, or JPEG file smaller than 5MB.",
      });
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setUploading(true);
    // Simulate an upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploading(false);

    toast({
      title: "Artwork Submitted",
      description: `Your new masterpiece ${selectedFile.name} has been submitted for review.`, // Corrected line
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline text-2xl">My Art Submissions</CardTitle>
            <CardDescription>Level {level} Competition</CardDescription>
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
                      <Input id="art-file" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
                {selectedFile && (
                  <div className="text-sm text-muted-foreground">
                    Selected file: {selectedFile.name}
                  </div>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Submitting...' : 'Submit Artwork'}
                  </Button>
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
                  src={art.image_url}
                  alt={art.title}
                  width={400}
                  height={500}
                  data-ai-hint={art.ai_hint || 'art'}
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
