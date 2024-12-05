import { supabase } from "./supabaseClient";

export async function uploadImages(files){
    const imgURLs = [];

    for(const file of files){
        const fileName = `${Date.now()}_${file.name}`;
        const {data, error} = await supabase.storage
            .from('components-imgs')
            .upload(fileName,file)
        
        if(error){
            console.error('Error al subir imagen/es');
            throw error;
        }
        //URL PUBLICA
        const { publicUrl } = supabase.storage
            .from('components-imgs')
            .getPublicUrl(fileName);
        imgURLs.push(publicUrl)
    }
    return imgURLs;

}

export async function saveComponentToDB(component){
    const {data,error} = await supabase.from('components').insert([component]);

    if(error){
        console.error('Error al guardar componente en la base de datos: ', error.message);
        throw error;
    }
    return data;
}
