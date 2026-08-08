import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { submitContactMessage } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Workshop | Kaaru Woodcraft" },
      {
        name: "description",
        content:
          "Questions about a piece, an order or a commission? Reach the Kaaru workshop in Bengaluru by phone, email or the contact form.",
      },
      { property: "og:title", content: "Contact Kaaru Woodcraft" },
      { property: "og:description", content: "Reach our Bengaluru workshop directly." },
    ],
  }),
  component: Contact,
});

const schema = {
  name: (value) => value.trim().length >= 2 ? null : "Enter your name",
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid email",
  subject: (value) => value.trim().length >= 2 ? null : "Add a subject",
  message: (value) => value.trim().length >= 10 ? null : "A little more detail, please"
};

function Contact() {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = Object.fromEntries(new FormData(form));
    let next = {};
    for (const key in schema) {
      if (!schema[key](parsed[key])) {
        next[key] = schema[key](parsed[key]);
      }
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setErrors({});
    setSubmitting(true);
    try {
      await submitContactMessage(parsed);
      form.reset();
      toast.success("Message sent — we usually reply within a day.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-14 md:py-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display-lg mt-4">Talk to the workshop.</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Not a call centre — the person who replies is usually the person holding the chisel.
            We read everything and answer within one working day.
          </p>

          <div className="mt-10 flex flex-col gap-6 text-sm">
            <Detail icon={MapPin} title="Workshop">
              The Workshop, 14 Mill Road
              <br />
              Bengaluru, Karnataka 560001
              <br />
              Open Mon–Sat, 10am – 6pm
            </Detail>
            <Detail icon={Phone} title="Phone">
              +91 98450 11223
            </Detail>
            <Detail icon={Mail} title="Email">
              hello@kaaruwoodcraft.in
            </Detail>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="surface-card grid gap-5 p-6 sm:grid-cols-2 md:p-8">
            <Field name="name" label="Name" error={errors["name"]} />
            <Field name="email" label="Email" type="email" error={errors["email"]} />
            <Field name="subject" label="Subject" error={errors["subject"]} className="sm:col-span-2" />
            <div className="sm:col-span-2">
              <Label htmlFor="message" className="text-xs text-muted-foreground">
                Message
              </Label>
              <Textarea id="message" name="message" rows={6} className="mt-2 rounded-xl bg-background" />
              {errors["message"] && (
                <p className="mt-1.5 text-xs text-destructive">{errors["message"]}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={submitting} className="h-12 rounded-full px-8">
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

function Field({ name, label, type = "text", error, className }) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} type={type} className="mt-2 h-11 rounded-xl bg-background" />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}