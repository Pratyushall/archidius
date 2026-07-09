import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-display text-2xl font-bold">ArchiDius</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Pioneering self-sufficient, sustainable architecture for a better
              tomorrow.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Work",
                "Philosophy",
                "Innovation",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Residential Design",
                "Commercial Projects",
                "Urban Planning",
                "Sustainability Consulting",
                "Miniature Models",
                "Research & Development",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-400">
                  Archidius
                  <br />
                  Hyderabad, 500065
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  +91 9887 978 876
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:hello@archidius.com"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  hello@archidius.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ArchiDius. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
