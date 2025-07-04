import {Center, Divider, Stack} from '../components/layout'
import {GoldEdgeCard} from "../components/GoldEdgeCover.tsx";
import {RoyalG39} from "../../assets/royal/Svg.tsx";
import {type ReactElement, useState} from "react";
import Credit from "./credit.tsx";
import {Link} from "react-router-dom";

function Settings() {
  const [selectedTab, setSelectedTab] = useState(0);
  const widths = [68.91, 66.53, 55.73];
  const gap = 15;

  function changeTab(index: number) {
    setSelectedTab(index);

  }

  let indicatorPos = 0;
  for(let i=0; i<selectedTab; i++) {
    indicatorPos += (widths[i] + gap);
  }

  let currentTab: ReactElement;
  switch (selectedTab) {
    case 0:
      currentTab = <p>Generals</p>;
      break;
    case 1:
      currentTab = <p>Controls</p>;
      break;
    case 2:
      currentTab = <Credit/>;
      break;
    default:
      currentTab = <p>Generals</p>;
      break;
  }

  return (
    <Center>
      <GoldEdgeCard>
        <p className={'text-center font-bold text-5xl monsieur-la-doulaise-regular'}>Settings</p>
        <Divider/>

        {currentTab}

        <div className={'relative w-[251.17px] h-[16.68px] mx-auto mt-5 mb-2'}>
          <RoyalG39
            width={(widths[selectedTab] + gap * 2)+'px'}
            style={{
              left: indicatorPos + 'px'
            }}
            className={
              'absolute fill-beige-500 transform -scale-y-100 ' +
              'transition-all duration-100 ease-in-out'
            }/>
        </div>
        <Stack direction={'row'} className={'gap-[5px] justify-center'}>
          <button
            className={'border-none px-[5px] py-1'}
            onClick={() => changeTab(0)}
            aria-label={selectedTab === 0 ? 'selected tab' : 'click to select this tab'}
          >Generals</button>
          <button
            className={'border-none px-[5px] py-1'}
            onClick={() => changeTab(1)}
            aria-label={selectedTab === 1 ? 'selected tab' : 'click to select this tab'}
          >Controls</button>
          <button
            className={'border-none px-[5px] py-1'}
            onClick={() => changeTab(2)}
            aria-label={selectedTab === 2 ? 'selected tab' : 'click to select this tab'}
          >Credits</button>
        </Stack>

        <Link
          to={'/'}
          className={'text-center mx-auto block mt-5'}
          aria-label={'go back to the main menu'}
        >&lt; Return to Home</Link>
      </GoldEdgeCard>
    </Center>
  );
}

export default Settings;
