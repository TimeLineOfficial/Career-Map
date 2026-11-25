import React, { useState, useEffect } from "react";
import {
  BlogPost,
  BlogCategory,
  loadBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addBlogComment,
  likeBlogPost,
  likeBlogComment,
} from "@/lib/blogs-dataset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Share2,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Send,
  CornerDownRight,
  Sparkles,
  Lock,
  Edit,
  Trash2,
  Tag,
  ArrowLeft,
} from "lucide-react";

const CATEGORIES: { id: BlogCategory | "all"; label: string }[] = [
  { id: "all", label: "All Insights" },
  { id: "choosing_courses", label: "Course Selection" },
  { id: "college_life", label: "College Life Realities" },
  { id: "hostel_facilities", label: "Hostel & Facilities" },
  { id: "nep_updates", label: "NEP 2020 Updates" },
  { id: "career_realities", label: "Career Realities" },
];

export default function CommunityBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // New Article Form
  const [isCreating, setIsCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BlogCategory>("choosing_courses");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Comment State
  const [commentText, setCommentText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const getStoredStudent = () => {
    try {
      const raw = localStorage.getItem("careermap_student_account");
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return null;
  };
  const storedStudent = getStoredStudent();

  useEffect(() => {
    setPosts(loadBlogPosts());
  }, []);

  const refreshPosts = () => {
    const updated = loadBlogPosts();
    setPosts(updated);
    if (selectedPost) {
      const current = updated.find((p) => p.id === selectedPost.id) || null;
      setSelectedPost(current);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchCat = selectedCategory === "all" || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storedStudent) {
      window.dispatchEvent(new CustomEvent("open-student-account-modal"));
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please provide both a title and article content.");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const catObj = CATEGORIES.find((c) => c.id === category);

    if (editingPostId) {
      const existing = posts.find((p) => p.id === editingPostId);
      if (existing) {
        updateBlogPost({
          ...existing,
          title: title.trim(),
          category,
          categoryLabel: catObj?.label || "Insight",
          summary: summary.trim() || title.trim(),
          content: content.trim(),
          tags: tags.length > 0 ? tags : existing.tags,
          readingTimeMinutes: Math.max(2, Math.ceil(content.split(" ").length / 150)),
        });
      }
      setEditingPostId(null);
    } else {
      createBlogPost({
        title: title.trim(),
        category,
        categoryLabel: catObj?.label || "Insight",
        summary: summary.trim() || title.trim(),
        content: content.trim(),
        authorName: storedStudent.name || "Student Contributor",
        authorRole: `${storedStudent.educationLevel || "Student"} • ${storedStudent.stream || "General"}`,
        authorEmail: storedStudent.email,
        readingTimeMinutes: Math.max(2, Math.ceil(content.split(" ").length / 150)),
        tags: tags.length > 0 ? tags : ["Student Life", "Guidance"],
      });
    }

    setTitle("");
    setSummary("");
    setContent("");
    setTagsInput("");
    setIsCreating(false);
    refreshPosts();
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setSummary(post.summary);
    setContent(post.content);
    setTagsInput(post.tags.join(", "));
    setIsCreating(true);
    setSelectedPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    deleteBlogPost(id);
    setSelectedPost(null);
    refreshPosts();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storedStudent) {
      window.dispatchEvent(new CustomEvent("open-student-account-modal"));
      return;
    }

    if (!selectedPost || !commentText.trim()) return;

    addBlogComment(selectedPost.id, {
      userName: storedStudent.name || "Verified Student",
      userRole: storedStudent.educationLevel || "Student",
      comment: commentText.trim(),
    });

    setCommentText("");
    refreshPosts();
  };

  const handleAddReply = (parentCommentId: string) => {
    if (!storedStudent) {
      window.dispatchEvent(new CustomEvent("open-student-account-modal"));
      return;
    }

    if (!selectedPost || !replyText.trim()) return;

    addBlogComment(selectedPost.id, {
      userName: storedStudent.name || "Verified Student",
      userRole: storedStudent.educationLevel || "Student",
      comment: replyText.trim(),
      parentCommentId,
    });

    setReplyingToCommentId(null);
    setReplyText("");
    refreshPosts();
  };

  const handleLikePost = (id: string) => {
    if (!storedStudent) {
      window.dispatchEvent(new CustomEvent("open-student-account-modal"));
      return;
    }
    likeBlogPost(id);
    refreshPosts();
  };

  return (
    <div className="min-h-screen py-8">
      {/* SEO Title & Description */}
      <div className="container max-w-5xl mx-auto px-4 space-y-6">
        {/* Detail View of a Single Post */}
        {selectedPost ? (
          <div className="space-y-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPost(null)}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Articles
            </Button>

            <article className="p-6 md:p-8 rounded-2xl border border-border bg-card/90 shadow-sm space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-blue-600 text-white text-xs">{selectedPost.categoryLabel}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {selectedPost.readingTimeMinutes} min read
                  </span>
                  <span className="text-xs text-muted-foreground">• {selectedPost.date}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-snug">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                      {selectedPost.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground">{selectedPost.authorName}</div>
                      <div className="text-[11px] text-muted-foreground">{selectedPost.authorRole}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLikePost(selectedPost.id)}
                      className="gap-1.5 text-xs h-8"
                    >
                      <ThumbsUp className="h-3.5 w-3.5 text-blue-600" />
                      <span>{selectedPost.likes} Likes</span>
                    </Button>

                    {storedStudent && (storedStudent.email === selectedPost.authorEmail || storedStudent.name === selectedPost.authorName) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditClick(selectedPost)}
                        className="text-xs h-8 text-indigo-600 hover:text-indigo-700"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-line text-sm border-t border-b border-border/60 py-6">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <Tag className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </article>

            {/* Comments & Discussion Tree */}
            <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/90 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Community Discussion ({selectedPost.comments.length})
                </h3>
              </div>

              {/* Comment Input */}
              {storedStudent ? (
                <form onSubmit={handleAddComment} className="space-y-3">
                  <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts, experiences or questions on this article..."
                    className="text-xs min-h-[70px]"
                    required
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5">
                      <Send className="h-3.5 w-3.5" /> Post Comment
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/30 text-center space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Sign in with your student account to join the discussion and ask questions.
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-student-account-modal"))}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
                  >
                    <User className="h-3.5 w-3.5" /> Login / Register with Student Account
                  </Button>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4 pt-2">
                {selectedPost.comments.length === 0 ? (
                  <div className="text-center py-8 text-xs text-muted-foreground italic">
                    No comments yet. Start the conversation!
                  </div>
                ) : (
                  selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{comment.userName}</span>
                          {comment.userRole && (
                            <Badge variant="outline" className="text-[9px] py-0">
                              {comment.userRole}
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{comment.comment}</p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-muted-foreground">
                        <button
                          type="button"
                          onClick={() => {
                            likeBlogComment(selectedPost.id, comment.id);
                            refreshPosts();
                          }}
                          className="flex items-center gap-1 hover:text-emerald-600"
                        >
                          <ThumbsUp className="h-3 w-3" /> {comment.likes || 0}
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyingToCommentId(replyingToCommentId === comment.id ? null : comment.id)}
                          className="hover:text-indigo-600"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Reply form */}
                      {replyingToCommentId === comment.id && (
                        <div className="pt-2 pl-4 border-l-2 border-indigo-300 dark:border-indigo-800 space-y-2 mt-2">
                          <Input
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="text-xs h-8"
                          />
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost" onClick={() => setReplyingToCommentId(null)} className="h-7 text-xs">
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => handleAddReply(comment.id)} className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies tree */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-800 space-y-2 pt-2 mt-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="p-2 rounded bg-background/80 space-y-1 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-foreground">{reply.userName}</span>
                                <span className="text-[10px] text-muted-foreground">{reply.date}</span>
                              </div>
                              <p className="text-muted-foreground">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* List & Hub View */
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 text-white shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 text-[10px]">Community Hub</Badge>
                  <span className="text-xs text-blue-200">Authentic Student Voices & Policies</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  CareerMap Student Articles & Blogs
                </h1>
                <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
                  Real campus insights, course selection dilemmas, hostel truths, and National Education Policy updates written by verified students and educational researchers.
                </p>
              </div>

              <Button
                onClick={() => {
                  if (!storedStudent) {
                    window.dispatchEvent(new CustomEvent("open-student-account-modal"));
                    return;
                  }
                  setIsCreating(!isCreating);
                  setEditingPostId(null);
                }}
                className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs gap-1.5 h-9 flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
                {isCreating ? "Cancel" : "Write an Article"}
              </Button>
            </div>

            {/* Create/Edit Article Modal Form */}
            {isCreating && (
              <Card className="border border-blue-200 dark:border-blue-900 bg-card shadow-md p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    {editingPostId ? "Edit Your Article" : "Write a New Community Article"}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    Author: {storedStudent?.name || "Student"}
                  </Badge>
                </div>

                <form onSubmit={handlePublishPost} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-foreground">Article Title *</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 5 Things You Must Inspect in College Hostels Before Admission"
                      className="mt-1 h-9 text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-foreground">Topic Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as BlogCategory)}
                        className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
                      >
                        <option value="choosing_courses">Course Selection</option>
                        <option value="college_life">College Life Realities</option>
                        <option value="hostel_facilities">Hostel & Facilities</option>
                        <option value="nep_updates">NEP 2020 Updates</option>
                        <option value="career_realities">Career Realities</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-foreground">Tags (comma separated)</label>
                      <Input
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="e.g. Engineering, Hostel, Coding, NEP 2020"
                        className="mt-1 h-9 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-foreground">Summary (1-2 sentences)</label>
                    <Input
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Brief overview shown on cards..."
                      className="mt-1 h-9 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-foreground">Full Article Content (paragraphs, bullet points) *</label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your authentic experiences, pros, cons, and tips for future students..."
                      className="mt-1 text-xs min-h-[160px]"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)} className="text-xs">
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5">
                      <Send className="h-3.5 w-3.5" /> {editingPostId ? "Save Changes" : "Publish to Community"}
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Filter Pills & Search */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        selectedCategory === cat.id
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-card hover:bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles by title or tag..."
                    className="text-xs h-8 pl-8"
                  />
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer border border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between bg-card/90"
                >
                  <CardHeader className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {post.categoryLabel}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readingTimeMinutes}m
                      </span>
                    </div>

                    <CardTitle className="text-sm font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-0 border-t border-border/40 mt-auto">
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3">
                      <div className="truncate max-w-[140px]">
                        <span className="font-semibold text-foreground text-[11px]">{post.authorName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> {post.comments.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 border rounded-xl bg-card text-xs text-muted-foreground">
                No articles found matching "{searchQuery}". Be the first to publish one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
