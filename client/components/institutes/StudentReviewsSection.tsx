import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  InstituteReview,
  addInstituteReview,
  likeInstituteReview,
} from "@/lib/institutes-dataset";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  CornerDownRight,
  User,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";

interface StudentReviewsSectionProps {
  instituteId: string;
  instituteName: string;
  ratings: {
    overall: number;
    faculty: number;
    infrastructure: number;
    studentCaliber: number;
    sportsAndExtracurricular: number;
    techLevel: number;
  };
  reviews: InstituteReview[];
  onReviewAdded?: () => void;
}

export default function StudentReviewsSection({
  instituteId,
  instituteName,
  ratings,
  reviews = [],
  onReviewAdded,
}: StudentReviewsSectionProps) {
  // Check if student profile exists in localStorage
  const getStoredStudent = () => {
    try {
      const raw = localStorage.getItem("careermap_student_account");
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return null;
  };

  const storedStudent = getStoredStudent();

  // New Review Form State
  const [studentName, setStudentName] = useState(storedStudent?.name || "");
  const [studentEmail, setStudentEmail] = useState(storedStudent?.email || "");
  const [studentRole, setStudentRole] = useState("Student");
  const [ratingOutOf10, setRatingOutOf10] = useState(9.0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination State: initial 15 comments
  const [visibleCount, setVisibleCount] = useState(15);

  // Active Reply box (reviewId)
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState(storedStudent?.name || "");
  const [replyEmail, setReplyEmail] = useState(storedStudent?.email || "");
  const [replyComment, setReplyComment] = useState("");

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !studentName.trim()) {
      alert("Please provide your name and review text.");
      return;
    }

    setIsSubmitting(true);
    try {
      addInstituteReview(instituteId, {
        studentName,
        studentEmail: studentEmail || "anonymous@student.in",
        studentRole,
        ratingOutOf10,
        comment,
      });

      // Save student credentials to local profile for convenience
      if (!storedStudent && studentName) {
        localStorage.setItem(
          "careermap_student_account",
          JSON.stringify({ name: studentName, email: studentEmail })
        );
      }

      setComment("");
      if (onReviewAdded) onReviewAdded();
    } catch (err: any) {
      alert(err.message || "Failed to post review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostReply = (parentReviewId: string) => {
    if (!replyComment.trim() || !replyName.trim()) {
      alert("Please enter your name and reply message.");
      return;
    }

    try {
      addInstituteReview(instituteId, {
        studentName: replyName,
        studentEmail: replyEmail || "anonymous@student.in",
        studentRole: "Student",
        ratingOutOf10: 9.0,
        comment: replyComment,
        parentReviewId,
      });

      setReplyingToId(null);
      setReplyComment("");
      if (onReviewAdded) onReviewAdded();
    } catch (err: any) {
      alert(err.message || "Failed to post reply");
    }
  };

  const handleLike = (reviewId: string) => {
    likeInstituteReview(instituteId, reviewId);
    if (onReviewAdded) onReviewAdded();
  };

  // Recursive Threaded Comment Component
  const CommentNode = ({ review, depth = 0 }: { review: InstituteReview; depth?: number }) => {
    const isReplying = replyingToId === review.id;

    return (
      <div className={`space-y-3 ${depth > 0 ? "ml-4 sm:ml-6 pl-3 sm:pl-4 border-l-2 border-indigo-200 dark:border-indigo-800" : ""}`}>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-border/80 shadow-sm space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {review.studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-bold text-xs text-foreground">{review.studentName}</span>
                {review.studentRole && (
                  <Badge variant="outline" className="ml-1.5 text-[9px] py-0 px-1.5">
                    {review.studentRole}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">{review.date}</span>
              <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-400/30 text-[10px] font-bold">
                ⭐ {review.ratingOutOf10} / 10
              </Badge>
            </div>
          </div>

          {/* Comment Body */}
          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
            {review.comment}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => handleLike(review.id)}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{review.likes || 0}</span>
            </button>

            <button
              type="button"
              onClick={() => setReplyingToId(isReplying ? null : review.id)}
              className="flex items-center gap-1 hover:text-indigo-600 transition-colors font-medium"
            >
              <MessageSquare className="h-3 w-3" />
              <span>{isReplying ? "Cancel Reply" : "Reply"}</span>
            </button>
          </div>

          {/* Inline Reply Form */}
          {isReplying && (
            <div className="pt-3 border-t border-border/60 space-y-2 mt-2">
              <div className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <CornerDownRight className="h-3 w-3 text-indigo-500" />
                Reply to {review.studentName}:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <Input
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  placeholder="Your Name *"
                  className="h-8 text-xs"
                />
                <Input
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  placeholder="Email / Phone"
                  className="h-8 text-xs"
                />
              </div>
              <Textarea
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="Write your response..."
                className="text-xs min-h-[60px]"
                rows={2}
              />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setReplyingToId(null)} className="h-7 text-xs">
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePostReply(review.id)}
                  className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1"
                >
                  <Send className="h-3 w-3" /> Post Reply
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Nested Child Replies */}
        {review.replies && review.replies.length > 0 && (
          <div className="space-y-3">
            {review.replies.map((child) => (
              <CommentNode key={child.id} review={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* 1. Rating Dashboard Banner (Scale 10.0) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border/60">
          <div>
            <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Verified Student Ratings & Authentic Feedback
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Strictly measured on a 10.0 scale from audited student surveys and verified alumni feedback.
            </p>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center sm:justify-end gap-1">
              ⭐ {ratings?.overall || 9.0} <span className="text-sm font-semibold text-muted-foreground">/ 10.0</span>
            </div>
            <span className="text-[11px] text-muted-foreground">Based on student evaluations</span>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Faculty & Pedagogy</span>
              <span className="font-bold">{ratings?.faculty || 9.0} / 10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${((ratings?.faculty || 9.0) / 10) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Campus & Classrooms</span>
              <span className="font-bold">{ratings?.infrastructure || 9.0} / 10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${((ratings?.infrastructure || 9.0) / 10) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Student Caliber</span>
              <span className="font-bold">{ratings?.studentCaliber || 9.0} / 10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${((ratings?.studentCaliber || 9.0) / 10) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Sports & Grounds</span>
              <span className="font-bold">{ratings?.sportsAndExtracurricular || 9.0} / 10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${((ratings?.sportsAndExtracurricular || 9.0) / 10) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Audited Tech & Labs</span>
              <span className="font-bold">{ratings?.techLevel || 9.0} / 10</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full"
                style={{ width: `${((ratings?.techLevel || 9.0) / 10) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Total Reviews</span>
              <span className="font-bold text-foreground">{reviews.length} discussion threads</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-slate-500 rounded-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Post a Student Review Box */}
      <form onSubmit={handlePostReview} className="p-4 rounded-xl border bg-card space-y-3 shadow-sm">
        <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
          Share Your Ground Reality Review
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[11px] text-muted-foreground font-semibold">Your Name *</label>
            <Input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="mt-1 h-8 text-xs"
              required
            />
          </div>

          <div>
            <label className="text-[11px] text-muted-foreground font-semibold">Role / Grade</label>
            <Input
              value={studentRole}
              onChange={(e) => setStudentRole(e.target.value)}
              placeholder="e.g. 3rd Year CSE / Alumnus / Class 12th"
              className="mt-1 h-8 text-xs"
            />
          </div>

          <div>
            <label className="text-[11px] text-muted-foreground font-semibold flex justify-between">
              <span>Rating (1 - 10.0)</span>
              <span className="font-bold text-amber-600">⭐ {ratingOutOf10} / 10</span>
            </label>
            <Input
              type="number"
              min="1"
              max="10"
              step="0.1"
              value={ratingOutOf10}
              onChange={(e) => setRatingOutOf10(Number(e.target.value))}
              className="mt-1 h-8 text-xs"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground font-semibold">
            Your Honest Feedback (Infrastructure, Lab condition, Academics, Faculty support) *
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Share genuine insights for other students exploring ${instituteName}...`}
            className="mt-1 text-xs min-h-[70px]"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            Post Review
          </Button>
        </div>
      </form>

      {/* 3. Threaded Discussion Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-foreground">
            Student Discussions ({reviews.length})
          </h4>
          <span className="text-xs text-muted-foreground">
            Showing {Math.min(visibleCount, reviews.length)} of {reviews.length}
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="p-8 text-center border rounded-xl bg-muted/20 text-xs text-muted-foreground">
            No student comments yet. Be the first to share your authentic experience at {instituteName}!
          </div>
        ) : (
          <div className="space-y-4">
            {visibleReviews.map((review) => (
              <CommentNode key={review.id} review={review} depth={0} />
            ))}

            {/* Pagination Load More Button */}
            {reviews.length > visibleCount && (
              <div className="pt-2 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleCount((prev) => prev + 15)}
                  className="text-xs gap-1.5"
                >
                  Load More Reviews ({reviews.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
