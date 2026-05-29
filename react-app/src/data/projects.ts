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
    img: srirangaImg,
    thumbnail: '/images/Screenshot%202026-05-24%20005112.png',
    videoSrc: srirangaVideo,
    title: 'SRIRANGA',
    year: '2026',
    category: 'Brand Identity / Web Experience',
    description:
      'A comprehensive brand identity system designed for a cultural and spiritual landmark. The project encompassed visual language development, digital presence strategy, and atmospheric brand storytelling that bridges tradition with contemporary design.',
    role: 'Lead Designer / Art Direction',
    deliverables: ['Brand Identity', 'Visual System', 'Digital Presence', 'Art Direction'],
  },
  {
    id: 'project-1',
    img: resolveImg,
    thumbnail: '/images/Screenshot%202026-05-26%20124015.png',
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
    id: 'project-2',
    img: '/images/Screenshot%202026-05-28%20143309.png',
    thumbnail: '/images/Screenshot%202026-05-28%20143309.png',
    title: 'PROJECT THREE',
    year: '2025',
    category: 'Visual Identity / Campaign',
    description:
      'A visual identity and campaign system built around bold typography, monochrome palettes, and atmospheric imagery. The work explores how brand systems can communicate narrative depth through restrained, intentional design choices.',
    role: 'Creative Director / Visual Design',
    deliverables: ['Visual Identity', 'Campaign System', 'Art Direction', 'Brand Guidelines'],
  },
  {
    id: 'project-3',
    img: '/images/Screenshot%202026-05-28%20143318.png',
    thumbnail: '/images/Screenshot%202026-05-28%20143318.png',
    title: 'PROJECT FOUR',
    year: '2025',
    category: 'Digital Experience / Platform',
    description:
      'A digital experience platform designed for immersive content discovery. The interface prioritizes cinematic presentation and seamless interaction, creating a space where users can explore curated visual narratives.',
    role: 'Product Designer / Front-End Development',
    deliverables: ['Digital Platform', 'UX Design', 'Interaction Design', 'Front-End Development'],
  },
]
