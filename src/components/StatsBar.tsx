import GhanaFlag from "./GhanaFlag";

export default function StatsBar() {
  return (
    <section className="bg-dark-section text-white">
      <div className="max-w-[1400px] mx-auto px-[5%] py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Years Experience */}
          <div>
            <p className="font-display text-4xl font-light tracking-tight">
              10+
            </p>
            <p className="text-xs uppercase tracking-[2px] text-white/70 mt-1">
              Years Experience
            </p>
          </div>

          {/* Happy Clients */}
          <div>
            <p className="font-display text-4xl font-light tracking-tight">
              500+
            </p>
            <p className="text-xs uppercase tracking-[2px] text-white/70 mt-1">
              Happy Clients
            </p>
          </div>

          {/* Made in Ghana */}
          <div>
            <div className="flex justify-center">
              <GhanaFlag />
            </div>
            <p className="font-display text-4xl font-light tracking-tight">
              100%
            </p>
            <p className="text-xs uppercase tracking-[2px] text-white/70 mt-1">
              Made in Ghana
            </p>
          </div>

          {/* Premium Collections */}
          <div>
            <p className="font-display text-4xl font-light tracking-tight">
              10
            </p>
            <p className="text-xs uppercase tracking-[2px] text-white/70 mt-1">
              Premium Collections
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
