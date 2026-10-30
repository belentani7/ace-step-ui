import React from 'react';
import {
  Music2,
  Library,
  GraduationCap,
  Sliders,
  Sparkles,
  Cpu,
  Code2,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { View } from '../../types';
import { useI18n } from '../../context/I18nContext';

interface HomeProps {
  onStart: () => void;
  onNavigate: (view: View) => void;
}

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

const TrustBadge: React.FC<TrustBadge> = ({ icon, label }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 text-xs font-medium">
    {icon}
    {label}
  </span>
);

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<Feature> = ({ icon, title, description }) => (
  <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 hover:border-pink-500/40 dark:hover:border-pink-500/40 transition-colors">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
      {icon}
    </div>
    <h3 className="mt-4 text-sm font-bold text-zinc-900 dark:text-white">{title}</h3>
    <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{description}</p>
  </div>
);

/**
 * Landing page (protocol 9 — Belentani). Entry view for `/`:
 * award-style hero with title, utility subtitle, CTA and trust badges,
 * followed by cards for the app's real features.
 */
export const Home: React.FC<HomeProps> = ({ onStart, onNavigate }) => {
  const { t } = useI18n();

  const trustBadges: TrustBadge[] = [
    { icon: <Cpu size={14} />, label: t('heroBadgeLocal') },
    { icon: <Code2 size={14} />, label: t('heroBadgeOpenSource') },
    { icon: <InfinityIcon size={14} />, label: t('heroBadgeFree') },
  ];

  const features: Feature[] = [
    { icon: <Music2 size={20} />, title: t('featureGeneration'), description: t('featureGenerationDesc') },
    { icon: <Library size={20} />, title: t('featureLibrary'), description: t('featureLibraryDesc') },
    { icon: <GraduationCap size={20} />, title: t('featureTraining'), description: t('featureTrainingDesc') },
    { icon: <Sliders size={20} />, title: t('featureEditor'), description: t('featureEditorDesc') },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-white via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-purple-950/40 transition-colors duration-300">
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={14} />
          {t('heroBadge')}
        </span>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
          {t('heroTitle')}
        </h1>

        <p className="mt-6 text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-transform"
          >
            <Music2 size={18} />
            {t('heroCta')}
          </button>
          <button
            onClick={() => onNavigate('library')}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-zinc-300 dark:border-white/15 text-zinc-700 dark:text-zinc-200 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <Library size={18} />
            {t('heroSecondaryCta')}
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((badge) => (
            <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
