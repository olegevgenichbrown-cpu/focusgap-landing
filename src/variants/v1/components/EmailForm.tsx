import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

interface EmailFormProps {
  buttonText?: string;
  className?: string;
}

const EmailForm = ({ buttonText = "JOIN THE VIP LIST — GET 15% OFF", className = "" }: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 max-w-md ${className}`}
    >
      <div className="relative flex-1">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" strokeWidth={1.5} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 museo-body focus:outline-none focus:border-white/30 transition-colors"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitted}
        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#050505] museo-label text-sm hover:bg-white/90 transition-colors disabled:opacity-70 whitespace-nowrap"
      >
        {isSubmitted ? (
          <>
            <Check className="w-5 h-5" strokeWidth={1.5} />
            You're in!
          </>
        ) : (
          <>
            {buttonText}
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm;
