import { prisma } from '@/lib/prisma';
import { PageTransition } from '@/components/PageTransition';
import { Mail, MessageCircle } from 'lucide-react';
import NewsletterForm from '@/components/NewsletterForm';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  let socials = null;
  try {
    socials = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  } catch (error) {
    console.error("Skipping DB fetch for Contact page: Database is unreachable.");
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-500 mb-16 font-serif max-w-2xl">
          Whether you want to discuss a project, share a thought, or just say hello, my inbox is always open.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-medium mb-6">Contact Information</h2>

            <div className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
              <div className="p-3 bg-gray-50 dark:bg-[#111] rounded-full shrink-0">
                <Mail size={20} className="text-black dark:text-white" />
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white mb-1">Email</h3>
                <p>henrynibenang@yahoo.com</p>
              </div>
            </div>

            {socials?.whatsapp && (
              <div className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                <div className="p-3 bg-gray-50 dark:bg-[#111] rounded-full shrink-0">
                  <MessageCircle size={20} className="text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-black dark:text-white mb-1">WhatsApp</h3>
                  <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">
                    {socials.whatsapp}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* Newsletter Subscription Section */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 border-dashed pt-8">
          <NewsletterForm />
        </div>
      </div>
    </PageTransition>
  );
}
