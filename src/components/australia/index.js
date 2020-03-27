import { Table, Row, Col, Divider, Tag } from 'antd';
import { states } from '../../constants/states';
import AustraliaMap from 'react-australia-map';
import { MainDivider } from '../main-divider';
import ausCasesData from '../../data/aus_cases.json';

const columns = [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    width: 150,
    render: text => <span>{text}</span>,
  },
  {
    title: 'Confirmed',
    dataIndex: 'confirmed',
    key: 'confirmed',
    sorter: (a, b) => a.confirmed - b.confirmed,
  },
  {
    title: 'Confirmed\n(24h)',
    dataIndex: 'last_24h_confirmed',
    key: 'last_24h_confirmed',
    sorter: (a, b) => a.last_24h_confirmed - b.last_24h_confirmed,
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key: 'deaths',
    sorter: (a, b) => a.deaths - b.deaths,
  },
  {
    title: 'Deaths\n(24h)',
    dataIndex: 'last_24h_deaths',
    key: 'last_24h_deaths',
    sorter: (a, b) => a.last_24h_deaths - b.last_24h_deaths,
  },
  {
    title: 'Recovered',
    dataIndex: 'recovered',
    key: 'recovered',
    sorter: (a, b) => a.recovered - b.recovered,
  },
  {
    title: 'Recoverd\n(24h)',
    dataIndex: 'last_24h_recovered',
    key: 'last_24h_recovered',
    sorter: (a, b) => a.last_24h_recovered - b.last_24h_recovered,
  },
];

export const AustraliaContainer = () => {
  const total = ausCasesData.reduce((acc, item) => {
      acc.confirmed += item.confirmed;
      acc.last_24h_confirmed += item.last_24h_confirmed;
      acc.deaths += item.deaths;
      acc.last_24h_deaths += item.last_24h_deaths;
      acc.recovered += item.recovered;
      acc.last_24h_recovered += item.last_24h_recovered;
    return acc;
  }, {
      confirmed: 0,
      last_24h_confirmed: 0,
      deaths: 0,
      last_24h_deaths: 0,
      recovered: 0,
      last_24h_recovered: 0,
  });
  const mapStyling = ausCasesData.reduce((acc, item) => {
    const state = states.find(i => i.name === item.location);
    const per = (item.confirmed * 100) / total.confirmed;
    acc[state.code] = {
        fill: '#86D9E1',
        showLabels: true,
        label: {
          name: ` ${state.code}\n ${item.confirmed} (${per.toFixed(2)}%)`,
          fontSize: 6,
          fill: 'black'
        }
    }
    return acc;
  }, {})

  return (
      <>
        <MainDivider title='Australia' />
        <Row>
            <Col style={{ margin: '0 auto'}}>
                <AustraliaMap
                    fill="#ffcb03"
                    stroke="#ffffff"
                    strokeWidth={1}
                    width={700}
                    height={500}
                    customize={mapStyling}
                />
            </Col>
        </Row>
        <Row>
        <Col>
              <Divider orientation='center'>
                Current Status*
              </Divider>
              <Table
                  columns={columns}
                  dataSource={ausCasesData}
                  pagination={false}
                  bordered
                  tableLayout='fixed'
                  size='small'
                  style={{fontSize: 8 }}
                  summary={() => (
                      <tr>
                      <th>Total</th>
                      <th>
                        <Tag color='geekblue'>
                            {total.confirmed}
                        </Tag>
                      </th>
                      <th>{total.last_24h_confirmed}</th>
                      <th>
                        <Tag color='volcano'>
                            {total.deaths}
                        </Tag>
                      </th>
                      <th>{total.last_24h_deaths}</th>
                      <th>
                        <Tag color='green'>
                            {total.recovered}
                        </Tag>
                      </th>
                      <th>{total.last_24h_recovered}</th>
                      </tr>
                      ) }
                  />
            </Col>
        </Row>
    </>
  );
}