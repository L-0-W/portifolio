import Image from "next/image";

export function NewtonCard() {
  return (
    <button type="button" className="mast-card">
      <Image
        src="/newton.webp"
        alt="Gravura de Isaac Newton"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 720px) 24rem, 70vw"
        className="mast-card-img"
      />
    </button>
  );
}
