import { useState } from "react"

function App() {

  const [word, setWord] = useState('')
  const [translatedWord, setTranslatedWord] = useState('')

  function handleChange(e){
    setWord(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault()
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd99bc2d3dfmsh75e645227ee034fp12af27jsnbefcf1ac4534',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
        source_language: 'en',
        target_language: 'es',
        text: word
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const {data} = result
      setTranslatedWord(data.translatedText)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-[#448eca]  text-center px-[15%] lg:px-[20%] xl:pl-[25%]">
      <h1 className="text-5xl text-center py-14 font-bold text-[#f6f7df]">TRANSLATOR</h1>
      <h4 className="text-xl text-[#f6f7df]">English to Spanish</h4>
      <form className="grid " onSubmit={handleSubmit}>
        <textarea size={50} type="text" className="p-3 h-[250px] border border-black text-black rounded-xl bg-[#f6f6f4] my-[30px]" value={word} onChange={handleChange}/>
        <button className="bg-[#393879] text-white w-[250px] h-[50px] rounded-xl  place-self-center" type="submit"> Translate </button>
      </form>
      <p className="mt-5 text-white text-lg">{translatedWord && translatedWord}</p>
    </div>
  )
}

export default App
