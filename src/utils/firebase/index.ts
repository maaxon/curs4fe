import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase.ts";
import { v4 as uuidv4 } from "uuid";

export type FileType = Blob | Uint8Array | ArrayBuffer | null;

export const uploadFile = async (folder: string, file: FileType | null) => {
    if (file === null) return;

    const imageName = `${folder}/${uuidv4()}`;
    const imageRef = ref(storage, imageName);
    await uploadBytes(imageRef, file);

    return await getImageUrl(imageName);
};

export const getImageUrl = async (image?: string) => {
    try {
        return await getDownloadURL(ref(storage, image));
    } catch (error) {
        return undefined;
    }
};
