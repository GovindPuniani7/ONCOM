import axios from 'axios';

export const compileCode = async (code: string, languageId: number, input: string) => {
  const res = await axios.post('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
    source_code: code,
    language_id: languageId,
    stdin: input
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'X-RapidAPI-Key': '88314aee57msh6385677398c00e7p1ede42jsnf39ead4e9ba6'
    }
  });

  return res.data;
}
