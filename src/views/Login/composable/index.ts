import { ref } from 'vue'

// 获取图片验证码
export function useGetImgCode() {
  //图片验证码
  const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)
  //切换图片
  const GetImgCode = () => {
    console.log('img')
  }

  return {
    imgCodeSrc,
    GetImgCode
  }
}
