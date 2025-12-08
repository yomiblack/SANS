'use client';
import participants2 from "@/app/components/util/participants/participants2.0"
import GalleryTemplate from "../galleryTemplate"

export default function Sans2() {
  return (
    <GalleryTemplate episode='2' participants={participants2} event='sans' />
  )
}
