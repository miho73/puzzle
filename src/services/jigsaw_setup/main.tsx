import{
  GoldEdgeCard
} from "../../views/components/GoldEdgeCover.tsx";
import {GoldEdgeButton} from "../../views/components/Buttons.tsx";

function JigsawSetup() {
  return (
    <div className={'w-screen h-screen flex items-center justify-center flex-col'}>
      <GoldEdgeCard>
        <p>Choose Your Picture</p>
        <GoldEdgeButton>
          <p>Select Picture to Solve</p>
        </GoldEdgeButton>
      </GoldEdgeCard>
    </div>
  );
}

export default JigsawSetup;
