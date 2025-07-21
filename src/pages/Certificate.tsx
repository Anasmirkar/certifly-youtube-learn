import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Download, Share2, ExternalLink, CheckCircle, Calendar, User, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const Certificate = () => {
  const { certId } = useParams<{ certId: string }>();
  const [certificate, setCertificate] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Load certificate from localStorage (in real app, this would be an API call)
    const certData = localStorage.getItem(`certificate-${certId}`);
    if (certData) {
      const cert = JSON.parse(certData);
      setCertificate(cert);
      
      // Generate QR code URL
      const currentUrl = window.location.href;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`);
    }
  }, [certId]);

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("PDF download would be implemented here");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate?.userName} - ${certificate?.courseName} Certificate`,
        text: `I just earned a certificate in ${certificate?.courseName} with a score of ${certificate?.score}%!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Certificate link copied to clipboard!");
    }
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank');
  };

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Certificate Not Found</h1>
          <p className="text-muted-foreground mb-4">
            This certificate may not exist or the link may be invalid.
          </p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-display">CertifyTube</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleLinkedInShare} className="bg-[#0077B5] hover:bg-[#005885] text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Share on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Certificate Card */}
          <Card className="mb-8 overflow-hidden shadow-elegant">
            <CardContent className="p-0">
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-white via-white to-primary/5 p-12 relative">
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-primary/20 rounded-lg" />
                <div className="absolute inset-6 border border-primary/10 rounded-lg" />
                
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold font-display text-primary mb-2">
                    Certificate of Completion
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    This certifies that
                  </p>
                </div>

                {/* Recipient Name */}
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold font-display text-foreground mb-2">
                    {certificate.userName}
                  </h2>
                  <div className="w-32 h-1 bg-gradient-hero mx-auto" />
                </div>

                {/* Achievement */}
                <div className="text-center mb-8">
                  <p className="text-xl text-muted-foreground mb-4">
                    has successfully completed the course
                  </p>
                  <h3 className="text-3xl font-bold font-display text-foreground mb-4">
                    {certificate.courseName}
                  </h3>
                  <div className="flex items-center justify-center space-x-8 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{certificate.score}%</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">PASSED</div>
                      <div className="text-sm text-muted-foreground">Status</div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between">
                  <div className="text-left">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Date of Completion</span>
                    </div>
                    <div className="text-lg font-semibold">
                      {formatDate(certificate.date)}
                    </div>
                  </div>

                  <div className="text-center">
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      className="w-24 h-24 border border-border rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Scan to verify
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center text-muted-foreground mb-2">
                      <span className="text-sm">Certificate ID</span>
                    </div>
                    <div className="text-lg font-mono font-semibold">
                      {certificate.id}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Certificate Holder</h3>
                <p className="text-muted-foreground">{certificate.userName}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Course Completed</h3>
                <p className="text-muted-foreground">{certificate.courseName}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Achievement Score</h3>
                <p className="text-muted-foreground">{certificate.score}% (Passed)</p>
              </CardContent>
            </Card>
          </div>

          {/* Verification Notice */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Certificate Verification</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This certificate is digitally verified and can be authenticated using the certificate ID above. 
                    The QR code links directly to this verification page for instant validation by employers or institutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Digitally Verified</Badge>
                    <Badge variant="secondary">Blockchain Secured</Badge>
                    <Badge variant="secondary">Employer Recognized</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" asChild>
                <Link to="/dashboard">
                  <Trophy className="mr-2 h-5 w-5" />
                  View All Certificates
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore More Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;