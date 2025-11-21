import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Element Tree",
  description:
    "Learn about Element Tree, our mission, leadership, engineering team, and 3D animation studio shaping the future of maritime, HRMS, LMS, and safety training.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="container py-24 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            About <span className="text-primary">Element Tree</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed text-justify">
            Founded in 2018 by Capt. Anuj Mengaji, Element Tree is a technology
            and creative studio specializing in maritime training, HRMS
            platforms, software engineering, 3D animation, and cyber safety
            solutions — empowering global organizations with world-class digital
            products.
          </p>
        </div>
      </section>

      {/* =========================
          MISSION & VISION
      ========================== */}
      <section className="container py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              To revolutionize maritime and corporate training through
              cutting-edge technology, immersive 3D content, and powerful
              software solutions that elevate learning, safety, and operational
              efficiency worldwide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              To develop specialized digital ecosystems that streamline maritime operations, 
              automate workforce management, and modernize technical training.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="text-muted-foreground leading-relaxed space-y-2">
              <li>• Innovation with purpose</li>
              <li>• Precision and excellence</li>
              <li>• Integrity and trust</li>
              <li>• Customer-first engineering</li>
              <li>• Creativity without limits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================
          FOUNDER SECTION
      ========================== */}
      <section className="bg-muted/30 border-t border-b border-border/40 py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Capt. Anuj Mengaji  
                <span className="block text-lg font-semibold text-primary mt-1">
                  Founder & CEO
                </span>
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                With over 30 years of maritime and software development
                experience, Capt. Anuj founded Element Tree in 2018 to bring
                modern, innovative digital solutions to maritime training,
                safety, simulations, and enterprise software.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                His leadership journey includes senior roles at Teekay Tankers,
                World Tankers Management, ADK Maritime, and “K” Line Ship
                Management. His expertise spans ship management, marine safety,
                inspections, cyber security, and enterprise technology.
              </p>

              <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground text-justify">
                “Technology should simplify work processes and improve lives —
                that is the foundation of everything we build at Element Tree.”
              </blockquote>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="images/team/Web-anuj.png" // Replace with actual image path
                alt="Capt. Anuj Mengaji"
                width={800}
                height={900}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          3D ANIMATION TEAM
      ========================== */}
      <section className="container py-24">
        <h2 className="text-3xl font-bold mb-12">3D Animation Studio</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Our in-house animation team produces world-class training videos,
          simulations, and visual content using Unreal Engine, Blender, and
          advanced CGI pipelines.
        </p>

        <TeamGrid
          members={[
            {
              name: "Vikas Biradar",
              role: "Animation Supervisor",
              hobbies: "Video Games, Listening to Music",
              img: "images/team/vikas.png",
            },
            {
              name: "Krushna Goure",
              role: "Lead 3D Generalist",
              hobbies: "Travelling, Binge Watching",
              img: "images/team/krushna.png",
            },
            {
              name: "Raja Balmain",
              role: "Lead Motion Graphics Artist",
              hobbies: "Movies, Artistic Recreation",
              img: "images/team/raja.jpg",
            },
            {
              name: "Prashant M",
              role: "Sr. 3D Generalist",
              hobbies: "Video Games, Chess",
              img: "images/team/prashant.jpg",
            },
            {
              name: "Rohit Paradkar",
              role: "3D Generalist",
              hobbies: "Gaming, Boxing",
              img: "images/team/rohit.png",
            },
          ]}
        />
      </section>

      {/* =========================
          SOFTWARE DEVELOPMENT TEAM
      ========================== */}
      <section className="container py-24 border-t border-border/40">
        <h2 className="text-3xl font-bold mb-12">Software Engineering Team</h2>

        <p className="text-muted-foreground max-w-2xl mb-12">
          Our software engineering team builds and maintains all digital
          products — including Zenith HRMS, Learn LMS, iCheck inspection suite,
          and Navigate operational tools.
        </p>

        <TeamGrid
          members={[
            {
              name: "Anuj Ghadge",
              role: "Senior Full Stack Developer",
              hobbies: "Concerts, Gaming",
              img: "images/team/anuj.png",
            },
            {
              name: "Avanti Shinde",
              role: "Senior Full Stack Developer",
              hobbies: "Crochet, Gardening",
              img: "images/team/avanti.png",
            },
            {
              name: "Nikhil Jathar",
              role: "Full Stack Developer",
              hobbies: "Gaming",
              img: "images/team/nikhil.png",
            },
          ]}
        />
      </section>
    </div>
  );
}

/* =============================================================
   TEAM GRID COMPONENT (LOCAL)
============================================================= */
function TeamGrid({
  members,
}: {
  members: { name: string; role: string; hobbies: string; img: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {members.map((m) => (
        <div
          key={m.name}
          className="group rounded-xl border border-border/40 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card"
        >
          <div className="w-full h-56 rounded-lg overflow-hidden mb-5">
            <Image
              src={m.img}
              alt={m.name}
              width={600}
              height={600}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h3 className="text-xl font-semibold">{m.name}</h3>
          <p className="text-primary text-sm font-medium mt-1">{m.role}</p>
          <p className="text-muted-foreground text-sm mt-3">
            <span className="font-medium text-foreground">Hobbies:</span>{" "}
            {m.hobbies}
          </p>
        </div>
      ))}
    </div>
  );
}
