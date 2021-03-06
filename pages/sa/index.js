import { AppLayout } from '../../src/components/layout';
import { StateContainer } from '../../src/components/state-container';

const stateCode = 'sa';
const stateName = 'South Australia';

const NSW = ({
  sexAndAgeGroupData,
  CDRData,
  testedData,
  souceOfInfectionData,
  historicalData
}) => {
  return (
    <AppLayout state={stateCode}>
        <StateContainer
          stateName={stateName}
          sexAndAgeGroupData={sexAndAgeGroupData}
          CDRData={CDRData}
          testedData={testedData}
          souceOfInfectionData={souceOfInfectionData}
          historicalData={historicalData}
        />
    </AppLayout>
  );
}

export async function getStaticProps() { 
  const sexAndAgeGroupData = require('../../src/data/sa/sex_age_group.json');
  const newCDRData = require('../../src/data/sa/cases.json');
  const testedData = require('../../src/data/sa/tested.json');
  const souceOfInfectionData = require('../../src/data/sa/sources_of_infection.json');
  const statesCasesData = require('../../src/data/states_cases.json');
  const allHistoricalData = require('../../src/data/states_historical_data.json');

  const oldCDRData = statesCasesData.find(item => item.location === stateName);
  const CDRData = {
      ...oldCDRData,
      ...newCDRData,
  }
  return {
    props: {
      sexAndAgeGroupData,
      CDRData,
      testedData,
      souceOfInfectionData,
      statesCasesData,
      historicalData: allHistoricalData[stateCode.toUpperCase()],
    },
  }
}

export default NSW;

