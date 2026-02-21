export const exerciseOptions = {
	method: 'GET',
	hostname: 'exercisedb.p.rapidapi.com',
	port: null,
	path: '/exercises/targetList',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
		'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	}
};
export const youtubeOptions = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
	  'X-RapidAPI-Key': 'f0c20d72c5msh6008d06f4ef89a4p1d1e25jsn28fa9f63ba57',
	},
  };

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
  
    return data;
  }

  export const fetchImage = async (url, options) => {
	const response = await fetch(url, options);
	if (!response.ok) throw new Error('Failed to fetch image');
	
	const blob = await response.blob();
	return URL.createObjectURL(blob);
  };