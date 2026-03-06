import { prisma } from '@/lib/prisma';
import { PageTransition } from '@/components/PageTransition';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default async function ContactPage() {
  const socials = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

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
                <p>hprince430@gmail.com</p>
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

          {/* Web3Forms Contact Form */}
          <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-medium mb-6">Send a Message</h2>
            <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-5">
              {/* Replace with actual Web3Forms Access Key for hprince430@gmail.com */}
              <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
              <input type="hidden" name="subject" value="New Submission from Writer Portfolio" />
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none resize-y"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black font-medium p-3 rounded-xl hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
