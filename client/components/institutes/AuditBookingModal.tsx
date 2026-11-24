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
import { Institute, submitOnSiteAuditRequest } from "@/lib/institutes-dataset";
import { FileCheck, Calendar, Info, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditBookingModalProps {
  institute: Institute | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditBookingModal({
  institute,
  isOpen,
  onClose,
}: AuditBookingModalProps) {
  const { toast } = useToast();
  const [contactPerson, setContactPerson] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [coursesToAudit, setCoursesToAudit] = useState("");
  const [preferredAuditDate, setPreferredAuditDate] = useState("");
  const [teamSizeRequested, setTeamSizeRequested] = useState(3);
  const [travelLodgingAgreed, setTravelLodgingAgreed] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute minimum date (at least 3 days from today as requested in audio)
  const minDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelLodgingAgreed) {
      alert("Please confirm the travel and lodging arrangement agreement.");
      return;
    }

    if (!preferredAuditDate || preferredAuditDate < minDate) {
      alert("Audit booking must be scheduled at least 3 days in advance to allow auditor team logistics preparation.");
      return;
    }

    submitOnSiteAuditRequest({
      instituteId: institute?.id || "general",
      instituteName: institute?.name || "Unlisted Institute",
      contactPerson,
      officialEmail,
      phone,
      whatsapp,
      coursesToAudit: coursesToAudit.split(",").map((c) => c.trim()).filter(Boolean),
      preferredAuditDate,
      teamSizeRequested: Number(teamSizeRequested),
      travelLodgingAgreed,
      notes,
    });

    setIsSubmitted(true);
    toast({
      title: "Audit Request Submitted Successfully",
      description: "Our audit team will review your requested dates and contact your administration within 24 hours.",
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <FileCheck className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-wider">CareerMap Campus Audit</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Schedule On-Site Physical Verification Audit
          </DialogTitle>
          <DialogDescription className="text-xs">
            For: <strong className="text-foreground">{institute?.name || "Institute Audit Request"}</strong>
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold">Campus Audit Booking Confirmed</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Your audit request for <strong>{preferredAuditDate}</strong> with an audit team of{" "}
              <strong>{teamSizeRequested} member(s)</strong> has been safely recorded in the CareerMap backend.
              Our coordinator will contact you at <strong>{officialEmail || phone}</strong>.
            </p>
            <Button onClick={handleResetAndClose} className="mt-2 text-xs">
              Done & Return
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Transparent Policy Card from Audio 2 */}
            <div className="p-3.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2 text-blue-950 dark:text-blue-200">
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                Audit Procedure & Expenses Policy
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-muted-foreground dark:text-blue-300">
                <li>
                  CareerMap sends a qualified audit team of 1 to 4 auditors directly to your campus.
                </li>
                <li>
                  Inspection covers: CS/IT labs, Physics/Chem/Bio labs, management classrooms, sports grounds, and infrastructure.
                </li>
                <li>
                  Independent student sampling: Team conducts random 1-on-1 student interviews + top student evaluations.
                </li>
                <li>
                  <strong>Expenses:</strong> Auditor travel and lodging/meals are borne by the institute. Detailed audit fees/billing are communicated privately upon booking.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person (Registrar / Dean)</Label>
                <Input
                  id="contactPerson"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="officialEmail">Official Institution Email</Label>
                <Input
                  id="officialEmail"
                  type="email"
                  required
                  placeholder="e.g. registrar@institute.edu"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="phone">Official Calling Number</Label>
                <Input
                  id="phone"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="preferredAuditDate">
                  Preferred Audit Date (Min. 3 days in advance)
                </Label>
                <Input
                  id="preferredAuditDate"
                  type="date"
                  min={minDate}
                  required
                  value={preferredAuditDate}
                  onChange={(e) => setPreferredAuditDate(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="teamSizeRequested">Audit Team Size Requested</Label>
                <select
                  id="teamSizeRequested"
                  value={teamSizeRequested}
                  onChange={(e) => setTeamSizeRequested(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-xs"
                >
                  <option value={1}>1 Auditor (Small school / single department)</option>
                  <option value={2}>2 Auditors (Standard school / college)</option>
                  <option value={3}>3 Auditors (Recommended: Comprehensive evaluation)</option>
                  <option value={4}>4 Auditors (Large University campus multi-dept)</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="coursesToAudit">Departments / Courses to Audit</Label>
              <Input
                id="coursesToAudit"
                placeholder="e.g. B.Tech CS, MBA, Class 11-12 Science labs"
                value={coursesToAudit}
                onChange={(e) => setCoursesToAudit(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Logistical Notes / Airport or Station Proximity</Label>
              <Textarea
                id="notes"
                rows={2}
                placeholder="Nearest railway/airport, preferred campus contact person..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="flex items-start gap-2 pt-2 border-t">
              <input
                type="checkbox"
                id="travelLodgingAgreed"
                checked={travelLodgingAgreed}
                onChange={(e) => setTravelLodgingAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="travelLodgingAgreed" className="text-[11px] text-muted-foreground leading-snug">
                I agree that the institution will arrange and cover the auditor team's travel expenses, lodging,
                and meals during the on-site verification visit, and that audit findings will be published transparently.
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                Confirm & Submit Audit Request
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
