'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Phrase {
  highlight: string;
  rest: string;
}

interface TypewriterEffectProps {
  phrases: Phrase[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterEffect({
  phrases,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [highlightText, setHighlightText] = useState('');
  const [restText, setRestText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phase, setPhase] = useState<'highlight' | 'rest'>('highlight');

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (phase === 'rest') {
        if (restText.length > 0) {
          timeout = setTimeout(() => {
            setRestText(restText.slice(0, -1));
          }, deletingSpeed);
        } else {
          // Finished deleting rest part
          timeout = setTimeout(() => {
             setPhase('highlight');
          }, 0);
        }
      } else { // phase === 'highlight'
        if (highlightText.length > 0) {
          timeout = setTimeout(() => {
            setHighlightText(highlightText.slice(0, -1));
          }, deletingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }, 0);
        }
      }
    } else {
      // Typing
      if (phase === 'highlight') {
        if (highlightText.length < currentPhrase.highlight.length) {
          timeout = setTimeout(() => {
            setHighlightText(currentPhrase.highlight.slice(0, highlightText.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
             setPhase('rest');
          }, 0);
        }
      } else { // phase === 'rest'
        if (restText.length < currentPhrase.rest.length) {
          timeout = setTimeout(() => {
            setRestText(currentPhrase.rest.slice(0, restText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing both parts, wait before deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [
    highlightText,
    restText,
    isDeleting,
    phase,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration
  ]);

  return (
    <span className={cn("inline-block", className)}>
      <span className="text-primary">{highlightText}</span>
      <span>{restText}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}
