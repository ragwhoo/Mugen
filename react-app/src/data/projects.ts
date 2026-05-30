import srirangaImg from '../assets/sriranga.png'
import resolveImg from '../assets/resolvemockup.png'
import p3Img from '../assets/p3.png'
import bangloreImg from '../assets/banglore.png'
import rutamImg from '../assets/rutam.png'
import p7Img from '../assets/p7.png'
import blind75Img from '../assets/blind75.png'
import miraiImg from '../assets/mirai.png'
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
    thumbnail: srirangaImg,
    videoSrc: srirangaVideo,
    title: 'SRIRANGA ORGANICS',
    year: '2026',
    category: 'Brand Identity / Web Experience',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-1',
    img: resolveImg,
    thumbnail: resolveImg,
    videoSrc: resolveVideo,
    title: 'RESOLVE',
    year: '2026',
    category: 'Product Design / Interface',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-2',
    img: srirangaImg,
    thumbnail: srirangaImg,
    title: 'SRIRANGA ORGANICS',
    year: '2026',
    category: 'Brand Identity / Web Experience',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-3',
    img: bangloreImg,
    thumbnail: bangloreImg,
    title: 'BANGLORE CENTRAL',
    year: '2026',
    category: 'Brand Identity / Print',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-4',
    img: blind75Img,
    thumbnail: blind75Img,
    title: 'SRIRANGA ORGANICS',
    year: '2026',
    category: 'Brand Identity / Web Experience',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-5',
    img: rutamImg,
    thumbnail: rutamImg,
    title: 'RUTAM',
    year: '2026',
    category: 'Visual Identity / Branding',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-6',
    img: p7Img,
    thumbnail: p7Img,
    title: 'RUTAM',
    year: '2026',
    category: 'Visual Identity / Branding',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-7',
    img: p3Img,
    thumbnail: p3Img,
    title: 'RUTAM',
    year: '2026',
    category: 'Visual Identity / Branding',
    description: '',
    role: '',
    deliverables: [],
  },
  {
    id: 'project-8',
    img: miraiImg,
    thumbnail: miraiImg,
    title: 'MIRAI',
    year: '2026',
    category: 'Digital Experience / Branding',
    description: '',
    role: '',
    deliverables: [],
  },
]
