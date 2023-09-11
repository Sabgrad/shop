import axios from 'axios';
import crypto from 'crypto'

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const deleteCloudinrayImage = async (public_id: string) => {
  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
  const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
  const timestamp = new Date().getTime()
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`
  const signature = generateSHA1(generateSignature(public_id, api_secret))

  await axios.post(url, {
    public_id,
    signature,
    api_key,
    timestamp,
  })
}