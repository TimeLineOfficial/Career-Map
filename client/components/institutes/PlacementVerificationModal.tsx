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
import {
  Institute,
  loadInstitutes,
  submitPlacementVerificationRequest,
} from "@/lib/institutes-dataset";
import { ShieldCheck, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlacementVerificationModalProps {
  institute: Institute | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlacementVerificationModal({
  institute,
  isOpen,
  onClose,
}: PlacementVerificationModalProps) {
  const { toast } = useToast();
  const allInstitutes = loadInstitutes();

  const [selectedInstId, setSelectedInstId] = useState(institute?.id || "");
  const [contactPerson, setContactPerson] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [companyContactDetails, setCompanyContactDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedInstitute = allInstitutes.find((i) => i.id === selectedInstId) || institute;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitPlacementVerificationRequest({
      instituteId: selectedInstId || institute?.id || "unlisted",
      instituteName: selectedInstitute?.name || "Unlisted Institute",
      contactPerson,
      officialEmail,
      phone,
      whatsapp,
      companyContactDetails,
      notes,
    });

    setIsSubmitted(true);
    toast({
      title: "Placement Verification Request Sent",
      description: "Our verification desk has received your request. We will contact the recruiting companies directly.",
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
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Independent Placement Verification</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Request Placement Data Verification
          </DialogTitle>
          <DialogDescription className="text-xs">
            Colleges & Schools can request to verify placement or admission numbers through direct corporate confirmation.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold">Verification Request Submitted</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Your request for <strong>{selectedInstitute?.name || "your institution"}</strong> has been logged.
              Our verification team will review your submission and contact the companies directly from our official email{" "}
              <strong>career.mapofficials@gmail.com</strong>.
            </p>
            <Button onClick={handleResetAndClose} className="mt-2 text-xs">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Anti-manipulation Notice from User Prompt */}
            <div className="p-3.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2 text-emerald-950 dark:text-emerald-200">
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                <Mail className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                Anti-Manipulation Direct Verification Protocol
              </div>
              <p className="text-[11px] text-muted-foreground dark:text-emerald-300">
                To protect student trust, the <strong>[VERIFIED]</strong> tag is only granted when the hiring companies
                where students got placed confirm the selected student names and CTC packages directly to CareerMap at{" "}
                <strong className="text-foreground">career.mapofficials@gmail.com</strong>, rather than solely relying
                on college marketing brochures.
              </p>
            </div>

            <div>
              <Label htmlFor="instSelect">Select Institute Listed on Website</Label>
              <select
                id="instSelect"
                value={selectedInstId}
                onChange={(e) => setSelectedInstId(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-xs"
              >
                <option value="">-- Choose Institute --</option>
                {allInstitutes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.location.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Placement Officer / Dean Name</Label>
                <Input
                  id="contactPerson"
                  required
                  placeholder="e.g. Prof. Arvind Kumar"
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
                  placeholder="e.g. tpo@institute.ac.in"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="phone">Contact Phone Number</Label>
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
            </div>

            <div>
              <Label htmlFor="companyContacts">
                Recruiting Companies & HR Reference Contacts (For Independent Verification)
              </Label>
              <Textarea
                id="companyContacts"
                required
                rows={3}
                placeholder="List major hiring companies (e.g., TCS, Google, Infosys, Deloitte) and their campus hiring coordinator emails or official contact numbers..."
                value={companyContactDetails}
                onChange={(e) => setCompanyContactDetails(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Documentation / Drive Links</Label>
              <Textarea
                id="notes"
                rows={2}
                placeholder="Link to official placement brochures, offer letter samples..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                Submit Verification Request
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
