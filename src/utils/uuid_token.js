import { v4 as uuidv4 } from 'uuid';
//要生产一个随机的字符串，并且每次不能改变，要持久的保存
export const getuuid=()=>{
  //先从本地存储里面获取uuid，看一下有没有
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  //如果没有，生成uuid，有的话不生成
  if(!uuid_token){
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}