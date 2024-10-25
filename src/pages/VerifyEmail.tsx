import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const { currentUser, sendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      if (currentUser?.emailVerified) {
        try {
          await setDoc(doc(db, 'waitinglist', currentUser.uid), {
            email: currentUser.email,
            verifiedAt: new Date().toISOString(),
          });
          navigate('/dashboard');
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to save user data.",
          });
        }
      }
    };

    const interval = setInterval(() => {
      currentUser?.reload().then(checkVerification);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentUser, navigate, toast]);

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      await sendVerificationEmail();
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification email.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Verify Your Email</h2>
        <p className="text-gray-300 mb-6">
          We've sent a verification email to your inbox. Please verify your email to continue.
        </p>
        <Button
          onClick={handleResendEmail}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </Button>
      </div>
    </div>
  );
}