import { Row, Col } from 'antd';
import { MainDivider } from '../main-divider';
import { CasesTable } from '../cases-table';
import { NSWConfirmedCasesTable } from './nsw-confirmed-cases-table';
import { SexAgeGroup } from '../sex-age-group';
import { NSWLocalDistrictCases } from './nsw-local-district-cases';
import nswSexAndAgeGroupData from '../../data/nsw/sex_age_group.json';
import nswLocalDistrictData from '../../data/nsw/local_district_cases.json';
import nswCasesData from '../../data/nsw/cases.json';

export const NSWContainer = () => {
  return (
      <>
        <MainDivider title='New South Wales' />
        <Row gutter={16}>
            <Col xs={24} lg={13} xl={11}>
                <CasesTable data={nswCasesData} />
            </Col>
            <Col xs={24} lg={10} xl={11}>
                <NSWConfirmedCasesTable />
            </Col>
        </Row>
        <Row>
            <Col style={{margin: '0 auto' }}>
                <div style={{ height: 400, width: 800 }}>
                    <SexAgeGroup data={nswSexAndAgeGroupData} />
                </div>
            </Col>
        </Row>
        <Row style={{ marginTop: '100px'}}>
            <Col style={{margin: '0 auto' }}>
                <div style={{ height: 600, width: 900 }}>
                    <NSWLocalDistrictCases data={nswLocalDistrictData} />
                </div>
            </Col>
        </Row>
    </>
  );
}