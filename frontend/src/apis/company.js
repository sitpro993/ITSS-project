import { getData } from "../config/api";

const logoList = [
  'https://assets.stickpng.com/thumbs/6102dc563de48b00044eb5b3.png',
  'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/social-facebook-icon.png',
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
];

export const CompanyApi = {
  getCompanys: async ({ page, size }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [...Array(size)].map((_, index) => ({
      id: index + (page - 1) * size + 1,
      title: `Company ${index + (page - 1) * size + 1}`,
      description: `This is the best company description in the world`,
      logo: logoList[index % logoList.length],
    }));
  },
};

export const apiGetCompanyInfo = async (accessToken) => {
  const result = await getData("company",accessToken);
  return result;
};
