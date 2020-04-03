import { AppLayout } from '../../src/components/layout';
import { StateContainer } from '../../src/components/state-container';

const stateName = 'New South Wales';

const NSW = ({
  CDRData,
  sexAndAgeGroupData,
  localDistrictData,
  testedData,
  souceOfInfectionData,
}) => {
  return (
    <AppLayout state='nsw'>
        <StateContainer
          stateName={stateName}
          sexAndAgeGroupData={sexAndAgeGroupData}
          localDistrictData={localDistrictData}
          CDRData={CDRData}
          testedData={testedData}
          souceOfInfectionData={souceOfInfectionData}
        />
    </AppLayout>
  );
}

export async function getStaticProps() { 
  const sexAndAgeGroupData = require('../../src/data/nsw/sex_age_group.json');
  const localDistrictData = require('../../src/data/nsw/local_district_cases.json');
  const newCDRData = require('../../src/data/nsw/cases.json');
  const testedData = require('../../src/data/nsw/tested.json');
  const souceOfInfectionData = require('../../src/data/nsw/sources_of_infection.json');
  const statesCasesData = require('../../src/data/states_cases.json');

  const oldCDRData = statesCasesData.find(item => item.location === stateName);
  const CDRData = {
      ...oldCDRData,
      ...newCDRData,
  }

  return {
    props: {
      CDRData,
      sexAndAgeGroupData,
      localDistrictData,
      testedData,
      souceOfInfectionData,
    },
  }
}

export default NSW;

