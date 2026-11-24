import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Institute, submitDirectStudentApplication } from "@/lib/institutes-dataset";
import { Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DirectApplyModalProps {
  institute: Institute | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectApplyModal({
  institute,
  isOpen,
  onClose,
}: DirectApplyModalProps) {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [desiredCourseOrGrade, setDesiredCourseOrGrade] = useState("");
  const [lastAcademicScore, setLastAcademicScore] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!institute) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitDirectStudentApplication({
      instituteId: institute.id,
      instituteName: institute.name,
      studentName,
      studentEmail,
      studentPhone,
      desiredCourseOrGrade,
      lastAcademicScore,
      message,
    });

    setIsSubmitted(true);
    toast({
      title: "Direct Application Submitted",
      description: `Your application to ${institute.name} has been recorded and transmitted to the admissions office.`,
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Send className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Direct Admission Application</span>
          </div>
          <DialogTitle className="text-lg font-bold">
            Apply to {institute.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Submit your application directly through CareerMap. Your application is logged with verified status.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold">Application Successfully Transmitted</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Your inquiry has been sent to <strong>{institute.name}</strong>. The admissions department will reach
              out to <strong>{studentEmail || studentPhone}</strong>.
            </p>
            <Button onClick={handleResetAndClose} className="mt-2 text-xs">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="studentName">Student Full Name</Label>
                <Input
                  id="studentName"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="studentEmail">Email Address</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  required
                  placeholder="aryan@example.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="studentPhone">Phone / WhatsApp Number</Label>
                <Input
                  id="studentPhone"
                  required
                  placeholder="+91 98765 43210"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="course">Desired Program / Stream</Label>
                <Input
                  id="course"
                  required
                  placeholder="e.g. Class 11 PCM, B.Tech CS, MBA"
                  value={desiredCourseOrGrade}
                  onChange={(e) => setDesiredCourseOrGrade(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="score">Previous Class Marks / Entrance Percentile</Label>
                <Input
                  id="score"
                  required
                  placeholder="e.g. 92% in 10th CBSE or 96.5 percentile in JEE"
                  value={lastAcademicScore}
                  onChange={(e) => setLastAcademicScore(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="message">Message / Queries for Admissions Team</Label>
                <Textarea
                  id="message"
                  rows={2}
                  placeholder="Ask about hostel vacancies, scholarship eligibility, admission deadlines..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                Submit Direct Application
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
