export default function GhanaFlag() {
  return (
    <div className="w-12 h-8 rounded-sm overflow-hidden shadow-sm relative">
      {/* Red stripe */}
      <div className="h-1/3 bg-[#CE1126]" />
      {/* Gold stripe with black star */}
      <div className="h-1/3 bg-[#FCD116] relative">
        <span className="absolute inset-0 flex items-center justify-center text-black text-xs leading-none">
          ★
        </span>
      </div>
      {/* Green stripe */}
      <div className="h-1/3 bg-[#006B3F]" />
    </div>
  );
}
