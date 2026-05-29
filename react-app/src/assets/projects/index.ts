interface ProjectData {
  id: string
  title: string
  subtitle: string
  year: string
  thumbnail: string
  video?: string
}

// To swap assets for a project, replace the thumbnail
// and video imports in this file. Everything else updates automatically.
//
// Example:
//   import miraiThumb from './mirai/thumbnail.jpg'
//   import miraiVideo from './mirai/showreel.mp4'

import miraiThumb from '../../assets/mugen-portfolio.png'
import bengaluruThumb from '../../assets/sriranga.png'
import fluxThumb from '../../assets/resolvemockup.png'
import spinxThumb from '../../assets/mugen.png'
import nammaThumb from '../../assets/mugen-portfolio.png'

export const projects: ProjectData[] = [
  {
    id: 'mirai',
    title: 'MIRAI',
    subtitle: 'Cinematic identity',
    year: '2026',
    thumbnail: miraiThumb,
  },
  {
    id: 'bengaluru-central',
    title: 'BENGALURU CENTRAL',
    subtitle: 'Spatial narrative',
    year: '2026',
    thumbnail: bengaluruThumb,
  },
  {
    id: 'flux',
    title: 'FLUX',
    subtitle: 'Generative design system',
    year: '2025',
    thumbnail: fluxThumb,
  },
  {
    id: 'spinx',
    title: 'SPINX',
    subtitle: 'Architectural light',
    year: '2025',
    thumbnail: spinxThumb,
  },
  {
    id: 'namma-raksha',
    title: 'NAMMA RAKSHA',
    subtitle: 'Public safety',
    year: '2024',
    thumbnail: nammaThumb,
  },
]
