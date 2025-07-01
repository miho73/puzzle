import {Stack} from "../components/layout.tsx";

function Credit() {
  return (
    <Stack className={'text-center gap-1 max-h-[50vh] overflow-y-auto text-sm'}>
      <p className={'font-bold text-xl'}>Puzzlit</p>

      <p className={'h-5'}/>

      <p>This project was developed by <a href="https://github.com/miho73" target={'_blank'} className={'hover:underline'}>miho73</a> and contributors</p>
      <p>You can check out the project repository from the following link: <a href="https://github.com/miho73/puzzle" target={'_blank'} className={'hover:underline'}>GitHub</a></p>

      <p className={'h-5'}/>

      <p>Copyright 2025. All Rights Reserved</p>
      <p>All contents including text, images, and code are protected under copyright law. Unauthorized reproduction or redistribution is prohibited.</p>

      <p></p>
    </Stack>
  );
}

export default Credit;
