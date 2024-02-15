import { useEffect, useState} from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import axios from 'axios';

const Kategori = () => {

  const[inputText, setInputText] = useState("");
  const[kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    const getKategoriler = async () => {
      try{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kategoriler`)
        setKategoriler(res?.data)
      } catch (err) {
        console.log(err);
      }
    }
    getKategoriler();
  }, []);

  const handleCreate = async (e) => {
    // e.preventDefault(); // sayfanin yenilenmesini engeller yukarida duzelttim
    try{
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/kategoriler`, {title: inputText}
        )
      setKategoriler([...kategoriler, res.data])
      setInputText(""); // metin kutusunu temizler
    } catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (e,id ) => {
      e.preventDefault();
      try {
        if(confirm("Bu kategoriyi silmek istediğine emin misin?")){
          await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/kategoriler/${id}`
          );
          setKategoriler(kategoriler.filter((kat) => kat._id !== id));
        }
      }catch(err){
        console.log(err)
      }
      
  }
    

  return (
    <div className="lg:p-4 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Kategoriler</Title>
      <div className='mt-5'>
        <div className='flex gap-4 flex-1 items-center'>
          <Input placeholder ="Kategori ekle..." 
          onChange={(e) => setInputText(e.target.value)}
          value={inputText} />
         
          <button className='btn-primary' onClick={handleCreate}>Ekle</button>
        </div>
        <div className='mt-10 max-h-[250px] overflow-auto pb-4'>
          {kategoriler.map((kategori) => (
            <div className='flex justify-between mt-4' key={kategori._id}>
            <b className='text-lg'>{kategori.title}</b>
            <button className='btn-primary !bg-danger'
            onClick={(e) => handleDelete(e,kategori._id)}>
              Sil
            </button>
          </div>
          ))}
          
        </div>

      </div>
        
    </div>
  )
}


export default Kategori