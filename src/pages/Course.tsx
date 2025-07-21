import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, PlayCircle, CheckCircle, Trophy, Clock, Users, Star, Lock } from "lucide-react";

// Mock course data - in real app, this would come from API
const courseData = {
  "python-basics": {
    id: "python-basics",
    title: "Python Programming Fundamentals",
    description: "Learn Python from scratch with hands-on projects and real-world applications.",
    instructor: "Tech Academy",
    duration: "8 hours",
    students: "50K+",
    rating: 4.8,
    difficulty: "Beginner",
    playlistUrl: "https://www.youtube.com/embed/videoseries?list=PLZPZq0r_RZOMhCAyywfnYLlrjiVOkdAI1",
    videos: [
      { id: 1, title: "Introduction to Python", duration: "15:30", completed: false },
      { id: 2, title: "Variables and Data Types", duration: "22:45", completed: false },
      { id: 3, title: "Control Structures - If/Else", duration: "18:20", completed: false },
      { id: 4, title: "Loops in Python", duration: "25:10", completed: false },
      { id: 5, title: "Functions and Modules", duration: "30:15", completed: false },
      { id: 6, title: "Lists and Dictionaries", duration: "28:40", completed: false },
      { id: 7, title: "File Handling", duration: "20:25", completed: false },
      { id: 8, title: "Error Handling", duration: "16:50", completed: false },
      { id: 9, title: "Object-Oriented Programming", duration: "35:20", completed: false },
      { id: 10, title: "Final Project", duration: "40:30", completed: false }
    ]
  }
  // Add other courses here...
};

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);
  const [currentVideo, setCurrentVideo] = useState(1);
  
  const course = courseData[id as keyof typeof courseData];
  
  useEffect(() => {
    // Load watched videos from localStorage
    const saved = localStorage.getItem(`course-${id}-progress`);
    if (saved) {
      setWatchedVideos(JSON.parse(saved));
    }
  }, [id]);

  const handleVideoToggle = (videoId: number) => {
    const newWatchedVideos = watchedVideos.includes(videoId)
      ? watchedVideos.filter(v => v !== videoId)
      : [...watchedVideos, videoId];
    
    setWatchedVideos(newWatchedVideos);
    localStorage.setItem(`course-${id}-progress`, JSON.stringify(newWatchedVideos));
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progress = (watchedVideos.length / course.videos.length) * 100;
  const allVideosWatched = watchedVideos.length === course.videos.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{course.title}</h1>
                <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-lg font-semibold">{Math.round(progress)}%</div>
              </div>
              <Button 
                variant={allVideosWatched ? "success" : "outline"} 
                disabled={!allVideosWatched}
                asChild={allVideosWatched}
              >
                {allVideosWatched ? (
                  <Link to={`/quiz/${course.id}`}>
                    <Trophy className="h-4 w-4 mr-2" />
                    Start Quiz
                  </Link>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Complete All Videos
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-t-lg"
                    src={course.playlistUrl}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{course.title}</h2>
                    <Badge variant="secondary">{course.difficulty}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Videos Completed</span>
                      <span>{watchedVideos.length} of {course.videos.length}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  {allVideosWatched ? (
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <div className="flex items-center text-success">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">All videos completed!</span>
                      </div>
                      <p className="text-sm text-success/80 mt-1">
                        You can now take the certification quiz.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-muted/50 border border-border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        Complete all videos to unlock the certification quiz.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Course Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-3">
                  {course.videos.map((video) => {
                    const isWatched = watchedVideos.includes(video.id);
                    return (
                      <div
                        key={video.id}
                        className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                          currentVideo === video.id ? 'bg-primary/5 border-primary/20' : 'border-border'
                        }`}
                        onClick={() => setCurrentVideo(video.id)}
                      >
                        <Checkbox
                          checked={isWatched}
                          onCheckedChange={() => handleVideoToggle(video.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium line-clamp-2 ${
                            isWatched ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}>
                            {video.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {video.duration}
                          </p>
                        </div>
                        {isWatched && (
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;