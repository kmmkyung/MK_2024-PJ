import { companyData } from "../type";


const companiesData: companyData[] = [
  {
    companyName:'disney',
    mediaType: 'movie',
    standard: 'with_companies',
    tmdbCompanyId: [2],
    video: '/videos/company-disney.mp4',
    logo: '/images/company-disney.png',
    backgroundImg: '/images/company-disney-bg.png',
  },
  {
    companyName:'pixar',
    mediaType: 'movie',
    standard: 'with_companies',
    tmdbCompanyId: [3],
    video: '/videos/company-pixar.mp4',
    logo: '/images/company-pixar.png',
    backgroundImg: '/images/company-pixar-bg.png',
  },
  {
    companyName:'marvel',
    mediaType: 'movie',
    standard: 'with_companies',
    tmdbCompanyId: [420],
    video: '/videos/company-marvel.mp4',
    logo: '/images/company-marvel.png',
    backgroundImg: '/images/company-marvel-bg.png',
  },
  {
    companyName:'starWars',
    mediaType: 'movie',
    standard: 'with_companies',
    tmdbCompanyId: [1],
    video: '/videos/company-starWars.mp4',
    logo: '/images/company-starWars.png',
    backgroundImg: '/images/company-starWars-bg.png',
  },
  {
    companyName:'nationalGeographic',
    mediaType: 'tv',
    standard: 'with_networks',
    tmdbCompanyId: [43],
    video: '/videos/company-nationalGeographic.mp4',
    logo: '/images/company-nationalGeographic.png',
    backgroundImg: '/images/company-nationalGeographic-bg.png',
  },
  {
    companyName:'star',
    mediaType: 'movie',
    standard: 'with_companies',
    tmdbCompanyId: [25,43,453],
    video: '/videos/company-star.mp4',
    logo: '/images/company-star.png',
    backgroundImg: '/images/company-star-bg.png',
  }
]

export default companiesData;