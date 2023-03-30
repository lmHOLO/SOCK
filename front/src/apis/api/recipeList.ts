import { authApiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';


export const getRecipeListAPI =async (keyword:string, arrange:string,memberId:string) => {
    try{
        let url = `/recipes?arrange=${arrange}`;
        if(`${keyword}`) url = url+`?keyword=${keyword}`;
        if(`${memberId}`) url = url+`?member-id=${memberId}`;

        const { data } = await authApiInstance().get(url);
        console.log(data);
        return data.data;
    }catch(error){
        if (isAxiosError(error)) {
            console.log('에러: ', error.response);
            return error.response?.data;
        }
    }
}