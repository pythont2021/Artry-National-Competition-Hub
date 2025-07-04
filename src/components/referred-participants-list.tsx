
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Profile } from "@/lib/database.types"

interface ReferredParticipant {
    full_name: string | null;
    category: string | null;
}

export function ReferredParticipantsList({ participants }: { participants: ReferredParticipant[] }) {
    
    const getStatus = (category: string | null) => {
        if (!category) return "Registered";
        if (['junior', 'intermediate', 'senior', 'artist'].includes(category)) return "Active";
        return "Registered";
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Referred Participants</CardTitle>
                <CardDescription>Track the progress of participants you've referred.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Participant</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.map((participant, index) => (
                            <TableRow key={`${participant.full_name}-${index}`}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${participant.full_name}`} alt={participant.full_name || 'Participant'} />
                                            <AvatarFallback>{(participant.full_name || 'P').split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{participant.full_name || 'Anonymous Participant'}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        variant={
                                            getStatus(participant.category) === "Active" ? "default" : "outline"
                                        }
                                    >
                                        {getStatus(participant.category)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                         {participants.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={2} className="text-center text-muted-foreground">
                                    No participants have used your referral code yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
