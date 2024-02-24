import { Page } from '@/models/Page';
import { User } from '@/models/User';
import { Event } from '@/models/Event';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faPix,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBuilding,
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mongoose from 'mongoose';
import { btoa } from 'next/dist/compiled/@edge-runtime/primitives';
import Image from 'next/image';
import Link from 'next/link';

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
  pix: faPix,
  empresa: faBuilding,
  linkedin: faLinkedinIn,
};
const buttonLabels = {
  email: 'E-mail',
  pix: 'Chave Pix',
  mobile: 'Telefone',
  instagram: 'Instagram',
  facebook: 'Facebook',
  discord: 'Discord',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  empresa: 'Minha Empresa',
};

function buttonLink(key, value) {
  if (key === 'mobile') {
    return 'tel:' + value;
  }
  if (key === 'email') {
    return 'mailto:' + value;
  }
  if (key === 'whatsapp') {
    return 'https://wa.me/55' + value;
  }
  if (key === 'instagram') {
    return 'https://instagram.com/' + value;
  }
  if (key === 'facebook') {
    return 'https://facebook.com/' + value;
  }
  if (key === 'tiktok') {
    return 'https://tiktok.com/@' + value;
  }
  if (key === 'youtube') {
    return 'https://www.youtube.com/@' + value;
  }
  if (key === 'github') {
    return 'https://github.com/' + value;
  }
  if (key === 'linkedin') {
    return 'https://www.linkedin.com/in/' + value;
  }
  if (key === 'pix') {
    // return navigator.clipboard.writeText(value);
    return 'oi' + value;
  }
  return value;
}

// function copy(value) {
// }

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });
  await Event.create({ uri: uri, page: uri, type: 'view' });
  return (
    <div
      className="bg-blue-950 text-white min-h-screen"
      style={
        page.typeColor === 'color'
          ? { backgroundColor: page.bgBodyColor }
          : { backgroundImage: `url(${page.bgBodyImage})` }
      }
    >
      {/* SELEÇÃO DE COR DO BANNER */}
      <div
        className=" h-56 bg-gray-400 bg-cover bg-center"
        style={
          page.bgType === 'color'
            ? { backgroundColor: page.bgColor }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      ></div>

      {/* IMAGEM DO PERFIL */}
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
        <Image
          className="rounded-full w-full h-full object-cover border-zinc-300 border-4"
          src={user.image}
          alt="avatar"
          width={256}
          height={256}
        />
      </div>

      {/* INFORMAÇÕES DO PERFIL: NOME, LOCALIDADE E DESCRIÇÃO DO CLIENTE */}
      <div
        className=""
        style={
          page.typeColor === 'color'
            ? { color: page.textDescColor }
            : { color: `#fff` }
        }
      >
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3
          className="text-md flex gap-2 justify-center items-center text-white/70"
          style={
            page.typeColor === 'color'
              ? { color: page.textDescColor }
              : { color: `#fff` }
          }
        >
          <FontAwesomeIcon className="h-4" icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>
        <div className="max-w-xs mx-auto text-center my-2">
          <p>{page.bio}</p>
        </div>
      </div>

      {/* IMAGENS E LINKS DAS REDES SOCIAIS */}
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.buttons).map((buttonKey) => (
          <Link
            key={buttonKey}
            href={buttonLink(buttonKey, page.buttons[buttonKey])}
            className="rounded-full bg-zinc-200/70 text-blue-950 p-2 flex items-center justify-center hover:bg-zinc-100 hover:scale-125 duration-500"
            style={
              page.typeColor === 'color'
                ? { color: page.textIconColor }
                : { color: `#fff` }
            }
          >
            <FontAwesomeIcon
              className="w-5 h-5"
              icon={buttonsIcons[buttonKey]}
            />
          </Link>
        ))}
      </div>

      {/* BOTÕES DE REDES SOCIAIS */}
      <div className="max-w-2xl mx-auto px-8 flex flex-col gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.icon).map((iconKey) => (
          <Link
            key={iconKey}
            target="_blank"
            href={buttonLink(iconKey, page.icon[iconKey])}
            className="flex flex-row rounded-full bg-transparent border-zinc-200 border-2 text-blue-950 p-2 items-center pl-4 gap-2 hover:bg-zinc-200/40 hover:scale-110 duration-500 shadow-xl"
            style={{
              color: page.typeColor === 'color' ? page.textMenuColor : '#fff',
              borderColor:
                page.typeColor === 'color' ? page.borderMenuColor : '#fff',
            }}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={buttonsIcons[iconKey]} />
            <p className="font-bold">{buttonLabels[iconKey]}</p>
          </Link>
        ))}
      </div>

      {/* LINKS PERSONALIZADOS COM ANALYTICS */}
      <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 p-4 px-8">
        {page.links.map((link) => (
          <Link
            key={link.url}
            target="_blank"
            ping={
              process.env.URL +
              'api/click?url=' +
              btoa(link.url) +
              '&page=' +
              page.uri
            }
            className="bg-indigo-800 p-2 block flex hover:scale-110 duration-500"
            href={link.url}
            style={
              page.typeColor === 'color'
                ? { backgroundColor: page.bgMainLinkColor }
                : { backgroundColor: `#fff` }
            }
          >
            <div className="relative -left-4 overflow-hidden w-16">
              <div
                className="w-16 h-16 bg-blue-700 aspect-square relative flex items-center justify-center aspect-square"
                style={
                  page.typeColor === 'color'
                    ? { backgroundColor: page.bgSecLinkColor }
                    : { backgroundColor: `#fff` }
                }
              >
                {link.icon && (
                  <Image
                    className="w-full h-full object-cover"
                    src={link.icon}
                    alt={'icon'}
                    width={64}
                    height={64}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
            </div>
            <div
              className="flex items-center justify-center shrink grow-0 overflow-hidden"
              style={
                page.typeColor === 'color'
                  ? { color: page.textLinkColor }
                  : { color: `#fff` }
              }
            >
              <div>
                <h3 className=" font-bold">{link.title}</h3>
                <p
                  className="text-white/50 h-6 overflow-hidden"
                  style={
                    page.typeColor === 'color'
                      ? { color: page.textLinkColor }
                      : { color: `#fff` }
                  }
                >
                  {link.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
