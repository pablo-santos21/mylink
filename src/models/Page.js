import { model, models, Schema } from 'mongoose';

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true },
    displayName: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    bgType: { type: String, default: 'color' },
    bgColor: { type: String, default: '#000' },
    bgImage: { type: String, default: '' },

    typeColor: { type: String, default: 'color' },
    bgBodyColor: { type: String, default: '#000' },
    bgBodyImage: { type: String, default: '' },
    bgMainLinkColor: { type: String, default: '#3730A3' },
    bgSecLinkColor: { type: String, default: '#1D4ED8' },
    textDescColor: { type: String, default: '#fff' },
    textMenuColor: { type: String, default: '#172563' },
    textIconColor: { type: String, default: '#172563' },
    borderMenuColor: { type: String, default: '#fff' },
    textLinkColor: { type: String, default: '#fff' },
    icon: { type: Object, default: {} },
    buttons: { type: Object, default: {} },
    links: { type: Object, default: [] },
  },
  { timestamps: true },
);

export const Page = models?.Page || model('Page', PageSchema);
