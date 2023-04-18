import { useParams,useNavigate } from 'react-router-dom';
const mailVerify=()=>{
    let {token}=useParams();
    const navigate=useNavigate();
    fetch(`http://localhost:3000/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'mailToken':token})
        })
        .then((res)=>{
            if(res.status!==200){
                throw new Error(res.status);
            }else{
                navigate('/User');
            }
        })
        .catch((err)=>{
            throw new Error(res.status);
        });

}
export default mailVerify;