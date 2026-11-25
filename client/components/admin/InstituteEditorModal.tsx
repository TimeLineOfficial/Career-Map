import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Institute,
  InstitutePhoto,
  PhotoCategory,
  OwnershipType,
  InstitutionCategory,
  InstituteType,
} from "@/lib/institutes-dataset";
import {
  Building,
  School,
  MapPin,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  Upload,
  Phone,
  Mail,
  DollarSign,
  Star,
  Users,
  Award,
} from "lucide-react";

interface InstituteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  institute: Institute | null;
  onSave: (saved: Institute) => void;
}

export default function InstituteEditorModal({
  isOpen,
  onClose,
  institute,
  onSave,
}: InstituteEditorModalProps) {
  const isEditing = !!institute;

  // Form State
  const [formData, setFormData] = useState<Partial<Institute>>({});
  const [activeTab, setActiveTab] = useState("basic");

  // Temporary item inputs
  const [newAdvantage, setNewAdvantage] = useState("");
  const [newDisadvantage, setNewDisadvantage] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState<PhotoCategory>("campus");
  const [newPhotoType, setNewPhotoType] = useState<"highlight" | "ground_reality">("highlight");
  const [newPhotoCaption, setNewPhotoCaption] = useState("");

  useEffect(() => {
    if (institute) {
      setFormData(JSON.parse(JSON.stringify(institute)));
    } else {
      // Default blank template for new institute - all fields completely clean
      setFormData({
        id: "inst_" + Date.now(),
        name: "",
        shortName: "",
        type: "" as any,
        ownershipType: "" as any,
        institutionCategory: "" as any,
        totalStudentsEnrolled: undefined,
        seatMatrix: { availableSeats: 0, totalSeats: 0 },
        levels: ["ug"],
        streams: [],
        location: {
          area: "",
          city: "",
          district: "",
          state: "",
          country: "India",
          pincode: "",
          address: "",
          geo: { lat: 20.5937, lng: 78.9629 },
          googleMapsUrl: "",
        },
        establishedYear: undefined,
        yearsInOperation: undefined,
        website: "",
        contact: {
          email: "",
          phone: "",
          whatsapp: "",
        },
        feeStructure: {
          tuitionPerYear: 0,
          hostelPerYear: 0,
          totalEstimated: 0,
          scholarshipAvailable: false,
          notes: "",
        },
        ratings: {
          overall: 0,
          faculty: 0,
          infrastructure: 0,
          studentCaliber: 0,
          sportsAndExtracurricular: 0,
          techLevel: 0,
        },
        advantages: [],
        disadvantages: [],
        placement: {
          status: "unverified",
          badgeNotice: "Placement records pending formal corporate audit verification.",
          lastYearPlacementRate: 0,
          allTimePlacementRate: 0,
          averagePackageLPA: 0,
          highestPackageLPA: 0,
          medianPackageLPA: 0,
          topRecruiters: [],
          students: [],
        },
        audit: {
          status: "unverified",
          badgeNotice: "On-site campus audit pending.",
          studentSamplingConducted: false,
          randomStudentInterviewCount: 0,
          topStudentInterviewCount: 0,
        },
        photos: [],
        reviews: [],
        rankScore: 50,
        featured: false,
      });
    }
  }, [institute, isOpen]);

  // Client-side auto compression via HTML5 Canvas (max 1200px, JPEG 0.72)
  const compressImageFile = (file: File, callback: (compressedUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const rawDataUrl = reader.result;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.72);
            callback(compressed);
          } else {
            callback(rawDataUrl);
          }
        };
        img.src = rawDataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFile(file, (compressedUrl) => {
      setNewPhotoUrl(compressedUrl);
    });
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImageFile(file, (compressedUrl) => {
      const coverPhoto: InstitutePhoto = {
        id: "cover_" + Date.now(),
        category: "campus",
        title: "Campus Cover Wallpaper",
        url: compressedUrl,
        type: "highlight",
        status: "verified",
        caption: "Official Campus Cover",
      };
      setFormData((prev) => ({
        ...prev,
        photos: [coverPhoto, ...(prev.photos || []).filter((p) => !p.id.startsWith("cover_"))],
      }));
    });
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    const photo: InstitutePhoto = {
      id: "p_" + Date.now(),
      category: newPhotoCategory,
      type: newPhotoType,
      title: newPhotoTitle.trim() || `${newPhotoCategory.toUpperCase()} Photo`,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || "Uploaded campus facility photo",
      status: "verified",
    };

    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), photo],
    }));

    setNewPhotoUrl("");
    setNewPhotoTitle("");
    setNewPhotoCaption("");
  };

  const handleRemovePhoto = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((p) => p.id !== id),
    }));
  };

  const handleAddAdvantage = () => {
    if (!newAdvantage.trim()) return;
    setFormData((prev) => ({
      ...prev,
      advantages: [...(prev.advantages || []), newAdvantage.trim()],
    }));
    setNewAdvantage("");
  };

  const handleRemoveAdvantage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      advantages: (prev.advantages || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddDisadvantage = () => {
    if (!newDisadvantage.trim()) return;
    setFormData((prev) => ({
      ...prev,
      disadvantages: [...(prev.disadvantages || []), newDisadvantage.trim()],
    }));
    setNewDisadvantage("");
  };

  const handleRemoveDisadvantage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      disadvantages: (prev.disadvantages || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert("Please provide the institute name.");
      return;
    }

    // Prepare complete updated institute
    const completeInst = {
      ...formData,
      id:
        formData.id ||
        formData.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4),
    } as Institute;

    onSave(completeInst);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 border-0 shadow-2xl bg-slate-900 text-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  {isEditing ? `Edit: ${institute?.name}` : "Add New School / College"}
                </DialogTitle>
                <DialogDescription className="text-blue-100 text-xs">
                  Full administrative editing control for photos, ratings out of 10, fees, ownership & contacts.
                </DialogDescription>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 text-xs">
              Scale 10.0 Ratings
            </Badge>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full bg-slate-800 p-1">
              <TabsTrigger value="basic" className="text-xs">1. Identity & Location</TabsTrigger>
              <TabsTrigger value="capacity" className="text-xs">2. Seats & Fees</TabsTrigger>
              <TabsTrigger value="ratings" className="text-xs">3. Ratings /10.0</TabsTrigger>
              <TabsTrigger value="proscons" className="text-xs">4. Pros & Cons</TabsTrigger>
              <TabsTrigger value="photos" className="text-xs">5. Photos & Labs</TabsTrigger>
            </TabsList>

            {/* TAB 1: IDENTITY & LOCATION */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-300">Institute Full Name *</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Indian Institute of Technology Delhi"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-300">Short Name / Display Abbreviation *</Label>
                  <Input
                    value={formData.shortName || ""}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g. IIT Delhi"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Institute Type *</Label>
                  <select
                    value={formData.type || ""}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as InstituteType })}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  >
                    <option value="" disabled>-- Select Institute Type --</option>
                    <option value="college">College / Higher Education</option>
                    <option value="school">School (Class 8th-12th)</option>
                    <option value="university">University</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Category *</Label>
                  <select
                    value={formData.institutionCategory || ""}
                    onChange={(e) => setFormData({ ...formData, institutionCategory: e.target.value as InstitutionCategory })}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  >
                    <option value="" disabled>-- Select Category --</option>
                    <option value="government">Government Institution</option>
                    <option value="private">Private Institution</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Specific Ownership *</Label>
                  <select
                    value={formData.ownershipType || ""}
                    onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value as OwnershipType })}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  >
                    <option value="" disabled>-- Select Ownership Type --</option>
                    <option value="central_govt">Central Government (IIT, NIT, AIIMS, Central Univ)</option>
                    <option value="state_govt">State Government (State Univ, Govt Model)</option>
                    <option value="deemed">Deemed University</option>
                    <option value="private">Private</option>
                    <option value="international">International / Autonomous</option>
                  </select>
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Established Year</Label>
                  <Input
                    type="number"
                    value={formData.establishedYear || ""}
                    onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="e.g. 1961"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Campus Locality / Area</Label>
                  <Input
                    value={formData.location?.area || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, area: e.target.value },
                      })
                    }
                    placeholder="e.g. Hauz Khas / Powai / Ramnagar"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">City / Town *</Label>
                  <Input
                    value={formData.location?.city || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, city: e.target.value },
                      })
                    }
                    placeholder="e.g. New Delhi, Varanasi, Mumbai, Lucknow"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">District</Label>
                  <Input
                    value={formData.location?.district || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, district: e.target.value },
                      })
                    }
                    placeholder="e.g. Varanasi, South Delhi, Mumbai Suburban"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">State / Region *</Label>
                  <Input
                    value={formData.location?.state || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, state: e.target.value },
                      })
                    }
                    placeholder="e.g. Uttar Pradesh, Delhi, Maharashtra"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Country</Label>
                  <Input
                    value={formData.location?.country || "India"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, country: e.target.value },
                      })
                    }
                    placeholder="e.g. India, USA, UK"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">PIN / Postal Code</Label>
                  <Input
                    value={formData.location?.pincode || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, pincode: e.target.value },
                      })
                    }
                    placeholder="e.g. 110016"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label className="text-xs text-slate-300">Full Campus Street Address</Label>
                  <Input
                    value={formData.location?.address || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, address: e.target.value },
                      })
                    }
                    placeholder="e.g. Hauz Khas, New Delhi, Delhi 110016"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Official Website URL</Label>
                  <Input
                    value={formData.website || ""}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Google Maps URL / Coordinates</Label>
                  <Input
                    value={formData.location?.googleMapsUrl || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location!, googleMapsUrl: e.target.value },
                      })
                    }
                    placeholder="https://maps.google.com/..."
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Contact Email</Label>
                  <Input
                    type="email"
                    value={formData.contact?.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact!, email: e.target.value },
                      })
                    }
                    placeholder="admissions@institute.edu.in"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Contact Phone / Mobile</Label>
                  <Input
                    type="tel"
                    value={formData.contact?.phone || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact!, phone: e.target.value },
                      })
                    }
                    placeholder="e.g. 011-26597135"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2 p-3 rounded-lg border border-slate-700 bg-slate-800/40">
                  <Label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                    <span>Main Cover Wallpaper (Auto-Compressed)</span>
                    <span className="text-[10px] text-slate-400">Direct Upload or Paste URL</span>
                  </Label>
                  <div className="flex gap-2 mt-2 items-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="text-xs bg-slate-900 border-slate-700 text-slate-300 file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-2 file:py-1 file:text-xs"
                    />
                    {(formData.photos && formData.photos.length > 0) && (
                      <span className="text-[11px] text-emerald-400 font-semibold whitespace-nowrap">
                        ✓ {formData.photos.length} photo(s) attached
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: SEATS & FEES */}
            <TabsContent value="capacity" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-slate-300">Total Enrolled Students</Label>
                  <Input
                    type="number"
                    value={formData.totalStudentsEnrolled ?? ""}
                    onChange={(e) => setFormData({ ...formData, totalStudentsEnrolled: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="e.g. 5200"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Available Admission Seats</Label>
                  <Input
                    type="number"
                    value={formData.seatMatrix?.availableSeats ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seatMatrix: {
                          availableSeats: Number(e.target.value) || 0,
                          totalSeats: formData.seatMatrix?.totalSeats || 0,
                        },
                      })
                    }
                    placeholder="e.g. 240"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Total Approved Seats</Label>
                  <Input
                    type="number"
                    value={formData.seatMatrix?.totalSeats ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seatMatrix: {
                          availableSeats: formData.seatMatrix?.availableSeats || 0,
                          totalSeats: Number(e.target.value) || 0,
                        },
                      })
                    }
                    placeholder="e.g. 1000"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Annual Tuition Fee (₹)</Label>
                  <Input
                    type="number"
                    value={formData.feeStructure?.tuitionPerYear ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feeStructure: {
                          ...formData.feeStructure!,
                          tuitionPerYear: Number(e.target.value) || 0,
                          totalEstimated: (Number(e.target.value) || 0) + (formData.feeStructure?.hostelPerYear || 0),
                        },
                      })
                    }
                    placeholder="e.g. 125000"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Hostel Fee Per Year (₹)</Label>
                  <Input
                    type="number"
                    value={formData.feeStructure?.hostelPerYear ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feeStructure: {
                          ...formData.feeStructure!,
                          hostelPerYear: Number(e.target.value) || 0,
                          totalEstimated: (formData.feeStructure?.tuitionPerYear || 0) + (Number(e.target.value) || 0),
                        },
                      })
                    }
                    placeholder="e.g. 60000"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="schCheck"
                    checked={formData.feeStructure?.scholarshipAvailable ?? false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure!, scholarshipAvailable: e.target.checked },
                      })
                    }
                    className="h-4 w-4 rounded bg-slate-800 border-slate-700"
                  />
                  <Label htmlFor="schCheck" className="text-xs text-slate-300 cursor-pointer">
                    Scholarships Available
                  </Label>
                </div>

                <div className="sm:col-span-3">
                  <Label className="text-xs text-slate-300">Fee Notes & Concessions</Label>
                  <Textarea
                    value={formData.feeStructure?.notes || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure!, notes: e.target.value },
                      })
                    }
                    placeholder="Details about waivers, installments or government quotas"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: RATINGS OUT OF 10.0 */}
            <TabsContent value="ratings" className="space-y-4">
              <div className="p-3 bg-blue-950/40 border border-blue-800 rounded-lg text-xs text-blue-200">
                All ratings across CareerMap are strictly calibrated on a <strong>10.0 scale</strong> (e.g. 9.8 / 10.0).
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-slate-300">Overall Rating (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.overall ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, overall: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 9.5"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Faculty Quality (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.faculty ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, faculty: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 9.2"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Infrastructure (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.infrastructure ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, infrastructure: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 9.4"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Student Caliber (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.studentCaliber ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, studentCaliber: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 9.3"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Sports & Extra (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.sportsAndExtracurricular ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, sportsAndExtracurricular: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 8.8"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300">Labs & Tech Level (0 - 10.0)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.ratings?.techLevel ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ratings: { ...formData.ratings!, techLevel: Number(e.target.value) || 0 },
                      })
                    }
                    placeholder="e.g. 9.6"
                    className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: PROS & CONS */}
            <TabsContent value="proscons" className="space-y-6">
              {/* Advantages */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-emerald-400">Advantages / Key Strengths (Bullet Points)</Label>
                <div className="space-y-2">
                  {(formData.advantages || []).map((adv, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700 text-xs">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span className="flex-1 text-slate-200">{adv}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveAdvantage(idx)}
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newAdvantage}
                    onChange={(e) => setNewAdvantage(e.target.value)}
                    placeholder="Add an advantage (e.g. Industry partnerships, top faculty)"
                    className="bg-slate-800 border-slate-700 text-white text-xs"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAdvantage())}
                  />
                  <Button type="button" size="sm" onClick={handleAddAdvantage} className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>

              {/* Disadvantages */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <Label className="text-xs font-semibold text-amber-400">Disadvantages / Realistic Considerations</Label>
                <div className="space-y-2">
                  {(formData.disadvantages || []).map((dis, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700 text-xs">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="flex-1 text-slate-200">{dis}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveDisadvantage(idx)}
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newDisadvantage}
                    onChange={(e) => setNewDisadvantage(e.target.value)}
                    placeholder="Add a limitation (e.g. High cutoff, older hostel facilities)"
                    className="bg-slate-800 border-slate-700 text-white text-xs"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddDisadvantage())}
                  />
                  <Button type="button" size="sm" onClick={handleAddDisadvantage} className="bg-amber-600 hover:bg-amber-700 text-xs">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* TAB 5: PHOTOS MANAGER */}
            <TabsContent value="photos" className="space-y-6">
              <div className="p-3 bg-blue-950/40 border border-blue-800 rounded-lg text-xs text-blue-200">
                Manage high-resolution cover wallpapers, audited laboratory photos, sports facilities, and ground reality inspections. Supports web URLs, Google Drive image links, and direct device upload.
              </div>

              {/* Existing Photos Grid */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-slate-300">Current Photos ({(formData.photos || []).length})</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(formData.photos || []).map((photo) => (
                    <div key={photo.id} className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800/60 group">
                      <img src={photo.url} alt={photo.title} className="h-28 w-full object-cover" />
                      <div className="p-2 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-white truncate max-w-[140px]">{photo.title}</span>
                          <Badge variant="outline" className="text-[9px] uppercase border-slate-600 text-slate-300">
                            {photo.category}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <Badge className={`text-[9px] ${photo.type === "ground_reality" ? "bg-amber-500/20 text-amber-300" : "bg-blue-500/20 text-blue-300"}`}>
                            {photo.type === "ground_reality" ? "Audited Lab" : "Highlight"}
                          </Badge>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemovePhoto(photo.id)}
                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Photo Box */}
              <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/40 space-y-4">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Camera className="h-4 w-4 text-blue-400" />
                  Add Photo / Inspection Evidence
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <Label className="text-[11px] text-slate-300">Photo Title</Label>
                    <Input
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. AI & Robotics Computing Lab"
                      className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <Label className="text-[11px] text-slate-300">Category</Label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as PhotoCategory)}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-800 border-slate-700 text-white text-xs"
                    >
                      <option value="campus">Campus Building & Courtyard</option>
                      <option value="classrooms">Classrooms & Lecture Halls</option>
                      <option value="labs">Audited Labs & Research Centers</option>
                      <option value="grounds">Sports Grounds & Athletic Facilities</option>
                      <option value="sports">Indoor Gymnasium & Recreation</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-[11px] text-slate-300">Photo Type</Label>
                    <select
                      value={newPhotoType}
                      onChange={(e) => setNewPhotoType(e.target.value as any)}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-slate-800 border-slate-700 text-white text-xs"
                    >
                      <option value="highlight">Official High-Resolution Highlight</option>
                      <option value="ground_reality">Ground Reality / Audited Physical Inspection</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-[11px] text-slate-300">Direct Device Upload</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-[11px] text-slate-300">Or Paste Image URL / Google Drive Link</Label>
                    <Input
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... or Google Drive URL"
                      className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-[11px] text-slate-300">Caption / Description</Label>
                    <Input
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      placeholder="Brief note about the equipment or inspection observation"
                      className="mt-1 bg-slate-800 border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleAddPhoto}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Add Photo to Institute
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="border-t border-slate-800 pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold gap-2">
              <CheckCircle2 className="h-4 w-4" /> Save Institute Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
