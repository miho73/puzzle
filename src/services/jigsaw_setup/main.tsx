import{
  GoldEdgeCard
} from "../../views/components/GoldEdgeCover.tsx";
import {EmeraldButton} from "../../views/components/Buttons.tsx";

function JigsawSetup() {
  return (
    <div className={'w-screen h-screen flex items-center justify-center flex-col'}>
      <GoldEdgeCard>
        <p>Choose Your Picture</p>
        <EmeraldButton>
          <p>Select Picture to Solve</p>
        </EmeraldButton>
      </GoldEdgeCard>
    </div>
  );
}

export default JigsawSetup;
