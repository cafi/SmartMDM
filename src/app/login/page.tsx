import Image from 'next/image';
import Link from 'next/link';
import { Database, GanttChartSquare } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <div className="absolute inset-0 bg-primary/80" />
        {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            data-ai-hint={loginImage.imageHint}
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
        <div className="absolute top-0 left-0 right-0 p-8">
            <Link href="/" className="flex items-center gap-2 text-primary-foreground">
                <GanttChartSquare className="h-8 w-8" />
                <span className="text-xl font-bold font-headline">Smart MDM</span>
            </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
            <div className="max-w-md">
                <h2 className="text-2xl font-semibold font-headline">Master Your Data Universe</h2>
                <p className="mt-2 text-base text-primary-foreground/80">The ultimate solution for cleansing, standardizing, and governing your enterprise master data with the power of AI.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
