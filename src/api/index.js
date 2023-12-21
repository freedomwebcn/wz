import ajax from "./request.js";

export const reqHeroData = () => ajax(`getHeroList.php`);

export const reqHeroPower = ({ currentHeroName, type }) => ajax(`getHeroInfo.php?hero=${currentHeroName}&type=${type}`);
