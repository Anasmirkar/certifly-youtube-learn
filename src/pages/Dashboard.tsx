import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, BookOpen, Calendar, Download, Share2, Star, TrendingUp, Award, Clock } from "lucide-react";

const Dashboard = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [inProgress, setInProgress] = useState<any[]>([]);

  useEffect(() => {
    // Load certificates from localStorage
    const certs: any[] = [];
    const progress: any[] = [];
    
    // Get all certificates
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('certificate-')) {
        const certData = localStorage.getItem(key);
        if (certData) {
          certs.push(JSON.parse(certData));
        }
      }
    }

    // Mock in-progress courses
    progress.push(
      {
        id: "python-basics",
        title: "Python Programming Fundamentals",
        progress: 70,
        videosWatched: 7,
        totalVideos: 10,
        lastAccessed: "2025-01-20",
      },
      {
        id: "web-development", 
        title: "Complete Web Development",
        progress: 25,
        videosWatched: 9,
        totalVideos: 35,
        lastAccessed: "2025-01-18",
      }
    );

    setCertificates(certs);
    setInProgress(progress);
  }, []);

  const stats = {
    totalCertificates: certificates.length,
    averageScore: certificates.length > 0 
      ? Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length)
      : 0,
    coursesInProgress: inProgress.length,
    totalHoursLearned: 45 // Mock data
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-display">CertifyTube</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Explore Courses</Link>
              </Button>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your learning progress and showcase your achievements
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Certificates Earned</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalCertificates}</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Score</p>
                  <p className="text-3xl font-bold text-success">{stats.averageScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">In Progress</p>
                  <p className="text-3xl font-bold text-secondary">{stats.coursesInProgress}</p>
                </div>
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hours Learned</p>
                  <p className="text-3xl font-bold text-purple-500">{stats.totalHoursLearned}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">My Certificates</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            {certificates.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    Complete your first course and pass the quiz to earn your first certificate!
                  </p>
                  <Button asChild>
                    <Link to="/">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Courses
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="group hover:shadow-card transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary">{cert.score}%</Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {cert.courseName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Completed on {new Date(cert.date).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">Certified</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-mono">
                          {cert.id}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link to={`/certificate/${cert.id}`}>
                            View Certificate
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* In Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {inProgress.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses in progress</h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    Start a new course to begin your learning journey!
                  </p>
                  <Button asChild>
                    <Link to="/">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Courses
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {inProgress.map((course) => (
                  <Card key={course.id} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">{course.progress}% Complete</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{course.videosWatched} of {course.totalVideos} videos</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1" asChild>
                            <Link to={`/course/${course.id}`}>
                              Continue Learning
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">First Certificate</h3>
                  <p className="text-sm text-muted-foreground">
                    {certificates.length > 0 ? "Unlocked!" : "Complete your first course"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-success/10 to-success/5">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">High Achiever</h3>
                  <p className="text-sm text-muted-foreground">
                    {stats.averageScore >= 90 ? "Unlocked!" : "Get 90%+ average score"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Course Collector</h3>
                  <p className="text-sm text-muted-foreground">
                    {certificates.length >= 5 ? "Unlocked!" : "Complete 5 courses"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;