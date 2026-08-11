
import {useState,useEffect} from 'react';

type WeatherData ={
    temp:number;
    feelsLike:number;
    cityName:string;
};
function useWeather(city:string){
    const [data, setData] = useState<WeatherData | null >(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!city) return;
        async function  fetchWeather(){
            setLoading(true);
            setError(null);
            try{
                const geo = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
                );
                const geoData  = await geo.json();
                if(!geoData.results || geoData.results.length === 0){
                    throw new Error('City not found');
                }
                const { latitude, longitude, name} = geoData.results[0];
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature`);
                const weatherData = await weatherRes.json();
                setData({
                temp: weatherData.current.temperature_2m,       // was "temparature_2m"
                feelsLike: weatherData.current.apparent_temperature, // was "temparature"
                cityName: name,
});
            }catch(err){
                setError('Could not fetch weather . Try another city.');
            }finally{
                setLoading(false);
            }
        }fetchWeather();
    },[city]);
    return {data,loading,error};
}
export default useWeather;