import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  Phone,
  MessageCircle,
  Facebook,
  Home as HomeIcon,
  Maximize2,
  BedDouble,
  Bath,
  Key,
  Shield,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Building2,
  Clock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const formSchema = z.object({
  nama: z.string().min(2, "Sila masukkan nama penuh"),
  telefon: z.string().min(9, "Sila masukkan nombor telefon yang sah"),
  emel: z.string().email("Sila masukkan alamat emel yang sah"),
  lokasi: z.string().min(2, "Sila masukkan lokasi semasa"),
  pendapatan: z.string().min(1, "Sila pilih anggaran pendapatan"),
  status: z.string().min(1, "Sila pilih status pembeli"),
  cara: z.string().min(1, "Sila pilih cara dihubungi"),
  catatan: z.string().optional(),
  setuju: z.boolean().refine((val) => val === true, {
    message: "Sila berikan persetujuan anda",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Lead submitted:", data);
    setSubmitted(true);
    reset();
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg leading-none">P</span>
            </div>
            <div className="leading-none">
              <p className="font-serif font-semibold text-sm text-foreground">PIJ Property</p>
              <p className="text-xs text-muted-foreground">Development Sdn Bhd</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#projek" className="text-muted-foreground hover:text-primary transition-colors">Projek</a>
            <a href="#spesifikasi" className="text-muted-foreground hover:text-primary transition-colors">Spesifikasi</a>
            <a href="#lokasi" className="text-muted-foreground hover:text-primary transition-colors">Lokasi</a>
            <a href="#permohonan" className="text-muted-foreground hover:text-primary transition-colors">Cara Mohon</a>
          </div>
          <button
            onClick={scrollToForm}
            className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Daftar Minat
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Taman Perbadanan Islam Rengit"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-secondary-foreground rounded-full animate-pulse" />
              Unit Terhad — Untuk Dijual
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            >
              Taman
              <br />
              Perbadanan
              <br />
              <span className="text-secondary">Islam</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/80 text-xl font-medium mb-2 tracking-wide"
            >
              Rengit, Johor — RMMJ-D
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/70 text-base mb-10 leading-relaxed"
            >
              Teres 2 Tingkat mewah bertitlkan Freehold Rezab Melayu. Rumah impian anda bermula dari{" "}
              <span className="text-secondary font-bold text-xl">RM300,000</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToForm}
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded font-bold text-base hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
              >
                Daftar Sekarang
              </button>
              <a
                href="https://wa.me/60124346073"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 backdrop-blur text-white px-8 py-4 rounded font-semibold text-base hover:bg-white/25 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Kami
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
          >
            <span className="text-xs tracking-widest uppercase">Tatal ke bawah</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-primary text-primary-foreground py-8" id="projek">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Harga Bermula", value: "RM300,000" },
              { label: "Jumlah Unit", value: "35 Unit" },
              { label: "Keluasan Bina", value: "1,400 kps" },
              { label: "CCC Dijangka", value: "Jun 2026" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-secondary">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── ABOUT PROJECT ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
              Tentang Projek
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold mt-3 mb-6 leading-tight text-foreground">
              Rumah Idaman, Hak Milik Seumur Hidup
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-6">
              Taman Perbadanan Islam di Rengit, Johor menawarkan peluang eksklusif untuk memiliki rumah teres 2 tingkat yang moden dan berkualiti di bawah skim Rumah Mampu Milik Johor (RMMJ) Jenis D. Dengan hanya 35 unit tersedia, ini adalah peluang yang tidak patut dilepaskan.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
              Dibangunkan oleh PIJ Property Development Sdn Bhd, projek ini menawarkan tanah bertitlkan Freehold Rezab Melayu — hak milik selama-lamanya untuk generasi anda. Lokasi strategik bersebelahan Sekolah Agama Seri Merlong memastikan kemudahan pendidikan dalam jangkauan anda.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {["Freehold", "Rezab Melayu", "Iklan Diluluskan JPN", "RMMJ-D"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-2 gap-4">
            <motion.div variants={fadeUp} className="row-span-2 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80"
                alt="Rumah Eksterior"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden h-40">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80"
                alt="Bilik Tidur"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden h-40">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                alt="Dapur"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section id="spesifikasi" className="bg-card py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
              Spesifikasi Unit
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold mt-3 text-foreground">
              Direka Untuk Keselesaan Anda
            </motion.h2>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: <BedDouble className="w-7 h-7" />, label: "Bilik Tidur", value: "3" },
              { icon: <Bath className="w-7 h-7" />, label: "Bilik Air", value: "2" },
              { icon: <Maximize2 className="w-7 h-7" />, label: "Keluasan Bina", value: "1,400 kps" },
              { icon: <HomeIcon className="w-7 h-7" />, label: "Keluasan Tanah", value: "1,400–2,763 kps" },
            ].map((spec) => (
              <motion.div
                key={spec.label}
                variants={fadeUp}
                className="bg-background rounded-2xl p-6 border border-border text-center hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {spec.icon}
                </div>
                <p className="font-serif text-2xl font-bold text-foreground mb-1">{spec.value}</p>
                <p className="text-muted-foreground text-sm">{spec.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>

          <AnimatedSection className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <h3 className="font-serif font-bold text-lg text-primary-foreground">Butiran Hartanah</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  ["Jenis Hartanah", "Teres 2 Tingkat (RMMJ-D)"],
                  ["Harga Minimum", "RM300,000"],
                  ["Harga Maksimum", "RM350,000"],
                  ["Jumlah Unit", "35 unit"],
                  ["Jenis Hakmilik", "Freehold (Selama-lamanya)"],
                  ["Status Tanah", "Rezab Melayu"],
                  ["Bebanan", "Tiada"],
                  ["CCC Dijangka", "Jun 2026"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground text-sm">{k}</span>
                    <span className="font-semibold text-sm text-foreground text-right">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-background rounded-2xl border border-border overflow-hidden">
              <div className="bg-secondary px-6 py-4">
                <h3 className="font-serif font-bold text-lg text-secondary-foreground">Maklumat Pemaju</h3>
              </div>
              <div className="p-6 space-y-3">
                {[
                  ["Pemaju", "PIJ Property Development Sdn Bhd"],
                  ["No. Pendaftaran", "199401037712 (323394-D)"],
                  ["No. Lesen Pemaju", "14409/05-2027/0870 (R)"],
                  ["Permit Iklan", "14409-4/02-2027/0119 (N)-(L)"],
                  ["Sah Sehingga", "05 Februari 2027"],
                  ["Pihak Berkuasa", "Majlis Perbandaran Batu Pahat"],
                  ["No. Kelulusan", "MPBP (24) 11/40/2018"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-start py-2 border-b border-border last:border-0 gap-4">
                    <span className="text-muted-foreground text-sm shrink-0">{k}</span>
                    <span className="font-semibold text-sm text-foreground text-right">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
            Galeri
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl font-bold mt-3 text-foreground">
            Gambaran Rumah Impian Anda
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-sm mt-2 italic">
            * Ilustrasi hiasan dalaman — tidak termasuk perabut
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80", alt: "Ruang Tamu" },
            { src: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80", alt: "Bilik Tidur Utama" },
            { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", alt: "Dapur" },
            { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", alt: "Bilik Air" },
            { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", alt: "Eksterior" },
            { src: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&q=80", alt: "Kawasan Perumahan" },
          ].map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`rounded-2xl overflow-hidden ${i === 0 || i === 5 ? "md:col-span-1" : ""} aspect-[4/3] group`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </AnimatedSection>
      </section>

      {/* ── LOCATION ── */}
      <section id="lokasi" className="bg-card py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
              Lokasi
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold mt-3 mb-6 text-foreground">
              Strategik & Berdekatan Kemudahan
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8">
              Terletak di Rengit, Johor — bersebelahan Sekolah Agama Seri Merlong — memberikan kemudahan pendidikan bagi keluarga anda.
            </motion.p>
            <AnimatedSection className="space-y-4">
              {[
                { icon: <MapPin className="w-5 h-5" />, title: "Bersebelahan", desc: "Sekolah Agama Seri Merlong, Rengit" },
                { icon: <Building2 className="w-5 h-5" />, title: "Pejabat Jualan", desc: "Aras 1, Bangunan PIJ Holdings, Jalan Bukit Timbalan, Johor Bahru" },
                { icon: <Clock className="w-5 h-5" />, title: "Waktu Operasi", desc: "Isnin – Jumaat, 9:00 pagi – 5:30 petang" },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-4 bg-background rounded-xl p-4 border border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatedSection>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
                alt="Kawasan Rengit Johor"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.a
              variants={fadeUp}
              href="https://maps.google.com/?q=Rengit+Johor"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <MapPin className="w-4 h-4" />
              Lihat di Google Maps
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section id="permohonan" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
            Cara Memohon
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold mt-3 text-foreground">
            Panduan Permohonan RMMJ
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Mohon melalui Portal PKPJ Johor. Proses mudah, hanya dalam beberapa langkah.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { step: "01", title: "Layari Portal Rasmi", desc: "Pergi ke pkpj.johor.gov.my" },
            { step: "02", title: "Daftar Akaun", desc: "Cipta ID pengguna dan kata laluan, kemudian log masuk" },
            { step: "03", title: "Isi Maklumat", desc: "Maklumat peribadi, pekerjaan, pendapatan dan tanggungan" },
            { step: "04", title: "Muat Naik Dokumen", desc: "Pastikan semua maklumat tepat sebelum hantar" },
            { step: "05", title: "Pilih Projek", desc: "Klik Portal Hartanah dan pilih Taman Perbadanan Islam" },
          ].map((s) => (
            <motion.div key={s.step} variants={fadeUp} className="relative">
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 hover:shadow-md transition-all">
                <span className="font-serif text-5xl font-bold text-primary/15">{s.step}</span>
                <h3 className="font-serif font-bold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center">
          <motion.a
            variants={fadeUp}
            href="https://pkpj.johor.gov.my"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
          >
            Mohon di Portal PKPJ
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </AnimatedSection>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section ref={formRef} className="bg-primary py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <motion.span variants={fadeUp} className="text-secondary text-xs font-bold uppercase tracking-widest">
              Hubungi Kami
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold mt-3 text-primary-foreground">
              Daftar Minat Sekarang
            </motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/70 mt-4">
              Pasukan jualan kami akan menghubungi anda secepat mungkin untuk maklumat lanjut.
            </motion.p>
          </AnimatedSection>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">Terima Kasih!</h3>
              <p className="text-primary-foreground/80">
                Borang anda telah berjaya dihantar. Pasukan kami akan menghubungi anda tidak lama lagi.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-secondary text-sm font-semibold hover:underline"
              >
                Hantar borang baru
              </button>
            </motion.div>
          ) : (
            <AnimatedSection>
              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Nama Penuh <span className="text-secondary">*</span>
                    </label>
                    <input
                      {...register("nama")}
                      type="text"
                      placeholder="Contoh: Ahmad bin Hassan"
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                    {errors.nama && <p className="text-secondary text-xs mt-1">{errors.nama.message}</p>}
                  </div>
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      No. Telefon / WhatsApp <span className="text-secondary">*</span>
                    </label>
                    <input
                      {...register("telefon")}
                      type="tel"
                      placeholder="Contoh: 012-345 6789"
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                    {errors.telefon && <p className="text-secondary text-xs mt-1">{errors.telefon.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Emel <span className="text-secondary">*</span>
                    </label>
                    <input
                      {...register("emel")}
                      type="email"
                      placeholder="nama@emel.com"
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                    {errors.emel && <p className="text-secondary text-xs mt-1">{errors.emel.message}</p>}
                  </div>
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Lokasi Semasa <span className="text-secondary">*</span>
                    </label>
                    <input
                      {...register("lokasi")}
                      type="text"
                      placeholder="Contoh: Batu Pahat, Johor"
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    />
                    {errors.lokasi && <p className="text-secondary text-xs mt-1">{errors.lokasi.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Anggaran Pendapatan <span className="text-secondary">*</span>
                    </label>
                    <select
                      {...register("pendapatan")}
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    >
                      <option value="" className="text-foreground">Pilih...</option>
                      <option value="<3000" className="text-foreground">Bawah RM3,000</option>
                      <option value="3000-5000" className="text-foreground">RM3,000 – RM5,000</option>
                      <option value="5000-7000" className="text-foreground">RM5,000 – RM7,000</option>
                      <option value=">7000" className="text-foreground">Lebih RM7,000</option>
                    </select>
                    {errors.pendapatan && <p className="text-secondary text-xs mt-1">{errors.pendapatan.message}</p>}
                  </div>
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Status Pembeli <span className="text-secondary">*</span>
                    </label>
                    <select
                      {...register("status")}
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    >
                      <option value="" className="text-foreground">Pilih...</option>
                      <option value="pertama" className="text-foreground">Pembeli Pertama</option>
                      <option value="ada" className="text-foreground">Sudah Ada Rumah</option>
                      <option value="lain" className="text-foreground">Lain-lain</option>
                    </select>
                    {errors.status && <p className="text-secondary text-xs mt-1">{errors.status.message}</p>}
                  </div>
                  <div>
                    <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                      Cara Dihubungi <span className="text-secondary">*</span>
                    </label>
                    <select
                      {...register("cara")}
                      className="w-full bg-white/10 border border-white/20 text-primary-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
                    >
                      <option value="" className="text-foreground">Pilih...</option>
                      <option value="whatsapp" className="text-foreground">WhatsApp</option>
                      <option value="telefon" className="text-foreground">Panggilan Telefon</option>
                      <option value="emel" className="text-foreground">E-mel</option>
                    </select>
                    {errors.cara && <p className="text-secondary text-xs mt-1">{errors.cara.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-primary-foreground/80 text-sm font-medium mb-1.5">
                    Catatan / Soalan (Pilihan)
                  </label>
                  <textarea
                    {...register("catatan")}
                    rows={3}
                    placeholder="Sebarang pertanyaan atau catatan tambahan..."
                    className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="setuju"
                    {...register("setuju")}
                    className="mt-1 w-4 h-4 accent-secondary shrink-0"
                  />
                  <label htmlFor="setuju" className="text-primary-foreground/70 text-xs leading-relaxed cursor-pointer">
                    Saya bersetuju untuk dihubungi oleh pihak jualan berkenaan projek ini. Maklumat yang diberikan digunakan untuk tujuan susulan jualan, semakan minat dan proses berkaitan permohonan.
                  </label>
                </div>
                {errors.setuju && <p className="text-secondary text-xs -mt-2">{errors.setuju.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-secondary-foreground py-4 rounded-xl font-bold text-base hover:bg-secondary/90 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? "Menghantar..." : "Hantar Borang Sekarang"}
                </button>
              </motion.form>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── CTA CONTACT BAR ── */}
      <section className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-secondary-foreground">Ada Soalan? Hubungi Kami Terus</h3>
            <p className="text-secondary-foreground/80 text-sm mt-1">Pasukan kami sedia membantu anda setiap masa.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:072266366"
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              07-226 6366
            </a>
            <a
              href="https://wa.me/60124346073"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-secondary-foreground text-secondary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: 012-434 6073
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-secondary rounded-sm flex items-center justify-center">
                  <span className="text-secondary-foreground font-serif font-bold text-lg leading-none">P</span>
                </div>
                <div>
                  <p className="font-serif font-semibold text-background">PIJ Property Development</p>
                  <p className="text-background/50 text-xs">Sdn Bhd (323394-D)</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-background/60">
                Membangun komuniti Muslim yang sejahtera melalui rumah berkualiti dan mampu milik di Johor.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-background mb-4">Hubungi Kami</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                  Aras 1, Bangunan PIJ Holdings, No. 8, Jalan Bukit Timbalan, 80888 Johor Bahru
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <a href="tel:072266366" className="hover:text-secondary transition-colors">07-226 6366</a>
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-secondary" />
                  <a href="https://wa.me/60124346073" className="hover:text-secondary transition-colors">012-434 6073</a>
                </p>
                <p className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-secondary" />
                  <a href="https://www.facebook.com/PIJPDSB/" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">facebook.com/PIJPDSB</a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold text-background mb-4">Maklumat Lesen</h4>
              <div className="space-y-1.5 text-xs text-background/50">
                <p>Lesen Pemaju: 14409/05-2027/0870 (R)</p>
                <p>Permit Iklan: 14409-4/02-2027/0119 (N)-(L)</p>
                <p>Sah: 06/02/2025 – 05/02/2027</p>
                <p className="mt-3">
                  <a
                    href="https://teduh.kpkt.gov.my"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-secondary transition-colors"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Semak di teduh.kpkt.gov.my
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-background/10 pt-8 space-y-3">
            <p className="text-xs text-background/50 leading-relaxed text-center">
              <Shield className="w-3.5 h-3.5 inline-block mr-1 text-secondary" />
              Iklan ini telah diluluskan oleh Jabatan Perumahan Negara. Maklumat pemajuan dan iklan yang diluluskan boleh disemak di portal{" "}
              <a href="https://teduh.kpkt.gov.my" target="_blank" rel="noreferrer" className="text-secondary hover:underline">teduh.kpkt.gov.my</a>.
            </p>
            <p className="text-xs text-background/30 text-center">
              Harga, spesifikasi dan maklumat projek adalah tertakluk kepada perubahan tanpa notis. Sila hubungi pejabat kami untuk maklumat terkini.
            </p>
            <p className="text-xs text-background/30 text-center">
              &copy; {new Date().getFullYear()} PIJ Property Development Sdn Bhd. Hak cipta terpelihara.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
