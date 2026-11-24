/**
 * CareerMap Student & Community Blogs Dataset & Management Subsystem
 * 
 * Provides an authentic forum for:
 * 1. Students sharing ground-reality experiences (campus life, course dilemmas, hostel truths)
 * 2. Career & education policy updates (NEP 2020, admission counseling)
 * 3. Threaded discussions & replies
 * 4. Author self-editing capabilities
 */

export interface BlogComment {
  id: string;
  userName: string;
  userRole?: string;
  comment: string;
  date: string;
  likes: number;
  replies?: BlogComment[];
}

export type BlogCategory =
  | "college_life"
  | "choosing_courses"
  | "hostel_facilities"
  | "nep_updates"
  | "career_realities";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  categoryLabel: string;
  summary: string;
  content: string; // Markdown/formatted text paragraphs
  authorName: string;
  authorRole: string; // e.g. "B.Tech CSE Student (3rd Year)", "Verified Alumnus", "Admin Editorial"
  authorEmail?: string;
  date: string;
  readingTimeMinutes: number;
  tags: string[];
  likes: number;
  comments: BlogComment[];
  pinned?: boolean;
}

const BLOGS_STORAGE_KEY = "careermap_community_blogs_v1";

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog_1",
    title: "Ground Reality: How to Choose Between College Brand vs Core Branch in 2026",
    slug: "college-brand-vs-core-branch-guide",
    category: "choosing_courses",
    categoryLabel: "Course Selection",
    summary:
      "A deep dive into whether graduating with a top brand tag (like IIT/NIT/BITS) in a lower branch beats choosing Computer Science at a premier state or private university.",
    content: `Every engineering and professional aspirant faces the ultimate dilemma: Should you take an old IIT in Metallurgy/Chemical, or Computer Science at a top state/private institute like DTU, NSUT, or BITS?

Here is what 4 years on campus taught us:

1. The Peer Group & Brand Value
The top-tier institution alumni network opens doors for the first 3-5 years. Companies recruiting for quantitative finance, management consulting, and leadership tracks often conduct closed campus visits restricted to premier institutes regardless of your branch.

2. Coding & Software Reality
Over 75% of non-tech branch students in top colleges study Data Structures and Algorithms independently. If you choose a branch you dislike, managing a 7.5+ CGPA while preparing for software hackathons requires double the discipline.

3. The Industry Shift (AI & Interdisciplinary Engineering)
Under the National Education Policy (NEP 2020), multi-disciplinary minors and open electives are now standard. You can major in Mechanical and minor in Artificial Intelligence and Machine Learning.

Actionable Advice for Aspirants:
- If your goal is strictly Software Development, taking CSE/IT at a reputable college gives you 4 years of dedicated curriculum and lab hours.
- If your goal is entrepreneurship, higher studies abroad, product management, or civil services, the premier brand and diverse alumni community provide an unbeatable runway.`,
    authorName: "Aman Verma",
    authorRole: "B.Tech Final Year • IIT Delhi Alumnus",
    authorEmail: "aman.v@alumni.iitd.ac.in",
    date: "November 20, 2026",
    readingTimeMinutes: 5,
    tags: ["Engineering", "Branch Dilemma", "IIT", "CSE", "Career Guidance"],
    likes: 42,
    pinned: true,
    comments: [
      {
        id: "c_1",
        userName: "Priya S.",
        userRole: "Class 12th Aspirant",
        comment:
          "This was the most honest comparison I have read. Family was pressurizing me to take any branch just for the tag, but coding is my passion. Thank you for this clarity!",
        date: "2 days ago",
        likes: 12,
        replies: [
          {
            id: "c_1_1",
            userName: "Aman Verma",
            userRole: "Author",
            comment:
              "Glad this helped! Always prioritize your genuine aptitude — genuine passion in a field compounds into mastery.",
            date: "1 day ago",
            likes: 6,
          },
        ],
      },
      {
        id: "c_2",
        userName: "Vikram Rathore",
        userRole: "Parent of Class 12 Student",
        comment:
          "Very balanced perspective on the NEP 2020 multidisciplinary minor option.",
        date: "Yesterday",
        likes: 5,
      },
    ],
  },
  {
    id: "blog_2",
    title: "Hostel, Mess & Ground Reality: What College Prospectuses Never Show You",
    slug: "hostel-mess-and-campus-realities",
    category: "hostel_facilities",
    categoryLabel: "Hostel & Facilities",
    summary:
      "A candid breakdown of Wi-Fi limits, laundry facilities, mess food quality, and medical aid that prospective students need to inspect before paying the deposit.",
    content: `Colleges love printing photos of manicured botanical lawns and air-conditioned reception foyers. But as a residential student, your actual day-to-day life is dictated by the hostel and mess.

Here are the 4 crucial things you must check before freezing your admission:

1. The True Mess Food Cycle
Ask current second-year students about Wednesday and Sunday menus. The best colleges operate student-run Mess Committees where students directly audit grocery quality, hygiene scores, and vendor billing.

2. Wi-Fi Bandwidth & Library Timings
Does the Wi-Fi throttle streaming or coding repositories? Top research requires uninhibited access to IEEE, ACM, Springer journals and cloud compute containers. Check if the reading hall stays open 24/7 during midterm examinations.

3. On-Campus Healthcare & Emergency Readiness
A verified college campus must feature a 24-hour dispensary, a dedicated ambulance on standby, and established tie-ups with multi-specialty regional hospitals within a 15-minute radius.

4. Laundry, Drinking Water & Sanitation
Look out for RO water purification plants with scheduled TDS filter audits, automatic washing machine clusters, and clean washroom maintenance logs.

Always ask to tour the student hostels during physical campus visits — it tells you everything about how an administration treats its students.`,
    authorName: "Divya Mishra",
    authorRole: "Hostel Committee Head • Lucknow University",
    date: "November 18, 2026",
    readingTimeMinutes: 4,
    tags: ["Campus Life", "Hostel Reality", "Mess Food", "Student Health"],
    likes: 38,
    comments: [
      {
        id: "c_3",
        userName: "Karan Johar",
        userRole: "First Year Student",
        comment:
          "Spot on! In our college the student mess committee changed the vendor last month and food quality improved 2x.",
        date: "3 days ago",
        likes: 9,
      },
    ],
  },
  {
    id: "blog_3",
    title: "Demystifying NEP 2020: Multiple Entry & Exit Options Explained Simply",
    slug: "nep-2020-higher-education-explained",
    category: "nep_updates",
    categoryLabel: "NEP Policy Updates",
    summary:
      "Understanding certificates after Year 1, diplomas after Year 2, and 4-year research degrees with Academic Bank of Credits (ABC ID).",
    content: `The National Education Policy (NEP 2020) has transformed Indian undergraduate education. Here is what you need to know about how your degree works today:

1. Academic Bank of Credits (ABC ID)
Every student now has a unique DigiLocker-linked ABC ID. Every credit earned in theory classes, lab practicums, or online SWAYAM/NPTEL certifications is digitally stored.

2. Multiple Entry & Exit Flexibility:
- Year 1 Completion: Undergraduate Certificate in Discipline
- Year 2 Completion: Undergraduate Diploma
- Year 3 Completion: Bachelor's Degree
- Year 4 Completion: Bachelor's Degree with Honors / Research

3. Direct PhD Eligibility
Students completing the 4-year Bachelor's degree with minimum 7.5 CGPA can now qualify directly for PhD programs without a separate 2-year Master's degree, saving valuable academic years!

Stay informed and verify that your prospective institution has formally aligned its credit framework with the UGC Curriculum and Credit Framework.`,
    authorName: "CareerMap Research Team",
    authorRole: "Editorial & Policy Analyst",
    date: "November 15, 2026",
    readingTimeMinutes: 3,
    tags: ["NEP 2020", "UGC", "ABC ID", "Higher Education"],
    likes: 54,
    comments: [],
  },
];

export function loadBlogPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error loading blog posts:", e);
  }
  // Initialize with initial blogs
  saveBlogPosts(INITIAL_BLOGS);
  return INITIAL_BLOGS;
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Error saving blog posts:", e);
  }
}

export function createBlogPost(newPost: Omit<BlogPost, "id" | "slug" | "date" | "likes" | "comments">): BlogPost {
  const posts = loadBlogPosts();
  const id = "blog_" + Date.now();
  const slug = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  
  const post: BlogPost = {
    ...newPost,
    id,
    slug,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    likes: 0,
    comments: [],
  };

  posts.unshift(post);
  saveBlogPosts(posts);
  return post;
}

export function updateBlogPost(updated: BlogPost): void {
  const posts = loadBlogPosts();
  const idx = posts.findIndex((p) => p.id === updated.id);
  if (idx !== -1) {
    posts[idx] = updated;
    saveBlogPosts(posts);
  }
}

export function deleteBlogPost(id: string): void {
  const posts = loadBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  saveBlogPosts(filtered);
}

export function addBlogComment(
  blogId: string,
  commentData: { userName: string; userRole?: string; comment: string; parentCommentId?: string }
): void {
  const posts = loadBlogPosts();
  const post = posts.find((p) => p.id === blogId);
  if (!post) return;

  const newComment: BlogComment = {
    id: "bc_" + Date.now(),
    userName: commentData.userName,
    userRole: commentData.userRole || "Student",
    comment: commentData.comment,
    date: "Just now",
    likes: 0,
    replies: [],
  };

  if (commentData.parentCommentId) {
    const addToParent = (list: BlogComment[]): boolean => {
      for (const c of list) {
        if (c.id === commentData.parentCommentId) {
          c.replies = c.replies || [];
          c.replies.push(newComment);
          return true;
        }
        if (c.replies && c.replies.length > 0) {
          if (addToParent(c.replies)) return true;
        }
      }
      return false;
    };
    addToParent(post.comments);
  } else {
    post.comments.unshift(newComment);
  }

  saveBlogPosts(posts);
}

export function likeBlogPost(id: string): void {
  const posts = loadBlogPosts();
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    saveBlogPosts(posts);
  }
}

export function likeBlogComment(blogId: string, commentId: string): void {
  const posts = loadBlogPosts();
  const post = posts.find((p) => p.id === blogId);
  if (!post) return;

  const likeInList = (list: BlogComment[]): boolean => {
    for (const c of list) {
      if (c.id === commentId) {
        c.likes = (c.likes || 0) + 1;
        return true;
      }
      if (c.replies && c.replies.length > 0) {
        if (likeInList(c.replies)) return true;
      }
    }
    return false;
  };

  likeInList(post.comments);
  saveBlogPosts(posts);
}
