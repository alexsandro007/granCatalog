import { useEffect, useState } from "react";
import { Button } from "@heroui/button";

export default function ScrollToTopButton({ targetRef }: { targetRef?: React.RefObject<HTMLElement> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  return (
    <Button
      color="primary"
      isIconOnly
      onClick={handleClick}
      aria-label="Scroll to top"
      size="lg"
      variant="shadow"
      className={`fixed z-50 bottom-8 right-8 shadow-lg text-2xl transition-opacity duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      ↑
    </Button>
  );
}