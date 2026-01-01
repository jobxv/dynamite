"use client";
import CategoriesSection from "@/components/ui/CategoriesSection";
import DealsSection from "@/components/DealsSection";
import DiscoverGiftsSection from "@/components/DiscoverGiftsSection";
import EditorPicsSection, {
  EditorPicsSectionSmall,
} from "@/components/EditorPicsSection";
import HeroSection from "@/components/HeroSection";
import PicksSection from "@/components/PicksSection";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const checkAuthStatus = useAppStore((state) => state.checkAuthStatus);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <div className="flex flex-col gap-10 max-w">
      <HeroSection />
      <DiscoverGiftsSection />
      <PicksSection />
      <DealsSection />
      <CategoriesSection />
      <EditorPicsSection />
      <EditorPicsSectionSmall />
    </div>
  );
}
