import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Users, Clock, Star, Trophy, BookOpen, Code, Laptop, Brain, Palette, TrendingUp, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const courses = [
  {
    id: "python-basics",
    title: "Python Programming Fundamentals",
    description: "Learn Python from scratch with hands-on projects and real-world applications.",
    duration: "8 hours",
    students: "50K+",
    rating: 4.8,
    difficulty: "Beginner",
    icon: Code,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZOMhCAyywfnYLlrjiVOkdAI1",
    videos: 25,
    color: "from-primary to-secondary"
  },
  {
    id: "web-development",
    title: "Complete Web Development",
    description: "Master HTML, CSS, JavaScript, and React to build modern web applications.",
    duration: "12 hours",
    students: "75K+",
    rating: 4.9,
    difficulty: "Intermediate",
    icon: Laptop,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZONjFgGVLl-6XKJDL",
    videos: 35,
    color: "from-success to-primary"
  },
  {
    id: "machine-learning",
    title: "Machine Learning Essentials",
    description: "Dive into AI and ML with practical examples using Python and popular libraries.",
    duration: "15 hours",
    students: "30K+",
    rating: 4.7,
    difficulty: "Advanced",
    icon: Brain,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZOML-basics",
    videos: 40,
    color: "from-secondary to-primary"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Principles",
    description: "Create beautiful and user-friendly designs with Figma and design thinking.",
    duration: "6 hours",
    students: "25K+",
    rating: 4.6,
    difficulty: "Beginner",
    icon: Palette,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZOUIUX",
    videos: 18,
    color: "from-secondary to-success"
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    description: "Analyze data, create visualizations, and extract insights from complex datasets.",
    duration: "10 hours",
    students: "40K+",
    rating: 4.8,
    difficulty: "Intermediate",
    icon: TrendingUp,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZODS",
    videos: 30,
    color: "from-primary to-secondary"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    description: "Learn SEO, social media marketing, and online advertising strategies.",
    duration: "7 hours",
    students: "35K+",
    rating: 4.5,
    difficulty: "Beginner",
    icon: BookOpen,
    playlistUrl: "https://youtube.com/playlist?list=PLZPZq0r_RZODM",
    videos: 22,
    color: "from-success to-primary"
  }
];

const Index = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-display text-foreground">CertifyTube</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:50px_50px] opacity-20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 animate-fade-in" variant="secondary">
              🎓 Free Learning, Real Certificates
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-display text-foreground mb-6 animate-fade-in">
              Get Certified for 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> YouTube Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Transform your YouTube education into recognized achievements. Complete curated playlists, 
              pass our quizzes, and earn professional certificates that showcase your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button size="xl" variant="hero" className="animate-glow">
                <PlayCircle className="mr-2 h-5 w-5" />
                Choose a Course to Begin
              </Button>
              <Button size="xl" variant="outline">
                <Trophy className="mr-2 h-5 w-5" />
                View Sample Certificate
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">250K+</div>
              <div className="text-muted-foreground">Students Certified</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Course Topics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-foreground mb-4">
              Popular Certification Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our carefully curated YouTube playlists. 
              Each course includes comprehensive content and a certification quiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Card 
                  key={course.id} 
                  className="group hover:shadow-card transition-all duration-300 hover:scale-105 animate-fade-in border-border/50"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mb-2">
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-success text-success mr-1" />
                        {course.rating}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2">
                      {course.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </div>
                      <div className="flex items-center">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        {course.videos} videos
                      </div>
                    </div>

                    <Button 
                      variant="course" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      asChild
                    >
                      <Link to={`/course/${course.id}`}>
                        Start Course
                        <PlayCircle className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-foreground mb-4">
            Ready to Earn Your First Certificate?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have already transformed their YouTube education into recognized credentials.
          </p>
          <Button size="xl" variant="hero" className="animate-glow">
            <Trophy className="mr-2 h-5 w-5" />
            Start Learning Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold font-display">CertifyTube</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 CertifyTube. Transforming YouTube learning into professional credentials.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
