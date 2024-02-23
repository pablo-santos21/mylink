'use client';
import { savePageSettings } from '@/actions/pageActions';
import SubmitButton from '@/components/buttons/SubmitButton';
import RadioTogglers from '@/components/formItems/radioTogglers';
import RadioTogglersBody from '@/components/formItems/radioTogglersBody';
import SectionBox from '@/components/layout/SectionBox';
import { upload } from '@/libs/upload';
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [bgTypeBody, setbgTypeBody] = useState(page.bgTypeBody);
  const [bgBodyColor, setBgBodyColor] = useState(page.bgColor);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved!');
    }
  }

  async function handleCoverImageChange(ev) {
    await upload(ev, (link) => {
      setBgImage(link);
    });
  }
  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }
  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
            style={
              bgType === 'color'
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: 'color', icon: faPalette, label: 'Color' },
                  { value: 'image', icon: faImage, label: 'Image' },
                ]}
                onChange={(val) => setBgType(val)}
              />
              {bgType === 'color' && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={(ev) => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}
              {bgType === 'image' && (
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center pt-4">
                    <p>1546 x 224 Pixels</p>
                  </div>
                  <label className="bg-white shadow px-4 py-2 mt-2 flex gap-2">
                    <input type="hidden" name="bgImage" value={bgImage} />
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                    />
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-gray-700"
                      />
                      <span>Trocar imagem</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt={'avatar'}
                  width={128}
                  height={128}
                />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
              >
                <FontAwesomeIcon size={'xl'} icon={faCloudArrowUp} />
              </label>
              <input
                onChange={handleAvatarImageChange}
                id="avatarIn"
                type="file"
                className="hidden"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <h2 className="text-2xl font-bold my-4">Cor do corpo da página</h2>
          <div className="flex flex-col justify-center items-center">
            <RadioTogglersBody
              defaultValue={page.bgTypeBody}
              options={[{ value: 'color', icon: faPalette, label: 'Color' }]}
              onChange={(val) => setbgTypeBody(val)}
            />
            {bgTypeBody === 'color' && (
              <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                <div className="flex gap-2 justify-center">
                  <span>Background color:</span>
                  <input
                    type="color"
                    name="bgBodyColor"
                    onChange={(ev) => setBgBodyColor(ev.target.value)}
                    defaultValue={page.bgBodyColor}
                  />
                </div>
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold my-4">Informações</h2>
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">
              Nome
            </label>
            <input
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="Pablo Santos"
            />
            <label className="input-label" htmlFor="locationIn">
              Localização
            </label>
            <input
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="Estado, Cidade, Pais ou endereço completo"
            />
            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Escreva sua Bio aqui..."
            />
            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Salvar</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
