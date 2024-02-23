'use client';

import { savePageIcon } from '@/actions/pageActions';
import SubmitButton from '@/components/buttons/SubmitButton';
import SectionBox from '@/components/layout/SectionBox';
import { ReactSortable } from 'react-sortablejs';
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
  faLinkedinIn,
  faPix,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faGripLines,
  faPlus,
  faSave,
  faTrash,
  faBuildingUn,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const allIcons = [
  {
    key: 'email',
    label: 'e-mail',
    icon: faEnvelope,
    placeholder: 'test@example.com',
  },
  {
    key: 'pix',
    label: 'Chave pix',
    icon: faPix,
    placeholder: '+55 21 1234 12345',
  },
  {
    key: 'instagram',
    label: 'instagram',
    icon: faInstagram,
    placeholder: 'profile',
  },
  {
    key: 'facebook',
    label: 'facebook',
    icon: faFacebook,
    placeholder: 'profile',
  },
  {
    key: 'tiktok',
    label: 'tiktok',
    icon: faTiktok,
    placeholder: '@profile',
  },
  {
    key: 'youtube',
    label: 'youtube',
    icon: faYoutube,
    placeholder: '@profile',
  },
  {
    key: 'whatsapp',
    label: 'whatsapp',
    icon: faWhatsapp,
    placeholder: 'xx123456789',
  },
  {
    key: 'github',
    label: 'github',
    icon: faGithub,
    placeholder: 'profile',
  },
  {
    key: 'telegram',
    label: 'telegram',
    icon: faTelegram,
    placeholder: 'https://t.me/profile',
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    icon: faLinkedinIn,
    placeholder: 'profile',
  },
  {
    key: 'empresa',
    label: 'empresa',
    icon: faBuildingUn,
    placeholder: 'https://suaempresa.com.br',
  },
];

function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default function PageButtonsLinksForm({ user, page }) {
  // const pageSavedButtonsKeys = Object.keys(page.buttons);
  const pageSavedButtonsKeys =
    page && page.icones ? Object.keys(page.icones) : [];

  const pageSavedIconsInfo = pageSavedButtonsKeys.map((k) =>
    allIcons.find((b) => b.key === k),
  );
  const [activeIcons, setActiveIcons] = useState(pageSavedIconsInfo);

  function addButtonToProfile(button) {
    setActiveIcons((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  async function saveIcon(formData) {
    await savePageIcon(formData);
    toast.success('Settings saved!');
  }

  function removeButton({ key: keyToRemove }) {
    setActiveIcons((prevButtons) => {
      return prevButtons.filter((icon) => icon.key !== keyToRemove);
    });
  }

  const availableButtons = allIcons.filter(
    (b1) => !activeIcons.find((b2) => b1.key === b2.key),
  );

  return (
    <SectionBox>
      <form action={saveIcon}>
        <h2 className="text-2xl font-bold mb-4">Botão de contatos</h2>
        <ReactSortable
          handle=".handle"
          list={activeIcons}
          setList={setActiveIcons}
        >
          {activeIcons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="grow flex">
                <input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={page.icon[b.key]}
                  type="text"
                  style={{ marginBottom: '0' }}
                  // onClick={() => console.log(page.icon[b.key])}
                />
                <button
                  onClick={() => removeButton(b)}
                  type="button"
                  className="py-2 px-4 bg-gray-300 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-1 p-2 bg-gray-200"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span className="">{upperFirst(b.label)}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Salvar</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
