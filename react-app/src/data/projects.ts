import srirangaImg from '../assets/sriranga.png'
import resolveImg from '../assets/resolvemockup.png'
import srirangaVideo from '../assets/srirangavideo.mp4'
import resolveVideo from '../assets/resolvelms.mp4'

export interface ProjectData {
  id: string
  img: string
  thumbnail: string
  videoSrc?: string
  title: string
  year: string
  category: string
  description: string
  role: string
  deliverables: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'project-0',
    img: resolveImg,
    thumbnail: '/images/resolvemockup.png',
    videoSrc: resolveVideo,
    title: 'RESOLVE',
    year: '2026',
    category: 'Product Design / Interface',
    description:
      'A modern learning management platform designed for clarity and engagement. The interface combines intuitive course navigation with progress tracking, creating an environment where learning feels seamless and purposeful.',
    role: 'Product Designer / UI/UX',
    deliverables: ['Product Design', 'UI/UX', 'Design System', 'Prototyping'],
  },
  {
    id: 'project-1',
    img: srirangaImg,
    thumbnail: '/images/sriranga.png',
    videoSrc: srirangaVideo,
    title: 'SRIRANGA ORGANICS',
    year: '2026',
    category: 'Brand Identity / Web Experience',
    description:
      'A comprehensive brand identity system designed for a cultural and spiritual landmark. The project encompassed visual language development, digital presence strategy, and atmospheric brand storytelling that bridges tradition with contemporary design.',
    role: 'Lead Designer / Art Direction',
    deliverables: ['Brand Identity', 'Visual System', 'Digital Presence', 'Art Direction'],
  },
  {
    id: 'project-2',
    img: '/images/Untitled%20design%20(9).png',
    thumbnail: '/images/Untitled%20design%20(9).png',
    title: 'RUTUAM',
    year: '2026',
    category: 'Visual Identity / Branding',
    description: '',
    role: '',
    deliverables: [],
  },
]
