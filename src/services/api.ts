import { TQuestion } from "../types/types";

const api = `https://jsonapi.metabroadcast.ru/questions/`;

export const fetchQuestions = async (): Promise<TQuestion[]> => {
  try {
    const data = await fetch(api);

    if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
    const jsonData = await data.json();

    return jsonData;
  } catch (e) {
    throw new Error(`${(e as Error).message}`);
  }
};
