'use client';

import {PlayCircle} from 'lucide-react';
import {useTranslations} from 'next-intl';

import {Button} from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/src/components/ui/dialog';

const kitchenVideoUrl =
  'https://player.vimeo.com/progressive_redirect/playback/804168870/rendition/1080p/file.mp4?loc=external&signature=3ab7577de1cbca39bdcb6cdedd7f4c8f4c0c4beaf8bcfe8c45f7b6df7ea8872b';

export function VideoSection() {
  const t = useTranslations('VideoSection');

  return (
    <section id="video" className="relative overflow-hidden rounded-2xl border border-slate-200 bg-black">
      <video
        autoPlay
        className="h-[320px] w-full object-cover opacity-70 md:h-[420px]"
        loop
        muted
        playsInline
        src={kitchenVideoUrl}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('title')}</h2>
        <p className="max-w-2xl text-sm text-slate-100 md:text-base">
          {t('description')}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white text-slate-900 hover:bg-slate-100" size="lg" variant="outline">
              <PlayCircle className="h-5 w-5" />
              {t('openButton')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dialogTitle')}</DialogTitle>
              <DialogDescription>{t('dialogDescription')}</DialogDescription>
            </DialogHeader>
            <video className="h-auto w-full rounded-lg" controls playsInline src={kitchenVideoUrl} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
