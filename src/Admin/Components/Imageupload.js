import React, {useState} from 'react'

const Imageupload = (props) => {
    const [src, setSrc] = useState("")
    const [noText, setTxt] = useState(true)

    const handleUpload = (e)=>{
        try {
            let url = URL.createObjectURL(e.target.files[0]);
            setSrc(url)
            props.setImage(p=>({...p, image: e.target.files[0]}))
            if (e.target.value === null || typeof(e.target.value)==='undefined') {
                setTxt(true)
                return
            }
            setTxt(false)
        } catch (error) {
            
        }
        
    }
  return (
    <div className='imgUpload' >
        {noText && <h5>upload image</h5>  }
        {!noText && <img src={src} alt="" />}
        <input onChange={handleUpload} type='file' accept='image/*' multiple={false} />
    </div>
  )
}

export default Imageupload
