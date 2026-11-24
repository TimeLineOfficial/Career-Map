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
import { submitNewInstituteRequest, InstituteType } from "@/lib/institutes-dataset";
import { Building, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewInstituteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewInstituteModal({
  isOpen,
  onClose,
}: NewInstituteModalProps) {
  const { toast } = useToast();
  const [instituteName, setInstituteName] = useState("");
  const [type, setType] = useState<InstituteType>("college");
  const [locationName, setLocationName] = useState("");
  const [exactGeolocation, setExactGeolocation] = useState("");
  const [establishedYear, setEstablishedYear] = useState(2000);
  const [website, setWebsite] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [streamsOffered, setStreamsOffered] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitNewInstituteRequest({
      instituteName,
      type,
      locationName,
      exactGeolocation,
      establishedYear: Number(establishedYear),
      website,
      officialEmail,
      contactPhone,
      streamsOffered,
    });

    setIsSubmitted(true);
    toast({
      title: "Institute Listing Request Submitted",
      description: "Your institution request has been sent to the CareerMap administration backend for approval.",
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
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Building className="h-6 w-6" />
            <span className="text-xs font-bold uppercase tracking-wider">Institution Onboarding</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Add Your College or School to CareerMap
          </DialogTitle>
          <DialogDescription className="text-xs">
            Submit your institution's profile for inclusion in India's leading transparent education directory.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold">Application Received by Backend</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Thank you for registering <strong>{instituteName}</strong>. Your listing request appears in our admin
              backend's New Institute section. Our team will verify the details and activate your profile.
            </p>
            <Button onClick={handleResetAndClose} className="mt-2 text-xs">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="instituteName">Full Institution Name</Label>
                <Input
                  id="instituteName"
                  required
                  placeholder="e.g. Modern Academy of Science and Technology"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="instType">Institution Type</Label>
                <select
                  id="instType"
                  value={type}
                  onChange={(e) => setType(e.target.value as InstituteType)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-xs"
                >
                  <option value="college">College / Higher Education</option>
                  <option value="school">School (Class 8th to 12th)</option>
                  <option value="university">University / Multi-Faculty</option>
                </select>
              </div>

              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  min={1800}
                  max={new Date().getFullYear()}
                  required
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(Number(e.target.value))}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="locationName">City & Area Name</Label>
                <Input
                  id="locationName"
                  required
                  placeholder="e.g. Noida Sector 62, Uttar Pradesh"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="exactGeolocation">Exact Geolocation / Google Maps Link</Label>
                <Input
                  id="exactGeolocation"
                  required
                  placeholder="e.g. 28.5355, 77.3910 or Google Maps URL"
                  value={exactGeolocation}
                  onChange={(e) => setExactGeolocation(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="website">Official Institution Website</Label>
                <Input
                  id="website"
                  type="url"
                  required
                  placeholder="https://www.institute.edu.in"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="officialEmail">Official Administration Email</Label>
                <Input
                  id="officialEmail"
                  type="email"
                  required
                  placeholder="admin@institute.edu.in"
                  value={officialEmail}
                  onChange={(e) => setOfficialEmail(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone Number</Label>
                <Input
                  id="contactPhone"
                  required
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label htmlFor="streamsOffered">Key Streams & Programs Offered</Label>
                <Input
                  id="streamsOffered"
                  required
                  placeholder="e.g. CBSE Science, Commerce, B.Tech CS, MBA"
                  value={streamsOffered}
                  onChange={(e) => setStreamsOffered(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs">
                Submit Institution Request
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
