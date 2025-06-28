
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

const referredParticipants = [
    { name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?u=Priya%20Sharma", status: "Active" },
    { name: "Rohan Mehra", avatar: "https://i.pravatar.cc/150?u=Rohan%20Mehra", status: "Submitted" },
    { name: "Aisha Khan", avatar: "https://i.pravatar.cc/150?u=Aisha%20Khan", status: "Active" },
    { name: "Vikram Rathod", avatar: "https://i.pravatar.cc/150?u=Vikram%20Rathod", status: "Registered" },
    { name: "Ananya Deshpande", avatar: "https://i.pravatar.cc/150?u=Ananya%20Deshpande", status: "Submitted" },
    { name: "Samir Patil", avatar: "https://i.pravatar.cc/150?u=Samir%20Patil", status: "Registered" },
    { name: "Deepa Gupta", avatar: "https://i.pravatar.cc/150?u=Deepa%20Gupta", status: "Active" },
]

export function ReferredParticipantsList() {
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
                        {referredParticipants.map((participant) => (
                            <TableRow key={participant.name}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={participant.avatar} alt={participant.name} />
                                            <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{participant.name}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        variant={
                                            participant.status === "Active" ? "default" :
                                            participant.status === "Submitted" ? "secondary" : "outline"
                                        }
                                    >
                                        {participant.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
